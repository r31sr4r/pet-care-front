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
import { FleasAndTicksControll } from '../../../types/FleasAndTicksControll';
import { BrandSelector } from '../../brands/components/BrandSelector';
import { BrandTypesEnum } from '../../../utils/enum/BrandTypesEnum';

type Props = {
	fleasAndTicksControll: FleasAndTicksControll;
	petID: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAppliedDateChange: (newValue: Dayjs | null) => void;
	handleBoosterDateChange: (newValue: Dayjs | null) => void;
	handleAppliedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBrandChange: (e: SelectChangeEvent) => void;
	handleBoosterIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FleasAndTicksControllForm({
	fleasAndTicksControll,
	petID,
	isDisabled,
	isLoading,
	handleSubmit: onSubmit,
	handleChange,
	handleAppliedDateChange,
	handleBoosterDateChange,
	handleAppliedChange,
	handleBrandChange,
	handleBoosterIntervalChange
}: Props) {
	return (
		<Box p={2}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								required
								name="dewormer_name"
								label="Nome do Medicamento"
								value={fleasAndTicksControll.medication_name}
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								required
								name="booster_interval"
								label="Duração (dias)"
								type="number"		
								InputProps={{ inputProps: { min: "0", max: "360", step: "1" } }}						
								value={fleasAndTicksControll.booster_interval >= 0 ? fleasAndTicksControll.booster_interval : 0}
								disabled={isDisabled}
								onChange={handleBoosterIntervalChange}
							/>
						</FormControl>
					</Grid>					
					<Grid item xs={12} sm={6}>
						<BrandSelector
							brandId={fleasAndTicksControll.brand_id}
							brandType={BrandTypesEnum.DEWORMER}
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
										checked={fleasAndTicksControll.was_applied}
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
											fleasAndTicksControll.application_date
												?.length
												? fleasAndTicksControll.application_date.slice(
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
											fleasAndTicksControll.booster_date
												?.length
												? fleasAndTicksControll.booster_date.slice(
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
								value={fleasAndTicksControll.notes}
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
								value={fleasAndTicksControll.clinic}
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
								value={fleasAndTicksControll.vet}
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
								to={`/pets/${petID}/dewormer-records`}
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
