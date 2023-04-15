import { Box, IconButton, Typography } from '@mui/material';
import { Results } from '../../../types/DewormerRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
	GridFilterModel,
	GridRenderCellParams
} from '@mui/x-data-grid';
import { SelectBoosterUnit } from '../../../utils/SelectBoosterUnit';

type Props = {
	data: Results | undefined;
	perPage: number;
	isFetching: boolean;
	rowsPerPage?: number[];

	handleOnPageChange: (page: number) => void;
	handleFilterChange: (filterModel: GridFilterModel) => void;
	handleOnPageSizeChange: (perPage: number) => void;
	handleDelete: (id: string) => void;
};

export function DewormerRecordsTable({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Props) {
	const componentProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: {
				debounceMs: 500,
			},
		},
	};

	const mapDataToGridRows = (data: Results) => {
		const { data: dewormer_records } = data;
		return dewormer_records.map((record) => ({
			id: record.id,
			name: record.dewormer_name,            
			application_date: record.application_date == null ? 
				'' : 
				new Date(record.application_date).toLocaleDateString(
				'pt-BR'
			),           
			duration: `${record.booster_interval} - ${SelectBoosterUnit(record.booster_interval, record.booster_unit)}`,
		}));
	};

	const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			renderCell: renderNameCell,
		},
		{
			field: 'application_date',
			headerName: 'Aplicação',
			type: 'string',
			flex: 1,
			renderCell: renderApplicationDateCell,
		},
		{
			field: 'duration',
			headerName: 'Duração',
			type: 'string',
			flex: 1,
			renderCell: renderDurationCell,
		},
		{
			field: 'id',
			headerName: 'Actions',
			type: 'string',
			flex: 1,
			renderCell: renderActionsCell,
		},
	];

	function renderNameCell(rowData: any) {
		return (
			<Link
				style={{ textDecoration: 'none' }}
				to={`/categories/edit/${rowData.id}`}
			>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		);
	}

	function renderApplicationDateCell(rowData: any) {
		return (
			<Typography color={rowData.value ? 'primary' : 'secondary'}>
				{rowData.value}
			</Typography>
		);
	}

	function renderDurationCell(rowData: any) {
		return (
			<Typography color={rowData.value ? 'primary' : 'secondary'}>
				{rowData.value}
			</Typography>
		);
	}

	function renderActionsCell(params: GridRenderCellParams) {
		return (
			<IconButton
				color="secondary"
				onClick={() => handleDelete(params.value)}
				arial-label="delete"
				data-testid="delete-button"
			>
				<DeleteIcon />
			</IconButton>
		);
	}

	const rowCounter = data?.meta.total || 0;

	return (
		<Box sx={{ display: 'flex', height: 400 }}>
			<DataGrid
				checkboxSelection={false}
				columns={columns}
				components={{ Toolbar: GridToolbar }}
				componentsProps={componentProps}
				disableColumnFilter={true}
				disableColumnSelector={true}
				disableDensitySelector={true}
				disableSelectionOnClick={true}
				filterMode={'server'}
				loading={isFetching}
				pageSize={perPage}
				paginationMode={'server'}
				rowCount={rowCounter}
				rows={rows}
				rowsPerPageOptions={rowsPerPage}
				onFilterModelChange={handleFilterChange}
				onPageChange={handleOnPageChange}
				onPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
}
