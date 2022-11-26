import {
	Box,
	FormControl,
	Grid,
	Paper,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { VaccinationRecordForm } from './components/VaccinationRecordForm';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Vaccine } from '../../types/Vaccine';


export const CreateVaccinationRecord = () => {
	const [vaccineState, setVaccineState] = useState<Vaccine>({
		id: '',
		name: '',
		breed_type: '',
		description: '',
		booster_recommendation: '',
		comments: '',
		is_active: true,
		created_at: null,
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('submit');

	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setVaccineState({ ...vaccineState, [name]: value });
	};

	const handleVaccineChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		console.log(name, value);
		setVaccineState({ ...vaccineState, [name]: value });
		console.log(vaccineState);
	};

	const handleBrandChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
	};

	const handleVaccineScheduleChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
	};

	const handleAppliedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
	};

	const handleAppliedDateChange = (newValue: Dayjs | null) => {
		console.log(newValue);
	};


	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Registrar Vacina</Typography>
					</Box>
				</Box>
				<VaccinationRecordForm					
					isDisabled={false}
					isLoading={false}
					vaccineName={vaccineState.name}
					vaccineId={vaccineState.id}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleBrandChange={handleBrandChange}
					handleVaccineChange={handleVaccineChange}
					handleVaccineScheduleChange={handleVaccineScheduleChange}
					handleAppliedChange={handleAppliedChange}
					handleAppliedDateChange={handleAppliedDateChange}
				/>
			</Paper>
		</Box>
	);
};
