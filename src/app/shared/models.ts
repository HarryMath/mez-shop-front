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
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  mass: number;
  photo: string;
  characteristics: Characteristics[];
}

export interface EngineDetails {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  mass: number;
  photo: string;
  type: Category;
  characteristics: Characteristics[];
  photos: string[];
}

export interface Characteristics {
  engineId: number;
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
