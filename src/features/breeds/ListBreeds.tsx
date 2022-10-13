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
	Tooltip,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectBreeds, useGetBreedsQuery } from './breedsSlice';
import PetsIcon from '@mui/icons-material/Pets';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link, useNavigate } from 'react-router-dom';
import { BreedSelector } from './components/BreedSelector';
import React from 'react';

export const ListBreeds = () => {
	const { data, isFetching, error } = useGetBreedsQuery();
	const breeds = useAppSelector(selectBreeds);
	const [breedName, setBreedName] = React.useState('');
	const navigate = useNavigate();


	const Demo = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}));

	const handleClick = (breed: any) => {
		navigate(`/breeds/edit/${breed.id}`);
	};

	const handleBreedChange = (e: any) => {
		setBreedName(e.target.value);
	};


	const selectBreedType = (type: string) => {
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
					to="/breeds/create"
					style={{ marginBottom: '1rem' }}
				>
					New Breed
				</Button>
			</Box>
			<Box>
				<BreedSelector breedName={breedName} petType='DOG' handleBreedChange={handleBreedChange} />
			</Box>
			<Demo>
				<List>
					{data?.data.map((breed: any) => (
						<ListItem
							key={breed.id}
							divider
							secondaryAction={
								<Tooltip
									title="Detalhar"
									placement="left-start"
								>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => handleClick(breed)}
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
								primary={breed.name}
								secondary={`${selectBreedType(breed.type)} `}
							/>
						</ListItem>
					))}
				</List>
			</Demo>
		</Box>
	);
};
