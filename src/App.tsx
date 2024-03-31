import './App.css'
import { Uploader } from './Uploader.tsx';
import { useNanoDLP } from './NanoDlpFileContext.tsx';
import { Container, Grid, GridRow, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import JsonInfo from './plate-infos/JsonInfo.tsx';
import PlateChart from './plate-infos/PlateChart.tsx';
import StlPreview from './plate-infos/StlPreview.tsx';
import LayerImagePreview from './plate-infos/LayerImagePreview.tsx';

function App() {
  const {nanoDlpData} = useNanoDLP();

  return (
    <>
      <Container style={{marginTop: '3em'}}>
        <Header as="h1">NanoDLP Analyzer</Header>

        {!nanoDlpData &&
            <Grid stackable columns={3}>
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

                <GridRow>


                  {nanoDlpData?.sliceFileNames && nanoDlpData.zip &&
                      <LayerImagePreview groupedLayerImages={nanoDlpData.sliceFileNames}
                                         jsZip={nanoDlpData.zip}></LayerImagePreview>
                  }
                </GridRow>

                <Grid.Column>
                  {nanoDlpData?.plate &&
                      <JsonInfo plateInfo={nanoDlpData.plate} title="Plate Info"></JsonInfo>
                  }

                </Grid.Column>
                <Grid.Column>
                  {nanoDlpData?.profile &&
                      <JsonInfo plateInfo={nanoDlpData.profile} title="Profile Info"></JsonInfo>
                  }

                </Grid.Column>
                <Grid.Column>

                    <GridRow>

                      {nanoDlpData?.image &&
                          <StlPreview imageData={nanoDlpData.image}></StlPreview>
                      }
                    </GridRow>

                </Grid.Column>

            </Grid>
        }
      </Container>
    </>
  )
}

export default App
