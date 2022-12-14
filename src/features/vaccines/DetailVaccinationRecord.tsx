import {
	Backdrop,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Paper,
	styled,
	Typography,
} from '@mui/material';

import { Link, useParams } from 'react-router-dom';
import { VaccinationRecord } from '../../types/VaccinationRecord';
import Formatters from '../../utils/ui/Formatters';
import { useGetVaccinationRecordsByPetAndVaccineQuery } from './vaccinationRecordsSlice';

export const DetailVaccinationRecord = () => {
	const pet_id = useParams<{ pet_id: string }>().pet_id || '';
	const id = useParams<{ id: string }>().id || '';
	const {
		data: vaccinationRecord,
		isFetching,
		error,
	} = useGetVaccinationRecordsByPetAndVaccineQuery({ pet_id, id });
	const formatDate = Formatters.formatDate;

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	}));
	const vaccineListPath = `/pets/${pet_id}/vaccines`;

	return (
		<Box>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={isFetching}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Paper>
				<Box p={2}>
					<Box>
						<Typography variant="h4">
							Vacina {vaccinationRecord?.data[0]?.vaccine?.name}
						</Typography>
					</Box>
				</Box>
				<Box ml={2} mb={2}>
					<Box>
						<Typography variant="h6">
							{vaccinationRecord?.data[0]?.pet?.name}
						</Typography>
					</Box>
				</Box>
				<Box ml={2}>
					<Box>
						{vaccinationRecord?.data.map(
							(vaccination: VaccinationRecord) => (
								<Box key={vaccination.id} sx={{ flexGrow: 1 }} mr={2} mb={2}>
									<Card variant="outlined" sx={{borderRadius: 2}}>
										<CardContent>
											<Grid container spacing={0}>
												<Grid item xs={8}>
													<Item>
														{
															vaccination
																.vaccine_schedule
																?.description
														}
													</Item>
												</Grid>
												<Grid
													item
													xs={4}
													textAlign="end"
												>
													<Item>
														{formatDate(
															vaccination.application_date ||
																''
														)}
													</Item>
												</Grid>
											</Grid>
											<Box mt={2} ml={2}>
												<Typography variant="subtitle2">
													Fabricante
												</Typography>
												<Typography
													variant="overline"
													display="block"
													gutterBottom
												>
													{vaccination.brand?.name}
												</Typography>
												<Typography variant="subtitle2">
													Clínica
												</Typography>
												<Typography
													variant="overline"
													display="block"
													gutterBottom
												>
													{vaccination.clinic ||
														'Não informado'}
												</Typography>
												<Typography variant="subtitle2">
													Veterinário
												</Typography>
												<Typography variant="overline">
													{vaccination.vet ||
														'Não informado'}
												</Typography>
											</Box>
										</CardContent>
									</Card>
								</Box>
							)
						)}
					</Box>
				</Box>
				<Box display="flex" gap={2} ml={2}>
					<Button variant="contained" component={Link} to={vaccineListPath}>
						Voltar
					</Button>
				</Box>
				<Box display="flex" p={1}/>
			</Paper>
		</Box>
	);
};
