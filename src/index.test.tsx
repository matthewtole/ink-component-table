import {render} from 'ink-testing-library';
import React from 'react';

import {Table} from './';

describe('Table', () => {
  test('single cell table', () => {
    const {lastFrame} = render(
      <Table columnWidths={[10]}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Hello</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(lastFrame()).toEqual(
      `
╔════════════╗
║ Hello      ║
╚════════════╝
`.trim()
    );
  });

  test('two cell table', () => {
    const {lastFrame} = render(
      <Table columnWidths={[10, 20]}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Hello</Table.Cell>
            <Table.Cell>This is cell 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(lastFrame()).toEqual(
      `
╔════════════╦══════════════════════╗
║ Hello      ║ This is cell 2       ║
╚════════════╩══════════════════════╝
`.trim()
    );
  });

  test('multiple rows', () => {
    const {lastFrame} = render(
      <Table columnWidths={[5, 5]}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A1</Table.Cell>
            <Table.Cell>B1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>A2</Table.Cell>
            <Table.Cell>B2</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>A3</Table.Cell>
            <Table.Cell>B3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(lastFrame()).toEqual(
      `
╔═══════╦═══════╗
║ A1    ║ B1    ║
╠═══════╬═══════╣
║ A2    ║ B2    ║
╠═══════╬═══════╣
║ A3    ║ B3    ║
╚═══════╩═══════╝
`.trim()
    );
  });

  test('header row', () => {
    const {lastFrame} = render(
      <Table columnWidths={[5, 5]}>
        <Table.Header>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
            <Table.Cell>B</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A1</Table.Cell>
            <Table.Cell>B1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>A2</Table.Cell>
            <Table.Cell>B2</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>A3</Table.Cell>
            <Table.Cell>B3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(lastFrame()).toEqual(
      `
╔═══════╦═══════╗
║ A     ║ B     ║
╠═══════╬═══════╣
║ A1    ║ B1    ║
╠═══════╬═══════╣
║ A2    ║ B2    ║
╠═══════╬═══════╣
║ A3    ║ B3    ║
╚═══════╩═══════╝
`.trim()
    );
  });
});
