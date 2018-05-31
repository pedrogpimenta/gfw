export default {
  title: {
    withLocation: 'Location of tree cover gain in {location}'
  },
  config: {
    size: 'small',
    forestTypes: ['ifl_2013', 'plantations', 'primary_forest'],
    landCategories: ['mining', 'wdpa', 'landmark'],
    units: ['ha', '%'],
    categories: ['forest-change'],
    admins: ['country', 'region'],
    selectors: ['forestTypes', 'landCategories', 'units', 'extentYears'],
    locationCheck: true,
    type: 'gain',
    layers: ['forestgain'],
    metaKey: 'widget_tree_cover_gain_location',
    sortOrder: {
      forestChange: 6
    },
    sentences: {
      initial:
        'In {location}, the top {percentileLength} regions were responsible for {topGain} of all tree cover gain. {region} had the most tree cover gain at {value} compared to an average of {average}.',
      withIndicator:
        'For {indicator} in {location}, the top {percentileLength} regions were responsible for {topGain} of all tree cover gain. {region} had the most tree cover gain at {value} compared to an average of {average}.',
      initialPercent:
        'In {location}, the top {percentileLength} regions were responsible for {topGain} of all tree cover gain. {region} had the most relative tree cover gain at {value} compared to an average of {average}.',
      withIndicatorPercent:
        'For {indicator} in {location}, the top {percentileLength} regions were responsible for {topGain} of all tree cover gain. {region} had the most relative tree cover gain at {value} compared to an average of {average}.'
    }
  },
  settings: {
    threshold: 0,
    unit: '%',
    extentYear: 2000,
    pageSize: 5,
    page: 0,
    layers: ['forestgain']
  },
  enabled: true
};
