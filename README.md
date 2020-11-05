<h1 align="center">Welcome to ink-component-table 👋</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/ink-component-table">
    <img alt="npm version" src="https://img.shields.io/npm/v/ink-component-table.svg?style=for-the-badge&logo=npm">
  </a>
  <a href="https://circleci.com/gh/matthewtole/ink-component-table">
    <img alt="CI status" src="https://img.shields.io/circleci/build/github/matthewtole/ink-component-table?style=for-the-badge&logo=circleci">
  </a>
  <a href="https://codecov.io/gh/matthewtole/ink-component-table">
    <img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/matthewtole/ink-component-table?style=for-the-badge&logo=codecov">
  </a>
  <br />
  <a href="https://github.com/matthewtole/ink-table/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge&logo=github" />
  </a>
  <a href="https://github.com/matthewtole/ink-table/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/github/license/matthewtole/ink-component-table?style=for-the-badge&logo=github" />
  </a>
  <a href="https://twitter.com/matthewtole">
    <img alt="Twitter: matthewtole" src="https://img.shields.io/twitter/follow/matthewtole.svg?style=for-the-badge&logo=twitter" />
  </a>
</p>

A table component for [Ink](https://github.com/vadimdemedes/ink).

## Installation

```sh
npm install --save ink-component-table
```

## Demo

![Screen recording of the component demo](https://i.imgur.com/MUv6kru.gif)

```
npm run build && npm run demo
```

## Usage

```jsx
import {Table} from 'ink-component-table';

render(
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
);
```

## Run tests

```sh
# You will need to build the library first
npm run build
npm run test
```

## Author

👤 **Matthew Tole <matthewtole@gmail.com>**

- Website: http://matthewtole.com
- Twitter: [@matthewtole](https://twitter.com/matthewtole)
- Github: [@matthewtole](https://github.com/matthewtole)
- LinkedIn: [@matthewtole](https://linkedin.com/in/matthewtole)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/matthewtole/ink-table/issues). You can also take a look at the [contributing guide](https://github.com/matthewtole/ink-table/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Matthew Tole <matthewtole@gmail.com>](https://github.com/matthewtole).<br />
This project is [MIT](https://github.com/matthewtole/ink-table/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
