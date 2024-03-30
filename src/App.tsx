import './App.css'
import 'react-dropzone-uploader/dist/styles.css'
import { Uploader } from './Uploader.tsx';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import { Container, Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import JsonInfo from './plate-infos/JsonInfo.tsx';

function App() {
  const {nanoDlpData} = useNanoDLP();

  return (
    <>
      <Container style={{marginTop: '3em'}}>
        <Header as="h1">NanoDLP Analyzer</Header>

        <Grid centered columns={3}>
          {!nanoDlpData &&
              <Grid.Column>
                  <Header>Upload a .nanodlp file</Header>
                  <Uploader></Uploader>
              </Grid.Column>

          }
          {nanoDlpData?.plate &&
              <JsonInfo plateInfo={nanoDlpData.plate} title="Plate Info"></JsonInfo>
          }
        </Grid>
      </Container>
    </>
  )
}

export default App
