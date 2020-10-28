import {Box, Spacer, Text} from 'ink';
import useStdoutDimensions from 'ink-use-stdout-dimensions';
import React from 'react';

const ColumnsContext = React.createContext<Array<number>>([]);

const Row: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);

  return (
    <Box>
      <Text>║ </Text>
      {React.Children.map(children, (child, index) => (
        <>
          {React.isValidElement(child)
            ? React.cloneElement(child, {
                width: columnWidths[index],
              })
            : child}
          <Text>
            {' '}
            ║{index === React.Children.count(children) - 1 ? '' : ' '}
          </Text>
        </>
      ))}
    </Box>
  );
};

const Cell: React.FC<{width?: number}> = ({children, width}) => {
  return (
    <Box width={width}>
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
  return <Box flexDirection="column">{children}</Box>;
};

const Body: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);

  return (
    <Box flexDirection="column">
      {React.Children.map(children, child => {
        return (
          <>
            <SegmentedLine columnWidths={columnWidths} />
            {child}
          </>
        );
      })}
    </Box>
  );
};

const CORNERS: {[key: string]: string} = {
  'top-left': '╔',
  'top-center': '╦',
  'top-right': '╗',
  'middle-left': '╠',
  'middle-center': '╬',
  'middle-right': '╣',
  'bottom-left': '╚',
  'bottom-center': '╩',
  'bottom-right': '╝',
};

const SegmentedLine: React.FC<{
  columnWidths: Array<number>;
  position?: 'top' | 'bottom' | 'middle';
}> = ({columnWidths, position = 'middle'}) => {
  return (
    <Text>
      {CORNERS[`${position}-left`]}
      {columnWidths.map((c, index) => {
        const isLast = index === columnWidths.length - 1;
        return (
          <React.Fragment key={index}>
            {'═'.repeat(c + 2)}
            {isLast ? '' : CORNERS[`${position}-center`]}
          </React.Fragment>
        );
      })}
      {CORNERS[`${position}-right`]}
    </Text>
  );
};

interface TableSubcomponents {
  Row: typeof Row;
  Header: typeof Header;
  Cell: typeof Cell;
  Body: typeof Body;
}

export const Table: React.FC<{columnWidths: Array<number | null>}> &
  TableSubcomponents = ({children, columnWidths}) => {
  const [columns] = useStdoutDimensions();

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
        ? Math.floor((columns - 2 - totalFixedColumns) / numDynamicColumns)
        : column
    );
  });

  return (
    <ColumnsContext.Provider value={calculatedColumnWidths}>
      <Box flexDirection="column" width={columns}>
        <SegmentedLine columnWidths={calculatedColumnWidths} position="top" />
        {children}
        <SegmentedLine
          columnWidths={calculatedColumnWidths}
          position="bottom"
        />
      </Box>
    </ColumnsContext.Provider>
  );
};

Table.Row = Row;
Table.Cell = Cell;
Table.Header = Header;
Table.Body = Body;
