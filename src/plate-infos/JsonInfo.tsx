import { Container, Header, Segment } from 'semantic-ui-react';

interface JsonInfoProps {
  plateInfo: any,
  title: string
}

const JsonInfo = ({plateInfo, title}: JsonInfoProps) => {
  return (
      <Container>
        <Header attached="top" block>{title}</Header>

        <Segment attached>
          <pre>
            <code className="json" style={{textWrap: 'balance', wordWrap: 'break-word'}}>
              {JSON.stringify(plateInfo, null, 2)}
            </code>
          </pre>
        </Segment>
      </Container>
  );
};

export default JsonInfo;