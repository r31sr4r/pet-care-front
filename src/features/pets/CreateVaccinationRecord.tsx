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


export const CreateVaccinationRecord = () => {

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('submit');

	}
	const handleVaccineChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
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
					handleSubmit={handleSubmit}
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
