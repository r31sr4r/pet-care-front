import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { FleasAndTicksControllForm } from './components/FleasAndTicksControllForm';

import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { FleasAndTicksControll } from '../../types/FleasAndTicksControll';
import { useGetPetQuery } from '../pets/petsSlice';
import {
	useGetFleasAndTicksControllByGuidIdQuery,
	useUpdateFleasAndTicksControllMutation,
} from './fleasAndTicksControllSlice';
import { BoosterUnitEnum } from '../../utils/enum/BoosterUnitEnum';

export const EditFleasAndTicksControll = () => {
	const pet_id = useParams<{ pet_id: string }>().pet_id || '';
	const id = useParams<{ id: string }>().id || '';
	const { data: pet, isFetching } = useGetPetQuery({ id: pet_id });
	const { data: fleasAndTicksControllRecord, isFetching: isFetchingFleasAndTicksControll } =
		useGetFleasAndTicksControllByGuidIdQuery({ id: id });

	const [UpdateFleasAndTicksControll, status] =
		useUpdateFleasAndTicksControllMutation();

	const [fleasAndTicksControllState, setFleasAndTicksControllState] =
		useState<FleasAndTicksControll>({
			id: '',
			pet_id: '',
			brand_id: '',
			medication_name: '',
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
		await UpdateFleasAndTicksControll(fleasAndTicksControllState);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFleasAndTicksControllState({ ...fleasAndTicksControllState, [name]: value });
	};

	const handleBoosterIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFleasAndTicksControllState({ ...fleasAndTicksControllState, [name]: parseInt(value) });
	};

	const handleBrandChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setFleasAndTicksControllState({ ...fleasAndTicksControllState, [name]: value });
	};

	const handleAppliedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFleasAndTicksControllState({
			...fleasAndTicksControllState,
			[name]: checked,
		});
	};

	const handleAppliedDateChange = (newValue: Dayjs | null) => {
		setFleasAndTicksControllState({
			...fleasAndTicksControllState,
			application_date: newValue?.format('YYYY-MM-DD'),
			booster_date: newValue
				?.add(fleasAndTicksControllState.booster_interval, 'day')
				.format('YYYY-MM-DD'),
		});
	};

	const handleBoosterDateChange = (newValue: Dayjs | null | undefined) => {
		setFleasAndTicksControllState({
			...fleasAndTicksControllState,
			booster_date: newValue?.format('YYYY-MM-DD'),
		});
	};

	useEffect(() => {
		if (fleasAndTicksControllRecord) {
			setFleasAndTicksControllState(fleasAndTicksControllRecord.data);
		}
	}, [fleasAndTicksControllRecord]);

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
				<FleasAndTicksControllForm
					fleasAndTicksControll={fleasAndTicksControllState}
					isDisabled={status.isLoading}
					isLoading={
						status.isLoading ||
						isFetching ||
						isFetchingFleasAndTicksControll
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
