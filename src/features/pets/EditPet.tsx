import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Pet, selectPetById, updatePet } from './petsSlice';
import { PetForm } from './components/PetForm';
import { useSnackbar } from 'notistack'

export const EditPet = () => {
	const id = useParams<{ id: string }>().id || '';
	const [type, setType] = React.useState('');
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
        setType(event.target.value);
    };

	const handlePetGenderChange = (event: SelectChangeEvent) => {
		setPetState({ ...petState, gender: event.target.value });
	};

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Pet</Typography>
					</Box>
				</Box>

				<PetForm
					pet={petState}
					petType={type}
					isdisabled={isdisabled}
					isLoading={false}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToogle={handleToogle}
					handlePetTypeChange={handlePetTypeChange}
					handlePetGenderChange={handlePetGenderChange}
				/>
			</Paper>
		</Box>
	);
};
