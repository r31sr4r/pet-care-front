import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Petlist } from './components/PetList';
import {
	selectPets,
	useGetPetsByCustomerIDQuery,
	useGetPetsQuery,
} from './petsSlice';

export const ListPets = () => {
	const { data, isFetching, error } = useGetPetsByCustomerIDQuery(
		{ customer_id: 'eb115738-7d68-4916-976e-6df6bec808a8' },
	);
	const pets = useAppSelector(selectPets);
	const navigate = useNavigate();

	const handleClick = (pet: any) => {
		navigate(`/pets/edit/${pet.id}`);
	};

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/pets/create"
					style={{ marginBottom: '1rem' }}
				>
					New Pet
				</Button>
			</Box>
			<Petlist data={data} handleClick={handleClick} />
		</Box>
	);
};
