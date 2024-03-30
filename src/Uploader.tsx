import { NanoDlpData, useNanoDLP } from './NanoDlpFileContext.tsx';
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
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files were selected and update the state
    const file = event.target.files ? event.target.files[0] : null

    if (!file) {
      return;
    }

    const value = await zip.loadAsync(file);
    const filesNames = Object.keys(value.files);

    const plateData = await zip.file('plate.json')?.async('string');
    const profileData = await zip.file('profile.json')?.async('string');

    const sliceFileNames = determineSliceFiles(filesNames);

    const csvFiles = Object.values(value.files).filter(file => file.name.startsWith('analytic-'));

    // todo: support more than one csv file
    const csvFile = csvFiles[csvFiles.length - 1]

    const results = await csvFile.async('uint8array')
      .then(uint8array => decompressGzip(uint8array))
      .then(decompressed => {
        const text = new TextDecoder('utf-8').decode(decompressed);
        return new Promise<ChartData[]>((resolve) => {
          Papa.parse<ChartData>(text, {
            header: true,
            dynamicTyping: true,
            complete: (results) => resolve(results.data),
          });
        });
      })

    const chartData = results;

    const nanoDlpData: NanoDlpData = {
      fileName: file.name,
      chartData,
      sliceFileNames,
      plate: plateData ? JSON.parse(plateData) : null,
      profile: profileData ? JSON.parse(profileData) : null,
    }

    updateState({nanoDlpData})

  };

  return (
    <>
      <Form>
        <Form.Field>
          <label>File Upload</label>
          <Input
            id="fileInput"
            type="file"
            accept=".nanodlp,.zip"
            style={{display: 'none'}}
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
