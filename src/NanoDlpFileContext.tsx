// Define the shape of the context state
import { createContext, ReactNode, useContext, useState } from 'react';
import { ChartData, NanoDlpPlate, ResinProfile } from './NanoDlpTypes.ts';
import JSZip from 'jszip';
import { GroupedFilesByLayer } from './Uploader.tsx';

export interface NanoDlpData {
  fileName?: string;
  chartDatas: { date: string, data: ChartData[]}[];
  sliceFileNames?: GroupedFilesByLayer;
  plate?: NanoDlpPlate;
  profile?: ResinProfile
  image?: Blob;
  zip?: JSZip;
}

interface NanoDlpState {
  nanoDlpData?: NanoDlpData
}

interface NanoDLPContextType extends NanoDlpState {
  updateState: (newState: Partial<NanoDlpState>) => void;
}

const NanoDLPContext = createContext<NanoDLPContextType | undefined>(undefined);

export const NanoDLPProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<NanoDlpState>({});

  const updateState = (newState: Partial<NanoDlpState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const value = { ...state, updateState };

  return (
    <NanoDLPContext.Provider value={value}>
      {children}
    </NanoDLPContext.Provider>
  );
};

export const useNanoDLP = () => {
  const context = useContext(NanoDLPContext);
  if (context === undefined) {
    throw new Error('useNanoDLP must be used within a NanoDLPProvider');
  }
  return context;
};