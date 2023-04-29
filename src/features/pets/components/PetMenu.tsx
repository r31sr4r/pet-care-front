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
import { PestControl } from '@mui/icons-material';

type Props = {
	petId: string;
	handleVaccine: (petId: any) => void;
	handleDewormerRecords: (petId: any) => void;
	handleFleasAndTicksControll: (petId: any) => void;
};

export const PetMenu = ({
	petId,
	handleVaccine,
	handleDewormerRecords,
	handleFleasAndTicksControll,
}: Props) => {
	return (
		<Box mb={2}>
			<Grid container spacing={2} direction="row">
				<Grid item xs={4} sm={4} md={4} lg={4}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Tooltip title="Vacinas" placement="left-start">
							<IconButton
								edge="end"
								aria-label="vacinas"
								onClick={() => handleVaccine(petId)}
							>
								<VaccinesIcon fontSize="large" />
							</IconButton>
						</Tooltip>
						<Typography variant="caption" gutterBottom>
							Vacinas
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={4} sm={4} md={4} lg={4}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Tooltip title="Vermifugação" placement="left-start">
							<IconButton
								edge="end"
								aria-label="Vermifugação"
								onClick={() => handleDewormerRecords(petId)}
							>
								<ListAltIcon fontSize="large" />
							</IconButton>
						</Tooltip>
						<Typography variant="caption" gutterBottom>
							Vermifugação
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={4} sm={4} md={4} lg={4}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Tooltip
							title="Controle de Pulgas e Carrapatos"
							placement="left-start"
						>
							<IconButton
								edge="end"
								aria-label="Controle de Pulgas e Carrapatos"
								onClick={() =>
									handleFleasAndTicksControll(petId)
								}
							>
								<PestControl fontSize="large" />
							</IconButton>
						</Tooltip>
						<Typography
							variant="caption"
							gutterBottom
							textAlign="center"
							sx={{ width: '100%' }}
						>
							Pulgas e Carrapatos
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Divider />
		</Box>
	);
};
