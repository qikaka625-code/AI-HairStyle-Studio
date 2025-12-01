export type Language = 'en' | 'zh' | 'vi' | 'th';

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  UNISEX = 'Unisex'
}

export enum HairLength {
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long'
}

export enum HairColor {
  BLACK = 'Black',
  BROWN = 'Brown',
  BLONDE = 'Blonde',
  RED = 'Red',
  SILVER = 'Silver',
  COLOR = 'Color'
}

export interface HairstyleOption {
  id: string;
  name: string;
  description: string;
  // Localized fields
  name_zh: string;
  description_zh: string;
  name_vi: string;
  description_vi: string;
  name_th: string;
  description_th: string;
  
  prompt: string;
  gender: Gender;
  length: HairLength;
  color: HairColor;
}

export interface GenerationResult {
  originalImage: string; // Base64
  generatedImage: string; // Base64
  promptUsed: string;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  SELECT_STYLE = 'SELECT_STYLE',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}