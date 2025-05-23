import { NanoDlpData, useNanoDLP } from './NanoDlpFileContext.tsx';
import JSZip, {JSZipObject} from 'jszip';
import './Uploader.css'
import pako from 'pako';
import Papa from 'papaparse';
import { ChartData } from './NanoDlpTypes.ts';
import { Button, Form, Input } from 'semantic-ui-react';
import ReactGA from 'react-ga4';

export type GroupedFilesByLayer = {
  [key: string]: string[];
}

function groupFilesByFirstNumber(files: string[]): GroupedFilesByLayer {
  const grouped: GroupedFilesByLayer = {};

  files.forEach(file => {
    // Extract the first number (before the hyphen, if it exists)
    const match = file.match(/^(\d+)(?:-|\.\png$)/);
    if (match) {
      const firstNumber = match[1];
      if (!grouped[firstNumber]) {
        grouped[firstNumber] = [];
      }
      grouped[firstNumber].push(file);
    }
  });

  return grouped;
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
    ReactGA.event({category: 'file', action: 'uploaded', label: 'test'})

    const plateData = await zip.file('plate.json')?.async('string');
    const profileData = await zip.file('profile.json')?.async('string');

    const sliceFileNames = groupFilesByFirstNumber(filesNames);

    const csvFiles = Object.values(value.files).filter(file => file.name.startsWith('analytic-'));

    const getChartDataForCsvFile = async (csvFile: JSZipObject) => {
      const chartData = csvFile ? await csvFile.async('uint8array')
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
          }) : undefined;
      return chartData
    }


    const chartDatas = await Promise.all(csvFiles.map(async (csvFile) => {
      const chartData = await getChartDataForCsvFile(csvFile)
      return { date: csvFile.name, data: chartData }
    })    )

    const imageData = await zip.file('3d.png')?.async('blob')

    const nanoDlpData: NanoDlpData = {
      zip,
      fileName: file.name,
      chartDatas: (chartDatas.filter(i => i.data) as {date: string; data: ChartData[]}[]),
      sliceFileNames: Object.keys(sliceFileNames).length > 0 ? sliceFileNames : undefined,
      plate: plateData ? JSON.parse(plateData) : null,
      profile: profileData ? JSON.parse(profileData) : null,
      image: imageData,
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
