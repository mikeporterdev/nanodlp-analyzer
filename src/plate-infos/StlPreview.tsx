import { Container, Header, Segment } from 'semantic-ui-react';

interface StlPreviewProps {
  imageData: Blob
}

const StlPreview = (props: StlPreviewProps) => {
  const url = URL.createObjectURL(props.imageData);

  return (
    <Container>
      <Header attached="top" block>STL Preview</Header>

      <Segment attached>
        {url && <img src={url} alt="Extracted from ZIP"/>}
      </Segment>

    </Container>
  );

};

export default StlPreview;