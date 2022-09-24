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
		microchip: '',
		neutered: false,
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

	const handleBreedChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setPetState({ ...petState, [name]: value });				
	};

	const handleNeuteredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setPetState({ ...petState, [name]: checked });
	};

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Cadastrar pet</Typography>
					</Box>
				</Box>
				<PetForm
					pet={petState}
					petType={petState.type}
					breedName={petState.breed}
					isdisabled={isdisabled}
					isLoading={false}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToogle={handleToogle}
					handlePetTypeChange={handlePetTypeChange}
					handlePetGenderChange={handlePetGenderChange}
					handlePetBirthDateChange={handlePetBirthDateChange}
					handleBreedChange={handleBreedChange}
					handleNeuteredChange={handleNeuteredChange}
				/>
			</Paper>
		</Box>
	);
};
