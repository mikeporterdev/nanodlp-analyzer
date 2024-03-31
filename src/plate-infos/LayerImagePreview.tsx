import { Button, Container, GridRow, Header, Segment } from 'semantic-ui-react';
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

  console.log(props.groupedLayerImages[layer])



  const renderLayer = () => {
    const groupedLayerImage = props.groupedLayerImages[layer];
    const layerPath = groupedLayerImage[groupedLayerImage.length - 1];
    props.jsZip.file(layerPath)?.async('blob').then(file => {
      if (file) {
        setImageUrl(URL.createObjectURL(file))
      }
    });
  }
  console.log(imageUrl)
  if (!imageUrl) {

    renderLayer()
  }

  const inc = () => {
    setLayer(layer + 1);
    renderLayer()
  }

  const dec = () => {
    if (layer == 1) {
      return
    }
    setLayer(layer - 1);
    renderLayer()

  }


  return (
    <GridRow>

    <Container>
      <Header attached={'top'}>Slice Image Preview</Header>
      <Segment attached>
        <Button onClick={dec}>Prev</Button>
        Layer: {layer}
        <Button onClick={inc}>Next</Button>

        {imageUrl && <img src={imageUrl} style={{width: 300}}  alt="Extracted from ZIP"/>}

      </Segment>
    </Container>
    </GridRow>
  );
};

export default LayerImagePreview;