# ink-component-table

This is a table component for [Ink](https://github.com/vadimdemedes/ink).

## Demo

![](https://i.imgur.com/MUv6kru.gif)

## Installation

```
$ npm install --save ink-component-table
```

## Usage

```js
import {Table} from 'ink-component-table';

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
</Table>;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
