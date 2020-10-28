import React from 'react';
import {render} from 'ink';
import Chance from 'chance';

import {Table} from '../dist';

const chance = new Chance();

const Demo = ({numRows, updateDelay}) => {
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
    <Table columnWidths={[15, 25, 40]}>
      <Table.Header>
        <Table.Row>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Email</Table.Cell>
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

render(<Demo numRows={10} updateDelay={1500} />);
