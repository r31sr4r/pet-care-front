import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { UserData } from '../../utils/security/UserData';
import { Pet } from '../../types/Pet';
import { PetForm } from './components/PetForm';
import { useCreatePetMutation } from './petsSlice';
import { PetMenu } from './components/PetMenu';
import { useNavigate } from 'react-router-dom';

export const CreatePet = () => {
	const [createPet, status ] = useCreatePetMutation();
	const [isdisabled, setIsDisabled] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
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
		created_at: null,
	});
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const payload = {
			name: petState.name,
			type: petState.type,
			other_type: petState.other_type,
			breed: petState.breed,
			gender: petState.gender,
			birth_date: petState.birth_date,
			microchip: petState.microchip,
			neutered: petState.neutered,
			customer_id: UserData()?.user.id,
			image_url: petState.image_url,
			is_active: petState.is_active,
		};

		const result = await createPet(payload);
		setPetState({ ...petState, id: result.data?.data.id });
	}

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPetState({ ...petState, [name]: value });
	};

	const handleVaccine = (petId: any) => {
		navigate(`/pets/${petId}/vaccines`);
	};

	const handleDewormerRecords = (petId: any) => {
		navigate(`/pets/${petId}/dewormer-records`);
	};

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		if (status.isSuccess) {
			enqueueSnackbar('Pet cadastrado com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
			setShowMenu(true);
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao cadastrar o Pet', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Cadastrar pet</Typography>
					</Box>
				</Box>
				<Box ml={2} mr={2}>
					<>
						{showMenu ? (
							<PetMenu
								petId={petState.id}
								handleVaccine={handleVaccine}
								handleDewormerRecords={handleDewormerRecords}
							/>
						) : (
							<div />
						)}
					</>
				</Box>
				<PetForm
					pet={petState}
					petType={petState.type}
					breedName={petState.breed}
					isDisabled={status.isLoading || isdisabled}
					isLoading={status.isLoading}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToggle={handleToggle}
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
