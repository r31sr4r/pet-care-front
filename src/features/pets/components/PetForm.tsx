import React from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
	Switch,
	FormControlLabel,
	FormGroup,
	SelectChangeEvent,
	FormLabel,
	RadioGroup,
	Radio,
	Stack,
	Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PetTypeSelector } from './PetTypeSelector';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { BreedSelector } from '../../breeds/components/BreedSelector';
import { Pet } from '../../../types/Pet';
import { Provider } from 'react-redux';

type Props = {
	pet: Pet;
	petType: string;
	breedName: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePetTypeChange: (e: SelectChangeEvent) => void;
	handlePetGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePetBirthDateChange: (newValue: Dayjs | null) => void;
	handleBreedChange: (e: SelectChangeEvent) => void;
	handleNeuteredChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PetForm({
	pet,
	petType,
	breedName: breedId,
	isDisabled,
	isLoading,
	handleSubmit: onSubmit,
	handleChange,
	handleToggle,
	handlePetTypeChange,
	handlePetGenderChange,
	handlePetBirthDateChange,
	handleBreedChange,
	handleNeuteredChange,
}: Props) {
	return (
		<Box p={2}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="name"
								label="Name"
								value={pet.name}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<PetTypeSelector
							petType={petType}
							handlePetTypeChange={handlePetTypeChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<BreedSelector
							breedName={breedId}
							petType={petType}
							handleBreedChange={handleBreedChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<MobileDatePicker
										label="Data de Nascimento"
										inputFormat="DD/MM/YYYY"
										value={pet.birth_date}
										onChange={handlePetBirthDateChange}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</Stack>
							</LocalizationProvider>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl>
							<FormLabel id="demo-row-radio-buttons-group-label">
								Gênero
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="gender"
								onChange={handlePetGenderChange}
							>
								<FormControlLabel
									value="female"
									control={<Radio />}
									label="Fêmea"
									checked={
										(pet.gender &&
											pet.gender === 'female') ||
										undefined
									}
								/>
								<FormControlLabel
									value="male"
									control={<Radio />}
									label="Macho"
									checked={
										(pet.gender && pet.gender === 'male') ||
										undefined
									}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField								
								name="microchip"
								label="Microchip"
								value={pet.microchip?.toString()}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormGroup>						
							<FormControlLabel
								control={
									<Switch
										name="neutered"
										color="secondary"
										onChange={handleNeuteredChange}
										checked={pet.neutered}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								
								label="Castrado(a)"
							/>
						</FormGroup>						
					</Grid>

					<Grid item xs={12}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										name="is_active"
										color="secondary"
										onChange={handleToggle}
										checked={pet.is_active}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								label="Active"
							/>
						</FormGroup>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								component={Link}
								to="/pets"
							>
								Voltar
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={ isDisabled || isLoading }
							>
								{isLoading ? 'Salvando...' : 'Salvar'}								
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
