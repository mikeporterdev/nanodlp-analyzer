import './App.css'
import { Uploader } from './Uploader.tsx';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import JsonInfo from './plate-infos/JsonInfo.tsx';
import PlateChart from './plate-infos/PlateChart.tsx';
import StlPreview from './plate-infos/StlPreview.tsx';

function App() {
  const {nanoDlpData} = useNanoDLP();

  return (
    <>
      <Container style={{marginTop: '3em'}}>
        <Header as="h1">NanoDLP Analyzer</Header>

        <Grid centered columns={3}>
          {!nanoDlpData &&
              <Grid.Column>
                  <Header attached={'top'}>Upload a .nanodlp or .zip file</Header>
                  <Segment attached>
                    <Uploader></Uploader>

                  </Segment>
              </Grid.Column>

          }
          {nanoDlpData?.chartData &&
              <Grid.Row>
                  <Grid.Column width={15}>
                      <PlateChart chartData={nanoDlpData.chartData}></PlateChart>
                  </Grid.Column>
              </Grid.Row>
          }
          {nanoDlpData?.plate &&
              <JsonInfo plateInfo={nanoDlpData.plate} title="Plate Info"></JsonInfo>
          }
          {nanoDlpData?.profile &&
              <JsonInfo plateInfo={nanoDlpData.profile} title="Profile Info"></JsonInfo>
          }
          {nanoDlpData?.image &&
            <StlPreview imageData={nanoDlpData.image}></StlPreview>
          }
        </Grid>
      </Container>
    </>
  )
}

export default App
