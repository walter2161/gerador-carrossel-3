export interface Property {
  type: 'Casa' | 'Kitnet' | 'Apartamento' | 'Comercial' | 'Terreno';
  reference: string;
  neighborhood: string;
  area: number;
  bedrooms: number;
  parkingSpots: number;
  suites: number;
  bathrooms: number;
  price: string;
  images: string[];
}

export const neighborhoods = [
  'Canto do Forte',
  'Boqueirão',
  'Guilhermina',
  'Aviação',
  'Tupi',
  'Ocean',
  'Mirim',
  'Caiçara',
  'Real',
  'T. Bastos'
] as const;

export const propertyTypes = [
  'Casa',
  'Kitnet',
  'Apartamento',
  'Comercial',
  'Terreno'
] as const;