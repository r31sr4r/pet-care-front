import {
	Box,
	FormControl,
	Grid,
	Paper,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { VaccineSelector } from '../vaccines/components/VaccineSelector';

export const CreateVaccinationRecord = () => {
	const handleVaccineChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
	};

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Registrar Vacina</Typography>
					</Box>
				</Box>

				<Box p={2}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<VaccineSelector
									vaccineName='teste'
									breedType='DOG'
									handleVaccineChange={handleVaccineChange}
								/>
							</FormControl>
						</Grid>
					</Grid>

					{/* <form onSubmit={onSubmit}>
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
						<VaccineSelector
							breedName={breedId}
							petType={petType}
							handleVaccineChange={handleVaccineChange}
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
			</form> */}
				</Box>
			</Paper>
		</Box>
	);
};
