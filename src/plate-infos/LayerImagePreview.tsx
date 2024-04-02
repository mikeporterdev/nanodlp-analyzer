import { Button, Container, Form, GridRow, Header, Input, Segment } from 'semantic-ui-react';
import { GroupedFilesByLayer } from '../Uploader.tsx';
import JSZip from 'jszip';
import { useState } from 'react';

interface LayerImagePreviewProps {
  groupedLayerImages: GroupedFilesByLayer;
  jsZip: JSZip;
}

const LayerImagePreview = (props: LayerImagePreviewProps) => {

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [layer, setLayer] = useState<number>(1)

  const maxLayers = Object.keys(props.groupedLayerImages).length + 1;

  const renderLayer = () => {
    const groupedLayerImage = props.groupedLayerImages[layer];
    const layerPath = groupedLayerImage[groupedLayerImage.length - 1];
    props.jsZip.file(layerPath)?.async('blob').then(file => {
      if (file) {
        setImageUrl(URL.createObjectURL(file))
      }
    });
  };

  if (!imageUrl) {
    renderLayer()
  }

  const inc = () => {
    setLayer(1 + layer);
    renderLayer()
  }

  const dec = () => {
    if (layer == 1) {
      return
    }
    setLayer(layer - 1);
    renderLayer()

  }

  const setLayerCmpTextInput = (_, layer) => {
    setLayer(parseInt(layer.value));
    renderLayer();
  }

  const setLayerCmp2 = (evt) => {
    setLayer(parseInt(evt.target.value));
    renderLayer();
  }


  return (
    <Container>
      <GridRow>
        <Container>
          <Header attached={'top'}>Slice Image Preview</Header>
          <Segment attached>
            <Form>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button labelPosition={'left'} icon={'left chevron'} onClick={dec} content={'Prev'} attached={'left'}/>
                <Input type={'number'} style={{width: 80}} value={layer} onChange={setLayerCmpTextInput}/>
                <Button labelPosition={'right'} icon={'right chevron'} onClick={inc} content={'Next'}
                        attached={'right'}/>
              </div>
              <br/>
              <input style={{width: '100%'}} type={'range'} min={1} max={maxLayers} value={layer}
                     onChange={setLayerCmp2}/>
            </Form>

            {imageUrl && <img src={imageUrl} style={{width: '100%', aspectRatio: 2.25}} alt="Extracted from ZIP"/>}
          </Segment>
        </Container>
      </GridRow>
    </Container>
  );
};

export default LayerImagePreview;