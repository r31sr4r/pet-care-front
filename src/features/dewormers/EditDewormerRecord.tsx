import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { DewormerRecordForm } from './components/DewormerRecordForm';

import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { DewormerRecord } from '../../types/DewormerRecord';
import { useGetPetQuery } from '../pets/petsSlice';
import {
	useGetDewormerRecordsByGuidIdQuery,
	useUpdateDewormerRecordMutation,
} from './dewormerRecordsSlice';
import { BoosterUnitEnum } from '../../utils/enum/BoosterUnitEnum';

export const EditDewormerRecord = () => {
	const pet_id = useParams<{ pet_id: string }>().pet_id || '';
	const id = useParams<{ id: string }>().id || '';
	const { data: pet, isFetching } = useGetPetQuery({ id: pet_id });
	const { data: dewormerRecord, isFetching: isFetchingDewormerRecord } =
		useGetDewormerRecordsByGuidIdQuery({ id: id });

	const [UpdateDewormerRecord, status] =
		useUpdateDewormerRecordMutation();

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
		await UpdateDewormerRecord(dewormerRecordState);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: value });
	};

	const handleBoosterIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDewormerRecordState({ ...dewormerRecordState, [name]: parseInt(value) });
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
		if (dewormerRecord) {
			setDewormerRecordState(dewormerRecord.data);
		}
	}, [dewormerRecord]);

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Vermifugação atualizada com sucesso', {
				variant: 'success',
			});
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao atualizar a vermifugação', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box>
						<Typography variant="h4">Editar Vermifugação</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<Box>
						<Typography variant="h6">{pet?.data?.name}</Typography>
					</Box>
				</Box>
				<DewormerRecordForm
					dewormerRecord={dewormerRecordState}
					isDisabled={status.isLoading}
					isLoading={
						status.isLoading ||
						isFetching ||
						isFetchingDewormerRecord
					}
					petID={pet?.data?.id}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleBrandChange={handleBrandChange}
					handleAppliedChange={handleAppliedChange}
					handleAppliedDateChange={handleAppliedDateChange}
					handleBoosterDateChange={handleBoosterDateChange}
					handleBoosterIntervalChange={handleBoosterIntervalChange}
				/>
			</Paper>
		</Box>
	);
};
