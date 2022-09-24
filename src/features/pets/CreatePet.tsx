import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Pet, createPet } from './petsSlice';
import { PetForm } from './components/PetForm';
import { useSnackbar } from 'notistack';
import { Dayjs } from 'dayjs';

export const CreatePet = () => {
	const [isdisabled, setIsDisabled] = useState(false);
	const [petState, setPetState] = useState<Pet>({
		id: '',
		name: '',
		type: '',
		other_type: '',
		breed: '',
		gender: '',
		birth_date: null,
		customer_id: '',
		image_url: '',
		is_active: true,
		created_at: '',
		updated_at: '',
		deleted_at: '',
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

	const handlePetTypeChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setPetState({ ...petState, [name]: value });
	};

	const handlePetGenderChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setPetState({ ...petState, [name]: value });
	};

	const handlePetBirthDateChange = (newValue: Dayjs | null) => {
		setPetState({
			...petState,
			birth_date: newValue?.format('YYYY-MM-DD'),
		});
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
					petType={petState.type}
					isdisabled={isdisabled}
					isLoading={false}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToogle={handleToogle}
					handlePetTypeChange={handlePetTypeChange}
					handlePetGenderChange={handlePetGenderChange}
					handlePetBirthDateChange={handlePetBirthDateChange}
				/>
			</Paper>
		</Box>
	);
};
