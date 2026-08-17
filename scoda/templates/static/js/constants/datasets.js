export const DATASETS = {
  WDI: {
    id: "World_Development_Indicators",
    label: "World Development Indicators",
    indicatorsApi: "/api/indicators-list/codebook",
    exploreApi: "/api/explore/codebook",
  },
  FINDEX: {
    id: "Findex_Financial_Indicators",
    label: "Findex Financial Indicators",
    indicatorsApi: "/api/findex/indicators-list/codebook",
    exploreApi: "/api/findex/codebook",
  },
};

export const DATASET_OPTIONS = Object.values(DATASETS).map((dataset) => ({
  value: dataset.id,
  label: dataset.label,
}));

export const DEFAULT_DATASET = DATASETS.WDI;

export function getDatasetById(datasetId) {
  return Object.values(DATASETS).find((dataset) => dataset.id === datasetId) || DEFAULT_DATASET;
}
