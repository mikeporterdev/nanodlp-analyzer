// Define the shape of the context state
import { createContext, ReactNode, useContext, useState } from 'react';
import { ChartData, NanoDlpPlate, ResinProfile } from './NanoDlpTypes.ts';

export interface NanoDlpData {
  fileName?: string;
  chartData?: ChartData[];
  sliceFileNames?: string[];
  plate?: NanoDlpPlate;
  profile?: ResinProfile
  image?: Blob;
}

interface NanoDlpState {
  nanoDlpData?: NanoDlpData
}

// Define the shape of the context including the updater function
interface NanoDLPContextType extends NanoDlpState {
  updateState: (newState: Partial<NanoDlpState>) => void;
}

// Create a context with a default value
const NanoDLPContext = createContext<NanoDLPContextType | undefined>(undefined);

// Define a provider component
export const NanoDLPProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<NanoDlpState>({});

  // Function to update the state, allows partial updates
  const updateState = (newState: Partial<NanoDlpState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // The value provided to the context consumers
  const value = { ...state, updateState };

  return (
    <NanoDLPContext.Provider value={value}>
      {children}
    </NanoDLPContext.Provider>
  );
};

// Custom hook for consuming context
export const useNanoDLP = () => {
  const context = useContext(NanoDLPContext);
  if (context === undefined) {
    throw new Error('useNanoDLP must be used within a NanoDLPProvider');
  }
  return context;
};