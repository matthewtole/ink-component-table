import {Box, Spacer, Text, TextProps} from 'ink';
import useStdoutDimensions from 'ink-use-stdout-dimensions';
import React from 'react';

interface TableStyle {
  outerBorder: 'double' | 'solid';
}

const defaultStyle: TableStyle = {
  outerBorder: 'double',
};

const ColumnsContext = React.createContext<Array<number>>([]);
const StyleContext = React.createContext<TableStyle>(defaultStyle);

const HorizontalLine: React.FC<{
  characters: [string, string, string, string];
}> = ({characters}) => {
  const columnWidths = React.useContext(ColumnsContext);
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

const BORDER_CHARACTERS: {
  [outerBorder: string]: {[type: string]: [string, string, string, string]};
} = {
  solid: {
    top: ['┏', '━', '┯', '┓'],
    bottom: ['┗', '━', '┷', '┛'],
    header: ['┣', '━', '┿', '┫'],
    body: ['┠', '─', '┼', '┨'],
  },
  double: {
    top: ['╔', '═', '╤', '╗'],
    bottom: ['╚', '═', '╧', '╝'],
    header: ['╠', '═', '╪', '╣'],
    body: ['╟', '─', '┼', '╢'],
  },
};

const VERTICAL_CHARACTERS = {
  solid: '┃',
  double: '║',
};

const BorderTop: React.FC = () => {
  const {outerBorder} = React.useContext(StyleContext);
  return <HorizontalLine characters={BORDER_CHARACTERS[outerBorder].top} />;
};

const BorderBottom: React.FC = () => {
  const {outerBorder} = React.useContext(StyleContext);
  return <HorizontalLine characters={BORDER_CHARACTERS[outerBorder].bottom} />;
};

const HeaderBorder: React.FC = () => {
  const {outerBorder} = React.useContext(StyleContext);
  return <HorizontalLine characters={BORDER_CHARACTERS[outerBorder].header} />;
};

const BodyBorder: React.FC = () => {
  const {outerBorder} = React.useContext(StyleContext);
  return <HorizontalLine characters={BORDER_CHARACTERS[outerBorder].body} />;
};

const Row: React.FC = ({children}) => {
  const columnWidths = React.useContext(ColumnsContext);
  const {outerBorder} = React.useContext(StyleContext);

  return (
    <Box>
      <Text>{VERTICAL_CHARACTERS[outerBorder]}</Text>
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
      <Text>{VERTICAL_CHARACTERS[outerBorder]}</Text>
    </Box>
  );
};

const Cell: React.FC<{width?: number} & TextProps> = ({
  children,
  width,
  ...textProps
}) => {
  return (
    <Box width={width} paddingX={1}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text {...textProps}>{children}</Text>
      ) : (
        children
      )}
      <Spacer />
    </Box>
  );
};

const Header: React.FC = ({children}) => {
  return (
    <Box flexDirection="column">
      {children}
      <HeaderBorder />
    </Box>
  );
};

const Body: React.FC = ({children}) => {
  return (
    <Box flexDirection="column">
      {React.Children.map(children, (child, index) => {
        return (
          <>
            {index > 0 ? <BodyBorder /> : null}
            {child}
          </>
        );
      })}
    </Box>
  );
};

function calculateColumns(
  width: number,
  columnWidths: Array<number | null>
): Array<number> {
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
  return calculatedColumnWidths;
}

interface TableSubcomponents {
  Row: typeof Row;
  Header: typeof Header;
  Cell: typeof Cell;
  Body: typeof Body;
}

interface TableProps {
  columnWidths: Array<number | null>;
  maxWidth?: number;
  outerBorderStyle?: 'double' | 'solid';
}

export const Table: React.FC<TableProps> & TableSubcomponents = ({
  children,
  columnWidths,
  maxWidth,
  outerBorderStyle,
}) => {
  const [columns] = useStdoutDimensions();
  const width = maxWidth ?? columns;

  const calculatedColumns = React.useMemo(
    () => calculateColumns(width, columnWidths),
    [width, columnWidths]
  );

  return (
    <ColumnsContext.Provider value={calculatedColumns}>
      <StyleContext.Provider
        value={{
          ...defaultStyle,
          outerBorder: outerBorderStyle ?? defaultStyle.outerBorder,
        }}
      >
        <Box flexDirection="column" width={columns}>
          <BorderTop />
          {children}
          <BorderBottom />
        </Box>
      </StyleContext.Provider>
    </ColumnsContext.Provider>
  );
};

Table.Row = Row;
Table.Cell = Cell;
Table.Header = Header;
Table.Body = Body;
