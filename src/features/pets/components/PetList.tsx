import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PestControlIcon from '@mui/icons-material/PestControl';
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	styled,
	Tooltip,
	Divider,
	Typography,
} from '@mui/material';
import { Results } from '../../../types/Pet';
import { SelectPetType } from '../../../utils/SelectPetType';

type Props = {
	results: Results | undefined;
	handleClick: (pet: any) => void;
	handleFleasAndTicksControll: (pet: any) => void;
	handleDewormerRecords: (pet: any) => void;
	handleVaccine: (pet: any) => void;
};

export const Petlist = ({
	results,
	handleClick,
	handleFleasAndTicksControll,
	handleDewormerRecords,
	handleVaccine,
}: Props) => {
	const ListStyle = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}));

	return (
		<ListStyle>
			<List>
				{results?.data.map((pet) => (
					<ListItem
						key={pet.id}
						divider
						secondaryAction={
							<Tooltip title="Detalhar" placement="left-start">
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => handleClick(pet)}
								>
									<OpenInNewIcon />
								</IconButton>
							</Tooltip>
						}
					>
						<ListItemAvatar>
							<Avatar>
								<PetsIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography color={'text.primary'}>
									{pet.name}
								</Typography>
							}
							secondary={`${SelectPetType(pet.type)} ${
								pet.breed ? pet.breed : ''
							}`}
						/>
						<Tooltip
							title="Pulgas e Carrapatos"
							placement="left-start"
							sx={{ mr: 0.3 }}
						>
							<IconButton
								edge="end"
								aria-label="Pulgas e Carrapatos"
								onClick={() => handleFleasAndTicksControll(pet)}
							>
								<PestControlIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							title="Vermifugação"
							placement="left-start"
							sx={{ mr: 0.3 }}
						>
							<IconButton
								edge="end"
								aria-label="vermifugação"
								onClick={() => handleDewormerRecords(pet)}
							>
								<ListAltIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							title="Vacinas"
							placement="left-start"
							sx={{ mr: 0.3 }}
						>
							<IconButton
								edge="end"
								aria-label="vacinas"
								onClick={() => handleVaccine(pet)}
							>
								<VaccinesIcon />
							</IconButton>
						</Tooltip>
						<Divider />
					</ListItem>
				))}
			</List>
		</ListStyle>
	);
};
