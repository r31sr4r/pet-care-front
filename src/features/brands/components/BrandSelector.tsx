import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetBrandsByTypeQuery } from '../brandsSlice';

type Props = {
	brandId: string | null | undefined;
	brandType: string;
	handleBrandChange: (e: SelectChangeEvent) => void;
};

export function BrandSelector({
	brandId,
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
				name="brand_id"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={ brandId || '' }
				label="Marca"
				onChange={handleBrandChange}
				key={brandId}
			>
				{data?.data
					? data.data.map((brand: any) => (
							<MenuItem value={brand.id} key={brand.id}>
								{brand.name}
							</MenuItem>
					  ))
					: []}
			</Select>
		</FormControl>
	);
}
