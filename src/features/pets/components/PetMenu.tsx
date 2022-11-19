import {
	Box,
	Divider,
	IconButton,
	Tooltip,
	Typography,
	Grid,
} from '@mui/material';
import VaccinesIcon from '@mui/icons-material/Vaccines';

type Props = {
	petId: string;
	handleClick: (petID: any) => void;
};

export const PetMenu = ({ petId, handleClick }: Props) => {
	return (
		<Box mb={2}>
			<Grid container spacing={2} direction="column">
				<Grid item xs={3}>
					<Tooltip
						title="Vacinas"
						placement="left-start"
						sx={{ mr: 0.3, ml: 2 }}
					>
						<IconButton
							edge="end"
							aria-label="vacinas"
							onClick={() => handleClick(petId)}
						>
							<VaccinesIcon fontSize="large" />
						</IconButton>
					</Tooltip>
					<Grid item xs={3}>
						<Typography
							variant="caption"
							gutterBottom
							sx={{ ml: 2.3 }}
						>
							Vacinas
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Divider />
		</Box>
	);
};
