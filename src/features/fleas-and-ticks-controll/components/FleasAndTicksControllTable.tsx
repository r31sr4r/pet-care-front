import { Box, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridFilterModel,
	GridRowsProp,
	GridToolbar
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Results } from '../../../types/FleasAndTicksControll';
import { SelectBoosterUnit } from '../../../utils/SelectBoosterUnit';
import Formatters from '../../../utils/ui/Formatters';

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

export function FleasAndTicksControllTable({
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
			showQuickFilter: false,			
		},
	};

	const mapDataToGridRows = (data: Results) => {
		const { data: fleas_and_ticks_controll } = data;
		return fleas_and_ticks_controll.map((record) => ({
			id: record.id,
			pet_id: record.pet_id,
			name: record.medication_name,            
			application_date: record.application_date == null ? 
				'' : 
				Formatters.formatDate(record.application_date),       
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
	];

	function renderNameCell(rowData: any) {
		return (
			<Link
				style={{ textDecoration: 'none' }}
				to={`/pets/${rowData.row.pet_id}/fleas-and-ticks-controll/${rowData.id}/edit`}
			>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		);
	}

	function renderApplicationDateCell(rowData: any) {
		return (
			<Link
			style={{ textDecoration: 'none' }}
			to={`/pets/${rowData.row.pet_id}/fleas-and-ticks-controll/${rowData.id}/edit`}
			>
				<Typography color={rowData.value ? 'primary' : 'secondary'}>
					{rowData.value}
				</Typography>
			</Link>
		);
	}

	function renderDurationCell(rowData: any) {
		return (
			<Link
			style={{ textDecoration: 'none' }}
			to={`/pets/${rowData.row.pet_id}/fleas-and-ticks-controll/${rowData.id}/edit`}
			>
				<Typography color={rowData.value ? 'primary' : 'secondary'}>
					{rowData.value}
				</Typography>
			</Link>

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
