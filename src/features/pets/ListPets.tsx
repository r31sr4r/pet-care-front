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
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectPets } from './petsSlice';
import PetsIcon from '@mui/icons-material/Pets';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link, useNavigate } from 'react-router-dom';

export const ListPets = () => {
	const pets = useAppSelector(selectPets);
	const navigate = useNavigate();	

	const Demo = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}));

	const handleClick = (pet: any) => {		
		navigate(`/pets/edit/${pet.id}`);
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
							secondaryAction={
								<IconButton 
									edge="end" 
									aria-label="delete"
									onClick={() => handleClick(pet)}
								>
									<OpenInNewIcon 
									/>
								</IconButton>
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
									pet.type === 'Dog' ? 'Cão' : 'Gato'
								} ${pet.breed ? pet.breed : ''}`}
							/>
						</ListItem>
					))}
				</List>
			</Demo>
		</Box>
	);
};
