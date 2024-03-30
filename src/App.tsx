import './App.css'
import 'react-dropzone-uploader/dist/styles.css'
import { Uploader } from './Uploader.tsx';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import { Container, Grid, GridColumn, GridRow, Header, Segment } from 'semantic-ui-react';
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
          {nanoDlpData?.chartData &&
              <Grid.Row>
                <Grid.Column width={15}>
                    <Header attached="top" block>Chart Data</Header>
                    <Segment attached>
                        Chart Goes Here Eventually
                    </Segment>
                </Grid.Column>
              </Grid.Row>
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
