import { GridColumn, Header } from 'semantic-ui-react';
import { NanoDlpPlate } from '../NanoDlpTypes.ts';

interface JsonInfoProps {
  plateInfo: any,
  title: string
}

const JsonInfo = ({plateInfo, title}: JsonInfoProps) => {
  return (
    <GridColumn>
      <Header>{title}</Header>

      <div className="ui segment">
        <pre><code className="json">
          {JSON.stringify(plateInfo, null, 2)}
        </code> </pre>
      </div>

    </GridColumn>
  );
};

export default JsonInfo;