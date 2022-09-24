import {
	Avatar,
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	styled,	
	Tooltip
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectPets } from './petsSlice';
import PetsIcon from '@mui/icons-material/Pets';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link, useNavigate } from 'react-router-dom';
import { type } from 'os';

export const ListPets = () => {
	const pets = useAppSelector(selectPets);
	const navigate = useNavigate();	

	const Demo = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}));

	const handleClick = (pet: any) => {		
		navigate(`/pets/edit/${pet.id}`);
	  };

	const selectPetType = (type: string) => {
		switch (type) {
			case 'DOG':
				return 'Cão';
			case 'CAT':
				return 'Gato';
			case 'BIRD':
				return 'Pássaro';
			case 'FISH':
				return 'Peixe';
			case 'RABBIT':
				return 'Coelho';
			case 'REPTILE':
				return 'Réptil';
			case 'OTHER':
				return '';
			default:
				return '';
		}
	};

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/pets/create"
					style={{ marginBottom: '1rem' }}
				>
					New Pet
				</Button>
			</Box>
			<Demo>
				<List>
					{pets.map((pet) => (
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
										<OpenInNewIcon 
										/>
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
								secondary={`${
									selectPetType(pet.type)
								} ${pet.breed ? pet.breed : ''}`}
							/>
						</ListItem>
					))}
				</List>
			</Demo>
		</Box>
	);
};
