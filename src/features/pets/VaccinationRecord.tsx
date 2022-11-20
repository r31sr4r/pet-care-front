import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Paper,
	Typography,
	Grid,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export const VaccinationRecord = () => {
    const id = useParams<{ id: string }>().id || '';

	return (
		<Box maxWidth="lg" mr={2} >
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={false}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box p={1}>
				<Box mb={1}>
					<Typography variant="h5">Cartão de Vacinas</Typography>
				</Box>
			</Box>
			<Grid container spacing={1} ml={1} >
				<Grid item xs={12} md={9}>
					<Typography variant="h6">Ravena</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Button
						variant="contained"
						color="secondary"
						component={Link}
						to={`/pets/${id}/vaccines/create`}
						style={{ marginBottom: '1rem' }}
					>
						Registrar Vacina
					</Button>
				</Grid>
			</Grid>
			<Paper></Paper>
		</Box>
	);
};
