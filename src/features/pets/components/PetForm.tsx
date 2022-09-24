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
} from '@mui/material';
import { Pet } from '../petsSlice';
import { Link } from 'react-router-dom';
import { PetTypeSelector } from './PetTypeSelector';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type Props = {
	pet: Pet;
	petType: string;
	isdisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleToogle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePetTypeChange: (e: SelectChangeEvent) => void;
	handlePetGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePetBirthDateChange: (newValue: Dayjs | null) => void;
};

export function PetForm({
	pet,
	petType,
	isdisabled,
	isLoading,
	handleSubmit: onSubmit,
	handleChange,
	handleToogle,
	handlePetTypeChange,
	handlePetGenderChange,
	handlePetBirthDateChange,
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
								disabled={isdisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<PetTypeSelector
							petType={petType}
							handlePetTypeChange={handlePetTypeChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl>
							<FormLabel id="demo-row-radio-buttons-group-label">
								Gender
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
									checked={(pet.gender && pet.gender === 'female') || undefined}
								/>
								<FormControlLabel
									value="male"
									control={<Radio />}
									label="Macho"
									checked={(pet.gender && pet.gender === 'male') || undefined}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="breed"
								label="Breed"
								value={pet.breed}
								disabled={isdisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
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

					<Grid item xs={12}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										name="is_active"
										color="secondary"
										onChange={handleToogle}
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
								Back
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isdisabled}
							>
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
