import {Box, Spacer, Text} from 'ink';
import useStdoutDimensions from 'ink-use-stdout-dimensions';
import React from 'react';

const ColumnsContext = React.createContext<Array<number>>([]);

const Row: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);

  return (
    <Box>
      <Text>║</Text>
      {React.Children.map(children, (child, index) => (
        <>
          {React.isValidElement(child)
            ? React.cloneElement(child, {
                width: columnWidths[index] + 2,
              })
            : child}
          {index < React.Children.count(children) - 1 ? <Text>│</Text> : null}
        </>
      ))}
      <Text>║</Text>
    </Box>
  );
};

const Cell: React.FC<{width?: number}> = ({children, width}) => {
  return (
    <Box width={width} paddingX={1}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
      <Spacer />
    </Box>
  );
};

const Header: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);
  return (
    <Box flexDirection="column">
      {children}
      <HorizontalLine
        columnWidths={columnWidths}
        characters={['╠', '═', '╪', '╣']}
      />
    </Box>
  );
};

const Body: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);

  return (
    <Box flexDirection="column">
      {React.Children.map(children, (child, index) => {
        return (
          <>
            {index > 0 ? (
              <HorizontalLine
                columnWidths={columnWidths}
                characters={['╟', '─', '┼', '╢']}
              />
            ) : null}
            {child}
          </>
        );
      })}
    </Box>
  );
};

const HorizontalLine: React.FC<{
  columnWidths: Array<number>;
  characters: [string, string, string, string];
}> = ({columnWidths, characters}) => {
  return (
    <Text>
      {characters[0]}
      {columnWidths.map((c, index) => {
        const isLast = index === columnWidths.length - 1;
        return (
          <React.Fragment key={index}>
            {characters[1].repeat(c + 2)}
            {isLast ? '' : characters[2]}
          </React.Fragment>
        );
      })}
      {characters[3]}
    </Text>
  );
};

interface TableSubcomponents {
  Row: typeof Row;
  Header: typeof Header;
  Cell: typeof Cell;
  Body: typeof Body;
}

export const Table: React.FC<{
  columnWidths: Array<number | null>;
  maxWidth?: number;
}> &
  TableSubcomponents = ({children, columnWidths, maxWidth}) => {
  const [columns] = useStdoutDimensions();
  const width = maxWidth ?? columns;

  const totalFixedColumns =
    columnWidths.reduce(
      (total, column) => (column === null ? total : (total ?? 0) + column + 4),
      0
    ) || 0;

  const numDynamicColumns = columnWidths.filter(column => column === null)
    .length;
  const calculatedColumnWidths: Array<number> = [];
  columnWidths.forEach(column => {
    calculatedColumnWidths.push(
      column === null
        ? Math.floor((width - 2 - totalFixedColumns) / numDynamicColumns)
        : column
    );
  });

  return (
    <ColumnsContext.Provider value={calculatedColumnWidths}>
      <Box flexDirection="column" width={columns}>
        <HorizontalLine
          columnWidths={calculatedColumnWidths}
          characters={['╔', '═', '╤', '╗']}
        />
        {children}
        <HorizontalLine
          columnWidths={calculatedColumnWidths}
          characters={['╚', '═', '╧', '╝']}
        />
      </Box>
    </ColumnsContext.Provider>
  );
};

Table.Row = Row;
Table.Cell = Cell;
Table.Header = Header;
Table.Body = Body;
