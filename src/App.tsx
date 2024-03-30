import './App.css'
import 'react-dropzone-uploader/dist/styles.css'
import { Uploader } from './Uploader.tsx';
import { NanoDLPProvider } from './NanoDlpFileContext.tsx';

function App() {
  return (
    <>
      <h1>NanoDLP Analyser</h1>

      <NanoDLPProvider>
        <div className="card">
          <Uploader></Uploader>
        </div>
      </NanoDLPProvider>
    </>
  )
}

export default App
