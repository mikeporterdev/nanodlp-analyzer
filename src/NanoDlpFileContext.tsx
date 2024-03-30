// Define the shape of the context state
import { createContext, ReactNode, useContext, useState } from 'react';
import { ChartData, NanoDlpPlate } from './NanoDlpTypes.ts';

interface NanoDLPState {
  fileName?: string;
  chartData?: ChartData[];
  sliceFileNames?: string[];
  plate?: NanoDlpPlate;
}

// Define the shape of the context including the updater function
interface NanoDLPContextType extends NanoDLPState {
  updateState: (newState: Partial<NanoDLPState>) => void;
}

// Create a context with a default value
const NanoDLPContext = createContext<NanoDLPContextType | undefined>(undefined);

// Define a provider component
export const NanoDLPProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<NanoDLPState>({});

  // Function to update the state, allows partial updates
  const updateState = (newState: Partial<NanoDLPState>) => {
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