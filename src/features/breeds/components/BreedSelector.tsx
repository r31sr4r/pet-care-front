import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import { useGetBreedsByTypeQuery } from '../breedsSlice';

type Props = {
	breedName: string;
	petType: string;
	handleBreedChange: (e: SelectChangeEvent) => void;
};

export function BreedSelector({
	breedName,
	petType,
	handleBreedChange,
}: Props) {
	const { data, isFetching, error } = useGetBreedsByTypeQuery({ petType: petType });

	console.log('data', data?.data);
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Raça</InputLabel>
			<Select
				name="breed"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={breedName}
				label="Raça"
				onChange={handleBreedChange}
				key={breedName}				
			>
				{data?.data ? data.data.map((breed) => (
					<MenuItem value={breed.name} key={breed.id}>{breed.name}</MenuItem>
				)) : 
				[]
				}
			</Select>
		</FormControl>
	);
}
