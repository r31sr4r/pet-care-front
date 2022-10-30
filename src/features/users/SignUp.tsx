import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { SignUpForm } from './components/SignUpForm';
import { useCreateUserMutation } from './usersSlice';
import { useSnackbar } from 'notistack';
import { Copyright } from '../../utils/components/copyright/Copyright';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../types/User';

export default function SignUp() {
	const location = useLocation();
	let navigate = useNavigate();	
	const userType = location.state?.group === 'customer' ? 'Dono de Pets' : 'Veterinário';

	const { enqueueSnackbar } = useSnackbar();
	const [createUser, status] = useCreateUserMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [userState, setUserState] = useState<User>({
		id: '',
		name: '',
		email: '',
		password: '',
		confirm_password: '',
		old_password: '',
		group: '',
		role: '',
		is_active: true,
		created_at: null,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserState({ ...userState, [name]: value });
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		let group = 'customer';

		if (location.state) {
			group = location.state.group;
		}

		const payload = {
			name: userState.name,
			email: userState.email,
			password: userState.password,
			group: group,
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
			navigate('/signin');
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
				userType={userType}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	);
}
