import { DataGrid as MuiDataGrid, ptBR } from '@mui/x-data-grid';

const myLocale = {
  ...ptBR,
  noRowsLabel: 'Nenhum registro encontrado',
};

export const DataGrid = (props: any) => (
  <MuiDataGrid
    localeText={myLocale}
    {...props}
  />
);
