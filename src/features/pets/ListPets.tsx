import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../utils/security/UserData';
import { Petlist } from './components/PetList';
import { useGetPetsByCustomerIDQuery } from './petsSlice';

export const ListPets = () => {
	const { data, isFetching, error } = useGetPetsByCustomerIDQuery({
		customer_id: UserData()?.user.id,
	});
	const navigate = useNavigate();

	const handleClick = (pet: any) => {
		navigate(`/pets/edit/${pet.id}`);
	};

	const handleFleasAndTicksControll = (pet: any) => {
		navigate(`/pets/${pet.id}/fleas-and-ticks-controll`);
	};

	const handleDewormerRecords = (pet: any) => {
		navigate(`/pets/${pet.id}/dewormer-records`);
	};

	const handleVaccine = (pet: any) => {
		navigate(`/pets/${pet.id}/vaccines`);
	};

	if (error) {
		return (
			<Typography color="error">
				Ocorreu um erro ao carregar a lista de pets
			</Typography>
		);
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
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
					<Typography variant="h4" color="text.primary">
						Meus Pets
					</Typography>
				</Box>
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/pets/create"
					style={{ marginBottom: '1rem' }}
				>
					Cadastrar Pet
				</Button>
			</Box>
			<Petlist
				results={data}
				handleClick={handleClick}
				handleFleasAndTicksControll={handleFleasAndTicksControll}
				handleDewormerRecords={handleDewormerRecords}
				handleVaccine={handleVaccine}
			/>
		</Box>
	);
};
