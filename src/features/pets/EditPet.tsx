import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Pet, selectPetById, updatePet } from './petsSlice';
import { PetForm } from './components/PetForm';
import { useSnackbar } from 'notistack'
import { Dayjs } from 'dayjs';

export const EditPet = () => {
	const id = useParams<{ id: string }>().id || '';
	const [isdisabled, setIsDisabled] = React.useState(false);
	const pet = useAppSelector((state) => selectPetById(state, id));
	const [petState, setPetState] = React.useState<Pet>(pet);
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		dispatch(updatePet(petState));
		enqueueSnackbar('Pet updated successfully', { variant: 'success' });
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
		setPetState({ ...petState, birth_date: newValue?.format('YYYY-MM-DD') });
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
						<Typography variant="h4">Editar pet</Typography>
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
