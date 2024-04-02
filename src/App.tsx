import './App.css'
import { Uploader } from './Uploader.tsx';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import { Container, Grid, GridRow, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import JsonInfo from './plate-infos/JsonInfo.tsx';
import PlateChart from './plate-infos/PlateChart.tsx';
import StlPreview from './plate-infos/StlPreview.tsx';
import LayerImagePreview from './plate-infos/LayerImagePreview.tsx';
import ReactGA from 'react-ga4';

function App() {
  const TRACKING_ID = 'G-QL40GYYKYB'; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

  const {nanoDlpData} = useNanoDLP();

  return (
    <>
      <Container style={{marginTop: '3em'}}>
        <Header as="h1" style={{textAlign: 'center'}}>NanoDLP Analyzer</Header>

        {!nanoDlpData &&
            <Grid stackable centered columns={3}>
                <Grid.Column>
                    <Header attached={'top'}>Upload a .nanodlp or .zip file</Header>
                    <Segment attached>
                        <Uploader></Uploader>

                    </Segment>
                </Grid.Column>
            </Grid>

        }
        {nanoDlpData &&
            <Grid columns={3}>
              {nanoDlpData?.chartData &&
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <PlateChart chartData={nanoDlpData.chartData}></PlateChart>
                      </Grid.Column>
                  </Grid.Row>
              }

              {nanoDlpData?.sliceFileNames && nanoDlpData.zip &&
                  <GridRow>
                      <LayerImagePreview groupedLayerImages={nanoDlpData.sliceFileNames}
                                         jsZip={nanoDlpData.zip}></LayerImagePreview>
                  </GridRow>
              }

              {nanoDlpData?.plate &&
                  <Grid.Column>
                      <JsonInfo plateInfo={nanoDlpData.plate} title="Plate Info"></JsonInfo>
                  </Grid.Column>
              }

              {nanoDlpData?.profile &&
                  <Grid.Column>
                      <JsonInfo plateInfo={nanoDlpData.profile} title="Profile Info"></JsonInfo>
                  </Grid.Column>
              }

              {nanoDlpData?.image &&
                  <Grid.Column>
                      <GridRow>
                          <StlPreview imageData={nanoDlpData.image}></StlPreview>
                      </GridRow>
                  </Grid.Column>
              }
            </Grid>
        }
      </Container>
    </>
  )
}

export default App
