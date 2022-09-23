import {
	Box,
	Paper,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Pet, createPet } from './petsSlice';
import { PetForm } from './components/PetForm';
import { useSnackbar } from 'notistack'

export const CreatePet = () => {
	const [isdisabled, setIsDisabled] = useState(false);
	const [petState, setPetState] = useState<Pet>({
		id: '',
		name: '',
		type: '',
		other_type: '',
		breed: '',
		birthday: '',
		customer_id: '',
		image_url: '',
		is_active: true,
		created_at: '',
		updated_at: '',
		deleted_at: ''
	});
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		dispatch(createPet(petState));
		enqueueSnackbar('Pet created successfully', { variant: 'success' });
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPetState({ ...petState, [name]: value });
	};

	const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setPetState({ ...petState, [name]: checked });
	};

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create Pet</Typography>
					</Box>
				</Box>
			<PetForm
				pet={petState}
				isdisabled={isdisabled}
				isLoading={false}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				handleToogle={handleToogle}
			/>
			</Paper>
		</Box>
	);
};
