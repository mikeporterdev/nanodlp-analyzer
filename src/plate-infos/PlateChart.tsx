import { Header, Segment } from 'semantic-ui-react';
import { ChartData } from '../NanoDlpTypes.ts';
import UplotReact from 'uplot-react';
import 'uplot/dist/uPlot.min.css';
import { getSeriesAndData } from '../ChartDataGenerator.ts';
import { AlignedData, Options } from 'uplot';

interface PlateChartProps {
  chartData: ChartData[];
}


const PlateChart = (props: PlateChartProps) => {
  const {filteredData: filteredData, filteredSeries, axes} = getSeriesAndData(props.chartData)

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