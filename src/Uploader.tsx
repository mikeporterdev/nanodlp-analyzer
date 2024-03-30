import 'react-dropzone-uploader/dist/styles.css'
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import JSZip from 'jszip';
import './Uploader.css'
import pako from 'pako';
import Papa from 'papaparse';
import { ChartData } from './NanoDlpTypes.ts';
import { Button, Form, Input } from 'semantic-ui-react';

const sliceFileRegex = /^\d+(-\d+)?\.png$/;

const determineSliceFiles = (fileList: string[]) => {
  return fileList.filter(file => sliceFileRegex.test(file))
}

const decompressGzip = (uint8array: Uint8Array) => {
  // Use pako to decompress the gzip file
  try {
    return pako.inflate(uint8array);
  } catch (err) {
    console.error('Error decompressing file', err);
    throw err;
  }
};

export const Uploader = () => {
  const {updateState} = useNanoDLP();

  const zip = new JSZip();


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files were selected and update the state
    console.log(event.target.files)
    const file = event.target.files ? event.target.files[0] : null

    if (!file) {
      return;
    }


    updateState({fileName: file.name})
    zip.loadAsync(file).then(value => {
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
  };

  return (
    <>
      <Form>
        <Form.Field>
          <label>File Upload</label>
          <Input
            id="fileInput"
            type="file"
            accept=".nanodlp"
            style={{display: "none"}}
            onChange={handleFileChange}
          />
          <Button
            content="Choose NanoDLP file"
            labelPosition="left"
            icon="file"
            as="label"
            htmlFor="fileInput"
          />
        </Form.Field>
      </Form>
    </>
  )
};
