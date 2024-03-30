import { Container, GridColumn, Header, Segment } from 'semantic-ui-react';
import { NanoDlpPlate } from '../NanoDlpTypes.ts';

interface JsonInfoProps {
  plateInfo: any,
  title: string
}

const JsonInfo = ({plateInfo, title}: JsonInfoProps) => {
  return (
    <GridColumn>
      <Container>
        <Header attached="top" block>{title}</Header>

        <Segment attached>
          <pre>
            <code className="json">
              {JSON.stringify(plateInfo, null, 2)}
            </code>
          </pre>
        </Segment>

      </Container>


    </GridColumn>
  );
};

export default JsonInfo;