import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { useState } from 'react';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import JSZip from 'jszip';
import './Uploader.css'
import pako from 'pako';
import Papa from 'papaparse';
import { ChartData } from './NanoDlpTypes.ts';

const sliceFileRegex = /^\d+(-\d+)?\.png$/;

const determineSliceFiles = (fileList: string[]) => {
  return fileList.filter(file => sliceFileRegex.test(file))
}

const decompressGzip = (uint8array: Uint8Array) => {
  // Use pako to decompress the gzip file
  try {
    const decompressed = pako.inflate(uint8array);
    return decompressed;
  } catch (err) {
    console.error('Error decompressing file', err);
    throw err;
  }
};

export const Uploader = () => {
  const [spinnerShow, setSpinnerShow] = useState(false)

  const {fileName, plate, chartData, updateState} = useNanoDLP();

  const zip = new JSZip();

  // called every time a file's `status` changes
  const handleChangeStatus = (file: IFileWithMeta, status: StatusValue) => {
    console.log(status)
    if (status === 'done') {
      const {file: {name}} = file;

      updateState({fileName: name})
      zip.loadAsync(file.file).then(value => {
        const filesNames = Object.keys(value.files);

        zip.file('plate.json')?.async('string').then(data => {
          updateState({plate: JSON.parse(data)})
        })

        const sliceFileNames = determineSliceFiles(filesNames);
        updateState({sliceFileNames})

        const csvFiles = Object.values(value.files).filter(file => file.name.startsWith('analytic-'));

        Promise.all(csvFiles.map(file => {
          return file.async('uint8array')
            .then(uint8array => decompressGzip(uint8array))
            .then(decompressed => {
              const text = new TextDecoder('utf-8').decode(decompressed);
              return new Promise<ChartData[]>((resolve) => {
                Papa.parse<ChartData>(text, {
                  header: true,
                  complete: (results) => resolve(results.data),
                });
              });
            })
        }))
          .then((results) => {
            const chartData = results.flat(1);
            updateState({chartData})
          });

      })
      setSpinnerShow(false);
    } else if (status === 'preparing') {
      setSpinnerShow(true);
    } else if (status === 'removed') {
      updateState({plate: undefined, chartData: undefined, fileName: undefined, sliceFileNames: undefined})
    }
  }

  return (
    <>
      <div className="spinner" style={{display: spinnerShow ? 'inline' : 'none'}}>spinner</div>
      {fileName}
      <Dropzone
        onChangeStatus={handleChangeStatus}
        accept=".nanodlp"
        submitButtonDisabled={true}
        multiple={false}
        maxFiles={1}
        styles={{
          dropzone: {
            overflow: 'hidden'
          }
        }}
      />

      {plate &&
          <div>
              PLATE
            {JSON.stringify(plate)}
          </div>
      }

      {chartData &&
        <div>
            CHART DATA LENGTH
          {chartData.length}
        </div>
      }
    </>
  )
};
