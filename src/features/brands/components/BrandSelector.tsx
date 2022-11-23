import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetBrandsByTypeQuery } from '../brandsSlice';

type Props = {
	brandName: string;
	brandType: string;
	handleBrandChange: (e: SelectChangeEvent) => void;
};

export function BrandSelector({
	brandName,
	brandType,
	handleBrandChange,
}: Props) {
	const { data, isFetching, error } = useGetBrandsByTypeQuery({
		brandType: brandType,
	});
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Marca</InputLabel>
			<Select
				name="brand"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={ isFetching ? '' : brandName }
				label="Marca"
				onChange={handleBrandChange}
				key={brandName}
			>
				{data?.data
					? data.data.map((brand: any) => (
							<MenuItem value={brand.name} key={brand.id}>
								{brand.name}
							</MenuItem>
					  ))
					: []}
			</Select>
		</FormControl>
	);
}
