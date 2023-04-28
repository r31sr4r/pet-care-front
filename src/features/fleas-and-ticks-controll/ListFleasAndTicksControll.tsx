import { Box, Button, Grid, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	useGetFleasAndTicksControllQuery,
	useDeleteFleasAndTicksControllMutation,
} from './fleasAndTicksControllSlice';
import { FleasAndTicksControllTable } from './components/FleasAndTicksControllTable';
import { useGetPetQuery } from '../pets/petsSlice';


export const FleasAndTicksControllList = () => {
	const { enqueueSnackbar } = useSnackbar();
	const id = useParams<{ id: string }>().id || '';
	const { data: pet } = useGetPetQuery({ id });
	
	const [options, setOptions] = useState({
		page: 1,
		filter: id,
		per_page: 5,
		rowsPerPage: [5, 10, 15],
	});
	const { data, isFetching, error } = useGetFleasAndTicksControllQuery(options);
	const [deleteFleasAndTicksControll, deleteFleasAndTicksControlltatus] =
		useDeleteFleasAndTicksControllMutation();

	useEffect(() => {
		if (deleteFleasAndTicksControlltatus.isSuccess) {
			enqueueSnackbar('Dewormer Record deleted successfully', {
				variant: 'success',
			});
		}
		if (deleteFleasAndTicksControlltatus.error) {
			enqueueSnackbar('Error deleting cdewormersRecord', {
				variant: 'error',
			});
		}
	}, [deleteFleasAndTicksControlltatus, enqueueSnackbar]);

	if (error) {
		return (
			<Typography color="error">
				Ocorreu um erro ao carregar a lista de vermifugação
			</Typography>
		);
	}

	async function handleDelete(id: string) {
		await deleteFleasAndTicksControll({ id });
	}

	function handleOnPageChange(page: number) {
		setOptions((prev) => ({ ...prev, page: page + 1 }));
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (filterModel.quickFilterValues?.length) {
			const search = filterModel.quickFilterValues.join('');
			setOptions((prev) => ({ ...prev, filter: search }));
		} else {
			setOptions((prev) => ({ ...prev, filter: '' }));
		}
	}

	function handleOnPageSizeChange(perPage: number) {
		setOptions((prev) => ({ ...prev, per_page: perPage }));
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
			<Box>
				<Box>
					<Grid container>
						<Grid item xs={12} md={4}>
							<Typography variant="h4" color="text.primary">
								Controle de Pulgas e Carrapatos
							</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Typography variant="h4" color="text.primary">
								{pet?.data?.name}
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}					
					to={`/pets/${id}/dewormer-records/create`}
					style={{ marginBottom: '1rem' }}
				>
					Registrar
				</Button>
			</Box>
			<FleasAndTicksControllTable
				data={data}
				isFetching={isFetching}
				perPage={options.per_page}
				rowsPerPage={options.rowsPerPage}
				handleDelete={handleDelete}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
			/>
			<Box display="flex" mt={2}>
				<Button variant="contained" component={Link} to="/pets">
					Voltar
				</Button>
			</Box>
		</Box>
	);
};
