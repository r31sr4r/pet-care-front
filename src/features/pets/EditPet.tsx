import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetForm } from './components/PetForm';
import { Pet, useGetPetQuery, useUpdatePetMutation } from './petsSlice';

export const EditPet = () => {
	const id = useParams<{ id: string }>().id || '';
	const { data: pet, isFetching, error } = useGetPetQuery({ id });
	const [updatePet, status] = useUpdatePetMutation();

	const [petState, setPetState] = React.useState<Pet>({
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
		created_at: null,
	});

	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await updatePet(petState);
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
		setPetState({ ...petState, [name]: value, breed: '' });
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

	useEffect(() => {
		if (pet) {
			setPetState(pet);
		}
	}, [pet]);

	useEffect(() => {
		if (status.error) {
			enqueueSnackbar('Ocorreum erro ao atualizar o pet', { variant: 'error' });
		} else if (status.isSuccess) {
			enqueueSnackbar('Pet atualizado com sucesso', { variant: 'success' });
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Editar Pet</Typography>
					</Box>
				</Box>

				<PetForm
					pet={petState}
					petType={petState.type}
					breedName={petState.breed}
					isdisabled={status.isLoading}
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
