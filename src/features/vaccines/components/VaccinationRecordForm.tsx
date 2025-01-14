import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	SelectChangeEvent,
	Stack,
	Switch,
	TextField,
	TextFieldProps,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { VaccinationRecord } from '../../../types/VaccinationRecord';
import { BrandSelector } from '../../brands/components/BrandSelector';
import { VaccineScheduleSelector } from './VaccineScheduleSelector';
import { VaccineSelector } from './VaccineSelector';

type Props = {
	vaccinationRecord: VaccinationRecord;
	petID: string;
	petType: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	scheduleIdWithBooster: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAppliedDateChange: (newValue: Dayjs | null) => void;
	handleBoosterDateChange: (newValue: Dayjs | null) => void;
	handleAppliedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBrandChange: (e: SelectChangeEvent) => void;
	handleVaccineChange: (e: SelectChangeEvent) => void;
	handleVaccineScheduleChange: (e: SelectChangeEvent) => void;
};

export function VaccinationRecordForm({
	vaccinationRecord,
	petID,
	petType,
	isDisabled,
	isLoading,
	scheduleIdWithBooster,
	handleSubmit: onSubmit,
	handleChange,
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
							vaccineId={vaccinationRecord.vaccine_id}
							breedType={petType}
							handleVaccineChange={handleVaccineChange}
							isDisabled={isDisabled}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<VaccineScheduleSelector
							vaccineScheduleId={scheduleIdWithBooster}
							vaccineId={vaccinationRecord.vaccine_id}
							handleVaccineScheduleChange={
								handleVaccineScheduleChange
							}
							isDisabled={isDisabled}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<BrandSelector
							brandId={vaccinationRecord.brand_id}
							brandType="VACCINE"
							handleBrandChange={handleBrandChange}
							isDisabled={isDisabled}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										name="was_applied"
										color="secondary"
										disabled={isDisabled}
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
										disabled={isDisabled}
										value={
											vaccinationRecord.application_date
												?.length
												? vaccinationRecord.application_date.slice(
														0,
														10
												  )
												: null
										}
										onChange={handleAppliedDateChange}
										renderInput={(
											params: TextFieldProps
										) => <TextField {...params} required />}
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
										disabled={isDisabled}
										value={
											vaccinationRecord.booster_date
												?.length
												? vaccinationRecord.booster_date.slice(
														0,
														10
												  )
												: null
										}
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
								value={vaccinationRecord.notes}
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
								value={vaccinationRecord.clinic}
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
								value={vaccinationRecord.vet}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								component={Link}
								to={`/pets/${petID}/vaccines`}
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
