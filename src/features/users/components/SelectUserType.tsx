import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Paper } from '@mui/material';
import pet_owner_image from '../../../assets/images/cards/pet_owner.png';
import vet_image from '../../../assets/images/cards/vet.png';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard() {
	let navigate = useNavigate();

	const handleOnClick = (userType: string) => {
        navigate('/signup', { state: { group: userType } });	
	};

	return (
		<Box p={2}>
			<Paper elevation={2}>
				<Typography
					variant="h6"
					component="div"
					sx={{ ml: 1, flexGrow: 1, p: 3, textAlign: 'center' }}
				>
					Como você deseja se cadastrar?
				</Typography>
				<Grid
					container
					p={3}
					spacing={4}
					direction="row"
					justifyContent="space-around"
					alignItems="center"
				>
					<Grid item xs={12} sm={6}>
						<Card sx={{ maxWidth: 345 }}>
							<CardActionArea
								onClick={() => handleOnClick('customer')}
							>
								<CardMedia
									component="img"
									height="140"
									image={pet_owner_image}
									alt="dono de pets"
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
									>
										Dono de Pets
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										Cadastre seus pets e tenha todo o
										controle de vacinas, exames, consultas,
										entre outros, inclusive dados lançados
										por veterinários que também fazem parte
										do Pet Care Club.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ maxWidth: 345 }}>
							<CardActionArea
								onClick={() => handleOnClick('vet')}
							>
								<CardMedia
									component="img"
									height="140"
									image={vet_image}
									alt="veterinário"
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
									>
										Veterinário
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										Tenha acesso a um software completo para
										gerenciar sua clínica. Disponibilizamos
										prontuários digitais, controle de
										vacinas, exames, consultas, entre
										outros.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
