interface MC {
  StartX: number;
  StartY: number;
  Width: number;
  Height: number;
  X: null;
  Y: null;
  MultiCureGap: number;
  Count: number;
}

export interface NanoDlpPlate {
  PlateID: number;
  ProfileID: number;
  Profile: null;
  CreatedDate: number;
  StopLayers: string;
  Path: string;
  LowQualityLayerNumber: number;
  AutoCenter: number;
  Updated: number;
  LastPrint: number;
  PrintTime: number;
  PrintEst: number;
  ImageRotate: number;
  MaskEffect: number;
  XRes: number;
  YRes: number;
  ZRes: number;
  MultiCure: string;
  MultiThickness: string;
  CureTimes: any[]; // Specify the type if CureTimes have a specific structure
  DynamicThickness: null;
  Offset: number;
  OverHangs: null;
  Risky: boolean;
  IsFaulty: boolean;
  Repaired: boolean;
  FaultyLayers: null;
  Corrupted: boolean;
  TotalSolidArea: number;
  BlackoutData: string;
  LayersCount: number;
  Processed: boolean;
  Feedback: boolean;
  ReSliceNeeded: boolean;
  MultiMaterial: boolean;
  PrintID: number;
  MC: MC;
  XMin: number;
  XMax: number;
  YMin: number;
  YMax: number;
  ZMin: number;
  ZMax: number;
}

export interface ChartData {
  ID: number;
  T: number;
  V: number;
}