import './App.css'
import 'react-dropzone-uploader/dist/styles.css'
import { Uploader } from './Uploader.tsx';
import { NanoDLPProvider } from './NanoDlpFileContext.tsx';
import { Container, Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
function App() {
  return (
    <>
      <NanoDLPProvider>

        <Container style={{ marginTop: '3em'}}>
          <Header as='h1'>NanoDLP Analyzer</Header>

          <Grid centered columns={3}>

            <Grid.Column>
              <Header>Upload a .nanodlp file</Header>
          <Uploader></Uploader>
            </Grid.Column>

          </Grid>
        </Container>
      </NanoDLPProvider>
    </>
  )
}

export default App
