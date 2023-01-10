import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { VaccinationRecord } from '../../types/VaccinationRecord';
import { useGetPetQuery } from '../pets/petsSlice';
import { VaccinationRecordCard } from './components/VaccinationRecordCard';
import { useGetVaccinationRecordsByPetQuery } from './vaccinationRecordsSlice';

export const VaccinationRecordList = () => {
	const navigate = useNavigate();
	const id = useParams<{ id: string }>().id || '';
	const { data: pet } = useGetPetQuery({ id });
	const { data: vaccinationRecord, isFetching } =
		useGetVaccinationRecordsByPetQuery({
			id,
		});

	const vaccinationGrouped = vaccinationRecord?.data.reduce(
		(acc: any, vaccination: VaccinationRecord) => {
			if (vaccination.vaccine?.id) {
				if (!acc[vaccination.vaccine?.id]) {
					acc[vaccination.vaccine?.id] = [];
				}
				acc[vaccination.vaccine?.id].push(vaccination);
			}
			return acc;
		},
		{}
	);

	const handleClick = (vaccineId: string) => {
		navigate(`/pets/${id}/vaccines/${vaccineId}`);
	};

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={isFetching}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box>
				<Box>
					<Grid container>
						<Grid item xs={12} md={4}>
							<Typography variant="h4" color='text.primary'>
								Cartão de Vacinas
							</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Typography variant="h4" color='text.primary'>
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
					to={`/pets/${id}/vaccines/create`}
					style={{ marginBottom: '1rem' }}
				>
					Registrar Vacina
				</Button>
			</Box>
			<Paper>
				<Box sx={{ p: 2 }}>
					{!isFetching &&
						(vaccinationGrouped === undefined ||
							Object.keys(vaccinationGrouped).length === 0) && (
							<Typography variant="body2">
								Nenhuma vacina registrada
							</Typography>
						)}

					<VaccinationRecordCard
						vaccinationGrouped={vaccinationGrouped}
						handleClick={handleClick}
					/>
				</Box>
			</Paper>
			<Box display="flex" mt={2}>
				<Button variant="contained" component={Link} to="/pets">
					Voltar
				</Button>
			</Box>
		</Box>
	);
};
