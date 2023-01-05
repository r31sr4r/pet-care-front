import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { VaccinationRecordForm } from './components/VaccinationRecordForm';

import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { VaccinationRecord } from '../../types/VaccinationRecord';
import { useGetPetQuery } from '../pets/petsSlice';
import {
	useGetVaccinationRecordQuery,
	useUpdateVaccinationRecordMutation,
} from './vaccinationRecordsSlice';
import { useGetVaccineScheduleByIdQuery } from './vaccineSchedulesSlice';

export const EditVaccinationRecord = () => {
	const [scheduleWithBooster, setScheduleWithBooster] = useState<string>('');
	const pet_id = useParams<{ pet_id: string }>().pet_id || '';
	const id = useParams<{ id: string }>().id || '';
	const { data: pet, isFetching } = useGetPetQuery({ id: pet_id });
	const { data: vaccinationRecord, isFetching: isFetchingVaccinationRecord } =
		useGetVaccinationRecordQuery({ id });

	const [vaccineScheduleId, setVaccineScheduleId] = useState<string>('');
	const { data: vaccineSchedule } = useGetVaccineScheduleByIdQuery({
		id: vaccineScheduleId,
	});

	const [UpdateVaccinationRecord, status] =
		useUpdateVaccinationRecordMutation();

	const [boosterDays, setBoosterDays] = useState<number>(0);
	const [vaccinationRecordState, setVaccinationRecordState] =
		useState<VaccinationRecord>({
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
			pet: null,
			vaccine: null,
			vaccine_schedule: null,
			brand: null,
		});
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await UpdateVaccinationRecord(vaccinationRecordState);
	}

	function setBoosterInterval(
		booster_unit: string,
		booster_interval: number
	) {
		switch (booster_unit) {
			case 'DAY':
				break;
			case 'WEEK':
				booster_interval = booster_interval * 7;
				break;
			case 'MONTH':
				booster_interval = booster_interval * 30;
				break;
			case 'YEAR':
				booster_interval = booster_interval * 365;
				break;
			default:
				break;
		}

		setBoosterDays(booster_interval);
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

	const handleVaccineScheduleChange = async (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setScheduleWithBooster(value);
		const vaccine_schedule_id = value.split('_')[0];
		let booster_interval: number = value.split('_')[1] as any;
		const booster_unit = value.split('_')[2];

		setBoosterInterval(booster_unit, booster_interval);

		setVaccinationRecordState({
			...vaccinationRecordState,
			[name]: vaccine_schedule_id,
		});
	};

	const handleAppliedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setVaccinationRecordState({
			...vaccinationRecordState,
			[name]: checked,
		});
	};

	const handleAppliedDateChange = (newValue: Dayjs | null) => {
		setVaccinationRecordState({
			...vaccinationRecordState,
			application_date: newValue?.format('YYYY-MM-DD'),
			booster_date: newValue
				?.add(boosterDays, 'day')
				.format('YYYY-MM-DD'),
		});
	};

	const handleBoosterDateChange = (newValue: Dayjs | null | undefined) => {
		setVaccinationRecordState({
			...vaccinationRecordState,
			booster_date: newValue?.format('YYYY-MM-DD'),
		});
	};

	useEffect(() => {
		if (vaccinationRecord) {
			setVaccinationRecordState(vaccinationRecord.data);
			setScheduleWithBooster(
				`${vaccinationRecord.data.vaccine_schedule_id}_${vaccinationRecord.data.vaccine_schedule?.booster_interval}_${vaccinationRecord.data.vaccine_schedule?.booster_unit}`
			);
			setVaccineScheduleId(vaccinationRecord.data.vaccine_schedule_id);
		}
	}, [vaccinationRecord]);

	useEffect(() => {
		if (vaccineSchedule) {
			setScheduleWithBooster(
				`${vaccineScheduleId}_${vaccineSchedule.data.booster_interval}_${vaccineSchedule.data.booster_unit}`
			);
		}
	}, [vaccineSchedule]);

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Vacina atualizada com sucesso', {
				variant: 'success',
			});
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao atualizar a vacina', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box>
						<Typography variant="h4">Editar Vacina</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<Box>
						<Typography variant="h6">{pet?.data?.name}</Typography>
					</Box>
				</Box>
				<VaccinationRecordForm
					vaccinationRecord={vaccinationRecordState}
					isDisabled={status.isLoading}
					isLoading={
						status.isLoading ||
						isFetching ||
						isFetchingVaccinationRecord
					}
					scheduleIdWithBooster={scheduleWithBooster}
					petID={pet?.data?.id}
					petType={pet?.data?.type}
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
