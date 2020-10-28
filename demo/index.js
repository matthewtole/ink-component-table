import React from 'react';
import {render} from 'ink';

import {Table} from '../dist';

render(
  <>
    <Table columnWidths={[10, 20, 30]}>
      <Table.Header>
        <Table.Row>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Email</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>123</Table.Cell>
          <Table.Cell>Matthew</Table.Cell>
          <Table.Cell>matthewtole@gmail.com</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>

    <Table columnWidths={[20, 30, null]}>
      <Table.Header>
        <Table.Row>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Email</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>123</Table.Cell>
          <Table.Cell>Matthew</Table.Cell>
          <Table.Cell>matthewtole@gmail.com</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </>
);
