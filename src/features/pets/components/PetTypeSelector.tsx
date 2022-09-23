import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    petType: string;
    handlePetTypeChange: (e: SelectChangeEvent) => void;    
};

export function PetTypeSelector(
    { petType, handlePetTypeChange }: Props
) {

	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Tipo</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={petType}
				label="Tipo"
				onChange={handlePetTypeChange}
			>
				<MenuItem value={'DOG'}>Cachorro</MenuItem>
				<MenuItem value={'CAT'}>Gato</MenuItem>
				<MenuItem value={'BIRD'}>Pássaro</MenuItem>
				<MenuItem value={'FISH'}>Peixe</MenuItem>
				<MenuItem value={'RABBIT'}>Coelho</MenuItem>
				<MenuItem value={'REPTILE'}>Réptil</MenuItem>
				<MenuItem value={'OTHER'}>Outro</MenuItem>
			</Select>
		</FormControl>
	);
}
