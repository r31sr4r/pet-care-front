import {
	Box,
	Divider,
	IconButton,
	Tooltip,
	Typography,
	Grid,
} from '@mui/material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ListAltIcon from '@mui/icons-material/ListAlt';

type Props = {
	petId: string;
	handleVaccine: (petId: any) => void;
	handleDewormerRecords: (petId: any) => void;
};

export const PetMenu = ({
	petId,
	handleVaccine,
	handleDewormerRecords,
}: Props) => {
	return (
		<Box mb={2}>
			<Grid container spacing={2} direction="row">
				<Grid item>
					<Tooltip
						title="Vacinas"
						placement="left-start"
						sx={{ mr: 0.3, ml: 2 }}
					>
						<IconButton
							edge="end"
							aria-label="vacinas"
							onClick={() => handleVaccine(petId)}
						>
							<VaccinesIcon fontSize="large" />
						</IconButton>
					</Tooltip>
					<Grid item>
						<Typography
							variant="caption"
							gutterBottom
							sx={{ ml: 2.3 }}
						>
							Vacinas
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Tooltip
							title="Vermifugação"
							placement="left-start"
							sx={{ mr: 0.3, ml: 2 }}
						>
							<IconButton
								edge="end"
								aria-label="Vermifugação"
								onClick={() => handleDewormerRecords(petId)}
							>
								<ListAltIcon fontSize="large" />
							</IconButton>
						</Tooltip>
						<Grid item>
							<Typography
								variant="caption"
								gutterBottom
								sx={{ ml: 2.3 }}
							>
								Vermifugação
							</Typography>
						</Grid>
					</Box>
				</Grid>
			</Grid>
			<Divider />
		</Box>
	);
};
