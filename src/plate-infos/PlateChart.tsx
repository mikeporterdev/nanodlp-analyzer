import { Header, Segment } from 'semantic-ui-react';
import { ChartData } from '../NanoDlpTypes.ts';
import UplotReact from 'uplot-react';
import 'uplot/dist/uPlot.min.css';
import { getSeriesAndData } from '../chart-data-generator.ts';
import { AlignedData } from 'uplot';

interface PlateChartProps {
  chartData: ChartData[];
}


const PlateChart = (props: PlateChartProps) => {
  const {filteredData: filteredData, filteredSeries, axes} = getSeriesAndData(props.chartData)

  const filters = filteredData as AlignedData

  console.log('filteredData', filteredData)
  console.log('filteredSeries', filteredSeries)

  const options = {
    title: 'Sensor Data',
    id: 'chart1',
    class: 'my-chart',
    series: filteredSeries,
    axes: axes,
    width: 1000,
    height: 300,
  };
  console.log(options)
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
      </Segment>
    </>
  );
};

export default PlateChart;