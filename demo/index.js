import React from 'react';
import {render} from 'ink';
import Chance from 'chance';
import meow from 'meow';

import {Table} from '../dist';

const chance = new Chance();

const Demo = ({numRows, updateDelay, outerBorderStyle, borderColor}) => {
  const makeFakeRow = () => ({
    id: chance.string({length: 8}),
    name: chance.name(),
    email: chance.email(),
  });

  const [fakeData, setFakeData] = React.useState(() =>
    new Array(numRows).fill(null).map(() => makeFakeRow())
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFakeData([...fakeData.slice(1), makeFakeRow()]);
    }, updateDelay);
    return () => clearInterval(timer);
  });

  return (
    <Table
      columnWidths={[15, 25, 40]}
      outerBorderStyle={outerBorderStyle}
      borderColor={borderColor}
    >
      <Table.Header>
        <Table.Row>
          <Table.Cell color="blue" bold>
            ID
          </Table.Cell>
          <Table.Cell color="blue" bold>
            Name
          </Table.Cell>
          <Table.Cell color="blue" bold>
            Email
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {fakeData.map(data => (
          <Table.Row key={data.id}>
            <Table.Cell>{data.id}</Table.Cell>
            <Table.Cell>{data.name}</Table.Cell>
            <Table.Cell>{data.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const cli = meow(
  `
    Usage
      $ npm run demo
 
    Options
      --outer-border
      --border-color
      --rows
      --update
 
    Examples
      $ npm run demo --outer-border=solid --border-color=white --rows=5 --update=1000
`,
  {
    flags: {
      'outer-border': {
        type: 'string',
        default: 'double',
      },
      'border-color': {
        type: 'string',
        default: 'white',
      },
      rows: {
        type: 'number',
        default: 10,
      },
      update: {
        type: 'number',
        default: 1500,
      },
    },
  }
);

render(
  <Demo
    numRows={cli.flags.rows}
    updateDelay={cli.flags.update}
    outerBorderStyle={cli.flags.outerBorder}
    borderColor={cli.flags.borderColor}
  />
);
