import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetVaccinesByBreedTypeQuery } from '../vaccinesSlice';

type Props = {	
	vaccineId: string;
	breedType: string;
	handleVaccineChange: (e: SelectChangeEvent) => void;
};

export function VaccineSelector({
	vaccineId,
	breedType,
	handleVaccineChange,
}: Props) {
	const { data, isFetching, error } = useGetVaccinesByBreedTypeQuery({
		breed_type: breedType,
	});
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Vacina</InputLabel>
			<Select
				name="vaccine_id"
				required
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={ isFetching ? '' : vaccineId }
				label="Vacina"
				onChange={handleVaccineChange}
				key={vaccineId}
			>
				{data?.data
					? data.data.map((vaccine: any) => (
							<MenuItem value={vaccine.id} key={vaccine.id}>
								{vaccine.name}
							</MenuItem>
					  ))
					: []}
			</Select>
		</FormControl>
	);
}
