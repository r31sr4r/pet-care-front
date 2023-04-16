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
import { BoosterUnitEnum } from '../../utils/enum/BoosterUnitEnum';

export const CreateDewormerRecord = () => {
	const id = useParams<{ id: string }>().id || '';
	const { data: pet } = useGetPetQuery({ id });	

	const [createDewormerRecord, status] =
		useCreateDewormerRecordMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [dewormerRecordState, setDewormerRecordState] =
		useState<DewormerRecord>({
			id: '',
			pet_id: '',
			brand_id: '',
			dewormer_name: '',
			booster_interval: 0,
			booster_unit: BoosterUnitEnum.DAY,
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
			dewormer_name: dewormerRecordState.dewormer_name,
			booster_interval: parseInt(dewormerRecordState.booster_interval as any),
			booster_unit: dewormerRecordState.booster_unit,
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
	};

	const handleBrandChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
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
				?.add(dewormerRecordState.booster_interval, 'day')
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
			enqueueSnackbar('Vermifugação cadastrada com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao cadastrar a vermifugação', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box>
						<Typography variant="h4">Registrar Vermifugação</Typography>
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
					petID={pet?.data?.id}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleBrandChange={handleBrandChange}
					handleAppliedChange={handleAppliedChange}
					handleAppliedDateChange={handleAppliedDateChange}
					handleBoosterDateChange={handleBoosterDateChange}
				/>
			</Paper>
		</Box>
	);
};
