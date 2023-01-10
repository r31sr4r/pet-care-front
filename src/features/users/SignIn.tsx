import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from '../../utils/components/copyright/Copyright';
import { useSignInUserMutation } from './usersSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	let navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [signInUser, status] = useSignInUserMutation();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const payload = {
			email: data.get('email'),
			password: data.get('password'),
		};

		await signInUser(payload);

	};

	useEffect(() => {
		if (status.isSuccess) {
			navigate('/');
		} else if (status?.error?.status === 401) {
			enqueueSnackbar('Usuário ou senha inválidos', {
				variant: 'error',
			});
			removeToken();
		} else if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao realizar seu login', {
				variant: 'error',
			});
			removeToken();
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	function removeToken() {
		localStorage.removeItem('token');
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5" color={'text.primary'}>
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					//noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel sx={{color:'text.primary'}}
						control={<Checkbox value="remember" color="primary" />}												
						label="Lembrar meus dados"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Entrar
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Esqueci minha senha
							</Link>
						</Grid>
						<Grid item>
							<Link href="/type" variant="body2">
								{'Não possui uma conta? Criar'}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
