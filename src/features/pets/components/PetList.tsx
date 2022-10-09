import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PetsIcon from '@mui/icons-material/Pets';
import {
    Avatar, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    Tooltip
} from '@mui/material';
import { Results } from '../../../types/Pet';
import { SelectPetType } from '../../../utils/SelectPetType';

type Props = {
	results: Results | undefined;
	handleClick: (pet: any) => void;
};

export const Petlist = ({ results, handleClick }: Props) => {
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
							primary={pet.name}
							secondary={`${SelectPetType(pet.type)} ${
								pet.breed ? pet.breed : ''
							}`}
						/>
					</ListItem>
				))}
			</List>
		</ListStyle>
	);
};
