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

interface CustomValues {
  CdThreshold: string;
  DwFlowEndSlope: string;
  FssEnableCrashdetection: string;
  FssEnableDynamicwait: string;
  FssEnablePeeldetection: string;
  FssEnableResinleveldetection: string;
  PdPeelEndSlope: string;
  PdPeelStartSlope: string;
  ResinPreheatTemperature: string;
  RlThreshold: string;
  UvPwmValue: string;
}

export interface ResinProfile {
  ResinID: number;
  ProfileID: number;
  Title: string;
  Desc: string;
  Color: string;
  ResinPrice: number;
  OptimumTemperature: number;
  Depth: number;
  SupportTopWait: number;
  SupportWaitHeight: number;
  SupportDepth: number;
  SupportWaitBeforePrint: number;
  SupportWaitAfterPrint: number;
  TransitionalLayer: number;
  Updated: number;
  CustomValues: CustomValues;
  Type: number;
  ZStepWait: number;
  TopWait: number;
  WaitHeight: number;
  CureTime: number;
  WaitBeforePrint: number;
  WaitAfterPrint: number;
  SupportCureTime: number;
  SupportLayerNumber: number;
  AdaptSlicing: number;
  AdaptSlicingMin: number;
  AdaptSlicingMax: number;
  SupportOffset: number;
  Offset: number;
  FillColor: string;
  BlankColor: string;
  DimAmount: number;
  DimWall: number;
  DimSkip: number;
  PixelDiming: number;
  HatchingType: number;
  ElephantMidExposure: number;
  ElephantType: number;
  ElephantAmount: number;
  ElephantWall: number;
  ElephantLayers: number;
  HatchingWall: number;
  HatchingGap: number;
  HatchingOuterWall: number;
  HatchingTopCap: number;
  HatchingBottomCap: number;
  MultiCureGap: number;
  AntiAliasThreshold: number;
  AntiAlias: number;
  AntiAlias3D: number;
  ImageRotate: number;
  IgnoreMask: number;
  XYRes: number;
  YRes: number;
  ZResPerc: number;
  DynamicCureTime: string;
  DynamicSpeed: string;
  ShieldBeforeLayer: string;
  ShieldAfterLayer: string;
  ShieldDuringCure: string;
  ShieldStart: string;
  ShieldResume: string;
  ShieldFinish: string;
  LaserCode: string;
  ShutterOpenGcode: string;
  ShutterCloseGcode: string;
  SeparationDetection: string;
  ResinLevelDetection: string;
  CrashDetection: string;
  DynamicWait: string;
  SlowSectionHeight: number;
  SlowSectionStepWait: number;
  JumpPerLayer: number;
  DynamicWaitAfterLift: string;
  DynamicLift: string;
  JumpHeight: number;
  LowQualityCureTime: number;
  LowQualitySkipPerLayer: number;
  XYResPerc: number;
}

export interface ChartData {
  ID: number;
  T: number;
  V: number;
}