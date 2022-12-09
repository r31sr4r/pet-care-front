import {
	Box, Paper,
	SelectChangeEvent, Typography
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { VaccinationRecordForm } from './components/VaccinationRecordForm';

import { useSnackbar } from 'notistack';
import { VaccinationRecord } from '../../types/VaccinationRecord';
import { useCreateVaccinationRecordMutation } from './vaccinationRecordsSlice';

export const CreateVaccinationRecord = () => {
	const [createVaccinationRecord, status ] = useCreateVaccinationRecordMutation();
	const [isdisabled, setIsDisabled] = useState(false);
	const [vaccinationRecordState, setVaccinationRecordState] = useState<VaccinationRecord>({
		id: '',
		pet_id: '',
		vaccine_id: '',
		vaccine_schedule_id: '',
		brand_id: '',
		was_applied: true,
		application_date: null,
		booster_date: null,
		notes: '',
		clinic: '',
		vet: '',
		update_reason: '',
		created_at: null,
	});
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const payload = {
			pet_id: vaccinationRecordState.pet_id,
			vaccine_id: vaccinationRecordState.vaccine_id,
			vaccine_schedule_id: vaccinationRecordState.vaccine_schedule_id,
			brand_id: vaccinationRecordState.brand_id,
			was_applied: vaccinationRecordState.was_applied,
			application_date: vaccinationRecordState.application_date,
			booster_date: vaccinationRecordState.booster_date,
			notes: vaccinationRecordState.notes,
			clinic: vaccinationRecordState.clinic,
			vet: vaccinationRecordState.vet,
			update_reason: vaccinationRecordState.update_reason,			
		};

		const result = await createVaccinationRecord(payload);
		setVaccinationRecordState({ ...vaccinationRecordState, id: result.data?.data.id });
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setVaccinationRecordState({ ...vaccinationRecordState, [name]: value });
	};

	const handleVaccineChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setVaccinationRecordState({ ...vaccinationRecordState, [name]: value });
	};

	const handleBrandChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setVaccinationRecordState({ ...vaccinationRecordState, [name]: value });
	};

	const handleVaccineScheduleChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setVaccinationRecordState({ ...vaccinationRecordState, [name]: value });
	};

	const handleAppliedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setVaccinationRecordState({ ...vaccinationRecordState, [name]: checked });
	};

	const handleAppliedDateChange = (newValue: Dayjs | null) => {
		console.log(newValue);
		setVaccinationRecordState({
			...vaccinationRecordState,
			application_date: newValue?.format('YYYY-MM-DD'),
		});
	};

	const handleBoosterDateChange = (newValue: Dayjs | null) => {		
		setVaccinationRecordState({
			...vaccinationRecordState,
			booster_date: newValue?.format('YYYY-MM-DD'),
		});
	};

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Vacina cadastrada com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao cadastrar a vacina', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Registrar Vacina</Typography>
					</Box>
				</Box>
				<VaccinationRecordForm		
					vaccinationRecord={vaccinationRecordState}			
					isDisabled={false}
					isLoading={false}
					vaccineId={vaccinationRecordState.vaccine_id}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleBrandChange={handleBrandChange}
					handleVaccineChange={handleVaccineChange}
					handleVaccineScheduleChange={handleVaccineScheduleChange}
					handleAppliedChange={handleAppliedChange}
					handleAppliedDateChange={handleAppliedDateChange}
					handleBoosterDateChange={handleBoosterDateChange}
				/>
			</Paper>
		</Box>
	);
};
