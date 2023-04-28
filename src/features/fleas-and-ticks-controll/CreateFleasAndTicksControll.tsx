import { Box, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { FleasAndTicksControll } from '../../types/FleasAndTicksControll';
import { useGetPetQuery } from '../pets/petsSlice';
import { useCreateFleasAndTicksControllMutation } from './fleasAndTicksControllSlice';
import { Constants } from '../../utils/constants/Constants';
import { FleasAndTicksControllForm } from './components/FleasAndTicksControllForm';
import { BoosterUnitEnum } from '../../utils/enum/BoosterUnitEnum';

export const CreateFleasAndTicksControll = () => {
	const id = useParams<{ id: string }>().id || '';
	const { data: pet } = useGetPetQuery({ id });	

	const [createFleasAndTicksControll, status] =
		useCreateFleasAndTicksControllMutation();
	const [isDisabled, setIsDisabled] = useState(false);
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
		const payload = {
			pet_id: pet?.data?.id,
			brand_id: fleasAndTicksControllState.brand_id || Constants.DEFAULT_BRAND_ID,
			dewormer_name: fleasAndTicksControllState.medication_name,
			booster_interval: parseInt(fleasAndTicksControllState.booster_interval as any),
			booster_unit: fleasAndTicksControllState.booster_unit,
			was_applied: fleasAndTicksControllState.was_applied,
			application_date: fleasAndTicksControllState.application_date,
			booster_date: fleasAndTicksControllState.booster_date,
			notes: fleasAndTicksControllState.notes,
			clinic: fleasAndTicksControllState.clinic,
			vet: fleasAndTicksControllState.vet,
			update_reason: fleasAndTicksControllState.update_reason,
		};

		const result = await createFleasAndTicksControll(payload);
		setFleasAndTicksControllState({
			...fleasAndTicksControllState,
			id: result.data?.data.id,
		});
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
		if (status.isSuccess) {
			enqueueSnackbar('Vermifugação cadastrada com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao cadastrar seu registro', {
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
				<FleasAndTicksControllForm
					fleasAndTicksControll={fleasAndTicksControllState}
					isDisabled={status.isLoading || isDisabled}
					isLoading={status.isLoading}
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
