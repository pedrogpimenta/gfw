import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sumBy from 'lodash/sumBy';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import { format } from 'd3-format';
import { formatNumber } from 'utils/format';
import { yearTicksFormatter } from 'components/widgets/utils/data';

// get list data
const getLoss = state => state.data && state.data.loss;
const getExtent = state => state.data && state.data.extent;
const getPrimaryLoss = state => state.data && state.data.primaryLoss;
const getSettings = state => state.settings;
const getLocationLabel = state => state.locationLabel;
const getIndicator = state => state.indicator;
const getColors = state => state.colors;
const getSentence = state => state && state.sentence;

const parseData = createSelector(
  [getPrimaryLoss, getLoss, getExtent, getSettings],
  (data, allLoss, extent, settings) => {
    if (!extent || !data || isEmpty(allLoss) || !allLoss || isEmpty(data)) {
      return null;
    }
    const { startYear, endYear } = settings;
    const initalLoss = data.filter(d => d.year === 2001)[0].area || 0;
    const totalLoss =
      sumBy(allLoss.filter(d => d.year >= 2002 && d.year <= endYear), 'area') ||
      0;
    let initalExtent = extent - initalLoss || 0;

    const minYear = minBy(data, 'year').year;
    const maxYear = maxBy(data, 'year').year;

    const parsedData = data
      .filter(d => d.year >= minYear && d.year <= maxYear)
      .map(d => {
        const percentageLoss = d.area && totalLoss ? d.area / totalLoss : 0;
        const yearData = {
          ...d,
          area: d.area || 0,
          emissions: d.emissions || 0,
          extentRemaining: 100 * initalExtent / extent,
          percentage: percentageLoss * 100 > 100 ? 100 : percentageLoss * 100
        };
        initalExtent -= d.area;
        return yearData;
      });
    return parsedData.filter(d => d.year >= startYear && d.year <= endYear);
  }
);

const parseConfig = createSelector([getColors], colors => ({
  height: 250,
  xKey: 'year',
  yKeys: {
    bars: {
      area: {
        fill: colors.primaryForestLoss,
        background: false,
        yAxisId: 'area'
      }
    },
    lines: {
      extentRemaining: {
        stroke: colors.primaryForestExtent,
        yAxisId: 'extentRemaining',
        strokeDasharray: '3 4'
      }
    }
  },
  xAxis: {
    tickFormatter: yearTicksFormatter
  },
  yAxis: {
    yAxisId: 'area'
  },
  rightYAxis: {
    yAxisId: 'extentRemaining',
    unit: '%',
    maxYValue: 100
  },
  unit: 'ha',
  tooltip: [
    {
      key: 'year'
    },
    {
      key: 'area',
      unit: 'ha',
      unitFormat: value =>
        (value < 1000 ? Math.round(value) : format('.3s')(value)),
      label: 'Primary forest loss',
      color: colors.primaryForestLoss
    },
    {
      key: 'extentRemaining',
      unit: '%',
      unitFormat: value => format('.2f')(value),
      label: 'Primary forest extent remaining',
      color: colors.primaryForestExtent,
      dashline: true
    }
  ]
}));

const parseSentence = createSelector(
  [
    parseData,
    getExtent,
    getSettings,
    getLocationLabel,
    getIndicator,
    getSentence
  ],
  (data, extent, settings, locationLabel, indicator, sentences) => {
    if (!data) return null;
    const { initial, withIndicator, noLoss, noLossWithIndicator } = sentences;
    const { startYear, endYear } = settings;
    const totalLoss = (data && data.length && sumBy(data, 'area')) || 0;
    const percentageLoss =
      (totalLoss && extent && totalLoss / extent * 100) || 0;

    const initialExtent =
      data.filter(d => d.year === startYear)[0].extentRemaining || 0;
    const finalExtent =
      data.filter(d => d.year === endYear)[0].extentRemaining || 0;

    let sentence = indicator ? withIndicator : initial;
    if (totalLoss === 0) {
      sentence = indicator ? noLossWithIndicator : noLoss;
    }

    const params = {
      indicator: indicator && indicator.label,
      location: locationLabel,
      startYear,
      endYear,
      extentDelta: formatNumber({
        num: Math.abs(initialExtent - finalExtent),
        unit: '%'
      }),
      loss: formatNumber({ num: totalLoss, unit: 'ha' }),
      percent: formatNumber({ num: percentageLoss, unit: '%' }),
      component: {
        key: 'total tree cover loss',
        tooltip: `i.e. tree cover loss inside primary forest represents a fraction of all deforestation in ${
          locationLabel
        }`
      }
    };

    return {
      sentence,
      params
    };
  }
);

export default createStructuredSelector({
  data: parseData,
  config: parseConfig,
  sentence: parseSentence
});
