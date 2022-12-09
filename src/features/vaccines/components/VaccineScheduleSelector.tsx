import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetVaccineSchedulesByVaccineQuery } from '../vaccineSchedulesSlice';

type Props = {
	vaccineScheduleId: string;
	vaccineId: string;
	handleVaccineScheduleChange: (e: SelectChangeEvent) => void;
};

export function VaccineScheduleSelector({
	vaccineScheduleId,
	vaccineId,
	handleVaccineScheduleChange,
}: Props) {
	const { data, isFetching, error } = useGetVaccineSchedulesByVaccineQuery({
		vaccine_id: vaccineId === '' ? '0' : vaccineId,
	});
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Dose</InputLabel>
			<Select
				name="vaccine_schedule_id"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={ isFetching ? '' : vaccineScheduleId }
				label="Dose"
				required
				onChange={handleVaccineScheduleChange}
				key={vaccineScheduleId}
			>
				{data?.data
					? data.data.map((vaccine: any) => (
							<MenuItem value={vaccine.id} key={vaccine.id} >
								{vaccine.description}
							</MenuItem>
					  ))
					: []}
			</Select>
		</FormControl>
	);
}
