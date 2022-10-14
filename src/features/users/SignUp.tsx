import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SignUpForm } from './components/SignUpForm';
import { useCreateUserMutation, User } from './usersSlice';
import { useSnackbar } from 'notistack';

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://www.onewayinnovation.com.br/"
				target={'_blank'}
			>
				One Way Innovation
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function SignUp() {
	const { enqueueSnackbar } = useSnackbar();
	const [createUser, status] = useCreateUserMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [userState, setUserState] = useState<User>({
		id: '',
		name: '',
		email: '',
		password: '',
		confirm_password: '',
		group: '',
		role: '',
		is_active: true,
		created_at: null,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(name, value);
		setUserState({ ...userState, [name]: value });
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
			name: data.get('name'),
		});

		const payload = {
			name: userState.name,
			email: userState.email,
			password: userState.password,
			group: 'customer',
			role: 'user',
		};

		await createUser(payload);
	}

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Cadastro realizado com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar('Ocorreu um erro ao realizar seu cadastro', {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<SignUpForm
				user={userState}
				isDisabled={isDisabled}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	);
}
