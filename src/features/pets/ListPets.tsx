import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Petlist } from './components/PetList';
import { selectPets, useGetPetsByCustomerIDQuery } from './petsSlice';
import { UserData } from '../../utils/security/UserData';

export const ListPets = () => {
	const { data, isFetching, error } = useGetPetsByCustomerIDQuery({
		customer_id: UserData()?.user.id,
	});
	const pets = useAppSelector(selectPets);
	const navigate = useNavigate();

	const handleClick = (pet: any) => {
		navigate(`/pets/edit/${pet.id}`);
	};

	if (error) {
		return (
			<Typography color="error">
				Ocorreu um erro ao carregar a lista de pets
			</Typography>
		);
	}

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
			<Petlist results={data} handleClick={handleClick} />
		</Box>
	);
};
