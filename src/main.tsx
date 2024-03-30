import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NanoDLPProvider } from './NanoDlpFileContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NanoDLPProvider>
      <App/>
    </NanoDLPProvider>
  </React.StrictMode>,
)
