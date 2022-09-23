import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Pet, selectCatoryById, updatePet } from './petsSlice';
import { PetForm } from './components/PetForm';
import { useSnackbar } from 'notistack'

export const EditPet = () => {
	const id = useParams<{ id: string }>().id || '';
	const [isdisabled, setIsDisabled] = React.useState(false);
	const pet = useAppSelector((state) => selectCatoryById(state, id));
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
