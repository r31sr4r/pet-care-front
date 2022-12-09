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
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Pet } from '../../../types/Pet';
import { Provider } from 'react-redux';
import { VaccineSelector } from './VaccineSelector';
import { BrandSelector } from '../../brands/components/BrandSelector';
import { VaccineScheduleSelector } from './VaccineScheduleSelector';
import { VaccinationRecord } from '../../../types/VaccinationRecord';

type Props = {
	vaccinationRecord: VaccinationRecord;
	// vaccinationRecordType: string;
	vaccineId: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	// handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	// handlePetGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAppliedDateChange: (newValue: Dayjs | null) => void;
	handleBoosterDateChange: (newValue: Dayjs | null) => void;
	// handleBrandChange: (e: SelectChangeEvent) => void;
	handleAppliedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBrandChange: (e: SelectChangeEvent) => void;
	handleVaccineChange: (e: SelectChangeEvent) => void;
	handleVaccineScheduleChange: (e: SelectChangeEvent) => void;
};

export function VaccinationRecordForm({
	vaccinationRecord,
	// vaccinationRecordType,	
	vaccineId: vaccineId,
	isDisabled,
	isLoading,
	handleSubmit: onSubmit,
	handleChange,
	// handlePetGenderChange,
	handleAppliedDateChange,
	handleBoosterDateChange,
	handleAppliedChange,
	handleVaccineChange,
	handleBrandChange,
	handleVaccineScheduleChange,
}: Props) {
	return (
		<Box p={2}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<VaccineSelector							
							vaccineId={vaccineId}
							breedType="DOG"
							handleVaccineChange={handleVaccineChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<VaccineScheduleSelector
							vaccineScheduleId={vaccinationRecord.vaccine_schedule_id}
							vaccineId={vaccinationRecord.vaccine_id}
							handleVaccineScheduleChange={
								handleVaccineScheduleChange
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<BrandSelector
							brandId={vaccinationRecord.brand_id}
							brandType="VACCINE"
							handleBrandChange={handleBrandChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										name="was_applied"
										color="secondary"
										onChange={handleAppliedChange}
										checked={vaccinationRecord.was_applied}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								label="Aplicado?"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<MobileDatePicker
										label="Data da Apliciação"
										inputFormat="DD/MM/YYYY"
										value={vaccinationRecord.application_date}
										onChange={handleAppliedDateChange}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</Stack>
							</LocalizationProvider>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<MobileDatePicker
										label="Data da Próxima Dose"
										inputFormat="DD/MM/YYYY"
										value={vaccinationRecord.booster_date}
										onChange={handleBoosterDateChange}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</Stack>
							</LocalizationProvider>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField								
								name="notes"
								label="Observações"
								multiline								
								maxRows={4}
								// value={vaccinationRecord.name}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								name="clinic"
								label="Clínica/estabelecimento"
								//value={vaccinationRecord.microchip?.toString()}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								name="vet"
								label="Veterinário"
								//value={vaccinationRecord.microchip?.toString()}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>

					{/* <Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<MobileDatePicker
										label="Data de Nascimento"
										inputFormat="DD/MM/YYYY"
										value={vaccinationRecord.birth_date}
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
										(vaccinationRecord.gender &&
											vaccinationRecord.gender === 'female') ||
										undefined
									}
								/>
								<FormControlLabel
									value="male"
									control={<Radio />}
									label="Macho"
									checked={
										(vaccinationRecord.gender && vaccinationRecord.gender === 'male') ||
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
								value={vaccinationRecord.microchip?.toString()}
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
										checked={vaccinationRecord.neutered}
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
										checked={vaccinationRecord.is_active}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								label="Active"
							/>
						</FormGroup>
					</Grid> */}

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								component={Link}
								to="/vaccinationRecords"
							>
								Voltar
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isDisabled || isLoading}
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
