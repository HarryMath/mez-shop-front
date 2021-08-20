export interface FilterBlock {
  name: string;
  queryName: string;
  opened: boolean;
  options: FilterOption[];
}

export interface FilterOption {
  name: string;
  queryName: string;
  selected: boolean;
}


export interface Manufacturer {
  name: string;
}

export interface Category {
  name: string;
  photo: string|null;
  shortDescription: string;
  fullDescription: string;
}

export interface CategoryPreview {
  name: string;
  linkName: string;
  photo: string|null;
  shortDescription: string;
}

export interface EnginePreview {
  name: string;
  manufacturer: string;
  type: string;
  minPrice: number;
  mass: number;
  photo: string;
  characteristics: Characteristics[];
}

export interface EngineDetails {
  name: string;
  manufacturer: string;
  priceLapy: number;
  priceCombi: number;
  priceFlanets: number;
  mass: number;
  photo: string;
  type: Category;
  characteristics: Characteristics[];
  photos: string[];
}

export interface Characteristics {
  engineName: string;
  power: number;
  frequency: number;
  efficiency: number;
  cosFi: number;
  electricityNominal220: number;
  electricityNominal380: number;
  electricityRatio: number;
  momentsRatio: number;
  momentsMaxRatio: number;
  momentsMinRatio: number;
}
