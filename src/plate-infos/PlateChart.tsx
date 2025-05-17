import {Button, Header, Input, Segment} from 'semantic-ui-react';
import UplotReact from 'uplot-react';
import 'uplot/dist/uPlot.min.css';
import { getSeriesAndData } from '../ChartDataGenerator.ts';
import { AlignedData, Options } from 'uplot';
import {useState} from "react";
import {useNanoDLP} from "../NanoDlpFileContext.tsx";


const PlateChart = () => {
  const {nanoDlpData} = useNanoDLP();
  const [analyticsEntryIdx, setAnalyticsEntryIdx] = useState<number>(0)

  const csvDataLength = nanoDlpData?.chartDatas.length ?? 0;

  const relevantCsvData = nanoDlpData?.chartDatas[analyticsEntryIdx];
  const data = relevantCsvData?.data ?? [];

  const {filteredData: filteredData, filteredSeries, axes} = getSeriesAndData(data)


  const filters = filteredData as AlignedData

  const options: Options = {
    title: 'Sensor Data',
    id: 'chart1',
    class: 'my-chart',
    series: filteredSeries,
    axes: axes,
    width: 1000,
    height: 300,
  };

  const inc = () => {
    if (analyticsEntryIdx < csvDataLength - 1) {
      setAnalyticsEntryIdx(analyticsEntryIdx + 1)
    }
  }

  const dec = () => {
    if (analyticsEntryIdx != 0) {
      setAnalyticsEntryIdx(analyticsEntryIdx - 1)
    }
  }

  return (
    <>
      <Header attached="top" block>Chart Data</Header>
      <Segment attached>
        <UplotReact

          data={filters  }
          options={
            options}
          >

        </UplotReact>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Button labelPosition={'left'} icon={'left chevron'} onClick={dec} content={'Prev'} attached={'left'}/>
        <Input type={'text'}  value={relevantCsvData?.date ?? ''} readOnly={true} style={{width: 400}}/>
        <Button labelPosition={'right'} icon={'right chevron'} onClick={inc} content={'Next'}
                attached={'right'}/>
        </div>
      </Segment>
    </>
  );
};

export default PlateChart;