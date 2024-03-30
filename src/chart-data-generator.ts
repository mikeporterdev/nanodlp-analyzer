import { ChartData } from './NanoDlpTypes.ts';
const ColourValues = [
  "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "000000",
  "800000", "008000", "000080", "808000", "800080", "008080", "808080",
  "C00000", "00C000", "0000C0", "C0C000", "C000C0", "00C0C0", "C0C0C0",
  "400000", "004000", "000040", "404000", "400040", "004040", "404040",
  "200000", "002000", "000020", "202000", "200020", "002020", "202020",
  "600000", "006000", "000060", "606000", "600060", "006060", "606060",
  "A00000", "00A000", "0000A0", "A0A000", "A000A0", "00A0A0", "A0A0A0",
  "E00000", "00E000", "0000E0", "E0E000", "E000E0", "00E0E0", "E0E0E0",
];
const axesInfo = [
  {'Type': 'mm', 'Name': 'Layer Height', 'Key': 'LayerHeight', 'Decimal': 2}, {
    'Type': 'px',
    'Name': 'Solid Area',
    'Key': 'SolidArea',
    'Decimal': 0
  }, {'Type': '#', 'Name': 'Area Count', 'Key': 'AreaCount', 'Decimal': 0}, {
    'Type': 'px',
    'Name': 'Largest Area',
    'Key': 'LargestArea',
    'Decimal': 0
  }, {'Type': 'mm/s', 'Name': 'Speed', 'Key': 'Speed', 'Decimal': 0}, {
    'Type': 's',
    'Name': 'Cure Time',
    'Key': 'Cure',
    'Decimal': 2
  }, {'Type': 'Pressure', 'Name': 'Pressure', 'Key': 'Pressure', 'Decimal': 2}, {
    'Type': '°C',
    'Name': 'Resin Temp',
    'Key': 'TemperatureInside',
    'Decimal': 2
  }, {'Type': '°C', 'Name': 'Temp', 'Key': 'TemperatureOutside', 'Decimal': 2}, {
    'Type': 's',
    'Name': 'Layer Time',
    'Key': 'LayerTime',
    'Decimal': 2
  }, {'Type': 'mm', 'Name': 'Lift Height', 'Key': 'LiftHeight', 'Decimal': 2}, {
    'Type': '°C',
    'Name': 'MCU Temp',
    'Key': 'TemperatureMCU',
    'Decimal': 2
  }, {'Type': '°C', 'Name': 'Resin Temp Target', 'Key': 'TemperatureInsideTarget', 'Decimal': 2}, {
    'Type': '°C',
    'Name': 'Temp Target',
    'Key': 'TemperatureOutsideTarget',
    'Decimal': 2
  }, {'Type': '°C', 'Name': 'MCU Temp Target', 'Key': 'TemperatureMCUTarget', 'Decimal': 2}, {
    'Type': 'RPM',
    'Name': 'MCU Fan RPM',
    'Key': 'MCUFanRPM',
    'Decimal': 2
  }, {'Type': 'RPM', 'Name': 'UV Fan RPM', 'Key': 'UVFanRPM', 'Decimal': 2}]

function isNotAllNull(subArray) {
  return subArray.some(element => element !== null);
}

function aggregateFunc(v, aggregate) {
  let val = parseFloat(v / 1000000000);
  if (aggregate == 0) return val;
  return Math.round(val / aggregate) * aggregate;
}

export const processData = (dataResponse: ChartItem[]) => {
  let previousAggregateValue;
  let series = getSeries();
  let processedData = series.map(_serie => []);
  let dataPointIndex = 0;

  console.log(dataResponse.filter(i => i["ID"] < 1000))

  dataResponse
    .filter(i => i["ID"])
    .forEach(responseItem => {
    let currentAggregateValue = aggregateFunc(responseItem["ID"], 0);
    if (currentAggregateValue != previousAggregateValue) {
      for (let j = 0; j < series.length; j++) {
        processedData[j][dataPointIndex] = null;
      }
      processedData[0][dataPointIndex] = currentAggregateValue;
      previousAggregateValue = currentAggregateValue;
      dataPointIndex++;
    }

    try {
        processedData[responseItem["T"] + 1][dataPointIndex - 1] = responseItem["V"];
    } catch (e) {
      console.log(processedData)
      console.log(responseItem)
      throw e;
    }
  })

  return processedData
}

export const getSeriesAndData = (dataRows: ChartData[]) => {
  let series = getSeries();

  const processedData = processData(dataRows);


  const filteredData = processedData.filter(isNotAllNull);
  const filteredSeries = series.filter((_, index) => isNotAllNull(processedData[index]));
  const axes = prepareAxis(filteredSeries)

  return {filteredData, filteredSeries, axes}
}

function getSeries() {
  let series = [{}];
  axesInfo.forEach((element, key) => {
    series.push({
      show: true,
      spanGaps: true,
      label: element.Name,
      scale: element.Type,
      value: (self, rawValue) => (rawValue != null ? rawValue.toFixed(element.Decimal) + element.Type : ""),
      stroke: "#" + ColourValues[key] + "88",
      width: 1,
    });
  });
  return series;
}

function prepareAxis(series) {
  let axes = [{}];
  for (let seriesIdx = 1; seriesIdx < series.length; seriesIdx++) {
    let scale = series[seriesIdx].scale;

    const found = axes.some(axis => axis.scale === scale);

    const decimalPlaces = determineDecimalPlaces(scale);

    if (!found && decimalPlaces !== null) {
      axes.push({
          labelSize: 15,
          gap: 0,
          size: 40,
          side: 3,
          grid: {show: false},
          label: scale,
          scale: scale,
          values: (self, ticks) => ticks.map(rawValue => rawValue.toFixed(decimalPlaces)),
        }
      )
    }
  }

  let halfOfAxisCount = parseInt(axes.length / 2) + 1;
  for (let j = halfOfAxisCount; j < axes.length; j++) {
    axes[j].side = 1;
  }
  axes[1].grid.show = true;
  return axes;
}

function determineDecimalPlaces(scale) {
  let zeroPlaceScales = ["px", "Pressure"];
  let onePlaceScales = ["s", "mm", "°C"];

  if (zeroPlaceScales.includes(scale)) {
    return 0;
  } else if (onePlaceScales.includes(scale)) {
    return 1;
  } else {
    return null;
  }
}