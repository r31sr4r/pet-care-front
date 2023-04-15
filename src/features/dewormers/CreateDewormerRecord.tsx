import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { DewormerRecord } from '../../types/DewormerRecord';
import { useGetPetQuery } from '../pets/petsSlice';
import { useCreateDewormerRecordMutation } from './dewormerRecordsSlice';
import { Constants } from '../../utils/constants/Constants';
import { DewormerRecordForm } from './components/DewormerRecordForm';

export const CreateDewormerRecord = () => {
	const [scheduleWithBooster, setScheduleWithBooster] = useState<string>('');
	const id = useParams<{ id: string }>().id || '';
	const { data: pet } = useGetPetQuery({ id });	

	const [createDewormerRecord, status] =
		useCreateDewormerRecordMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [boosterDays, setBoosterDays] = useState<number>(0);
	const [dewormerRecordState, setDewormerRecordState] =
		useState<DewormerRecord>({
			id: '',
			pet_id: '',
			brand_id: '',
			dewormer_name: '',
			booster_interval: 0,
			booster_unit: '',
			was_applied: true,
			application_date: null,
			booster_date: null,
			notes: '',
			clinic: '',
			vet: '',
			update_reason: '',
			created_at: null,
			pet: null,
			brand: null,
		});
	const { enqueueSnackbar } = useSnackbar();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const payload = {
			pet_id: pet?.data?.id,
			brand_id: dewormerRecordState.brand_id || Constants.DEFAULT_BRAND_ID,
			was_applied: dewormerRecordState.was_applied,
			application_date: dewormerRecordState.application_date,
			booster_date: dewormerRecordState.booster_date,
			notes: dewormerRecordState.notes,
			clinic: dewormerRecordState.clinic,
			vet: dewormerRecordState.vet,
			update_reason: dewormerRecordState.update_reason,
		};

		const result = await createDewormerRecord(payload);
		setDewormerRecordState({
			...dewormerRecordState,
			id: result.data?.data.id,
		});
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
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
	};

	const handleVaccineChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
	};

	const handleBrandChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
	};

	const handleVaccineScheduleChange = async (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setScheduleWithBooster(value);
		const vaccine_schedule_id = value.split('_')[0];
		let booster_interval: number = value.split('_')[1] as any;
		const booster_unit = value.split('_')[2];

		setBoosterInterval(booster_unit, booster_interval);

		setDewormerRecordState({
			...dewormerRecordState,
			[name]: vaccine_schedule_id,
		});
	};

	const handleAppliedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setDewormerRecordState({
			...dewormerRecordState,
			[name]: checked,
		});
	};

	const handleAppliedDateChange = (newValue: Dayjs | null) => {
		setDewormerRecordState({
			...dewormerRecordState,
			application_date: newValue?.format('YYYY-MM-DD'),
			booster_date: newValue
				?.add(boosterDays, 'day')
				.format('YYYY-MM-DD'),
		});
	};

	const handleBoosterDateChange = (newValue: Dayjs | null | undefined) => {
		setDewormerRecordState({
			...dewormerRecordState,
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
					<Box>
						<Typography variant="h4">Registrar Vacina</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<Box>
						<Typography variant="h6">{pet?.data?.name}</Typography>
					</Box>
				</Box>
				<DewormerRecordForm
					dewormerRecord={dewormerRecordState}
					isDisabled={status.isLoading || isDisabled}
					isLoading={status.isLoading}
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
