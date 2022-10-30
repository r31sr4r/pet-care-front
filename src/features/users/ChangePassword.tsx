import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { PasswordAndConfirmPasswordValidation } from '../../utils/components/password/PasswordAndConfirmPasswordValidation';
import { UserData } from '../../utils/security/UserData';
import { useUpdatePasswordMutation } from './usersSlice';

export function ChangePassword() {
	const { id, name, email } = UserData()?.user;
	const { enqueueSnackbar } = useSnackbar();
	const [updatePassword, status] = useUpdatePasswordMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [userState, setUserState] = useState<User>({
		id: id,
		name: name,
		email: email,
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

		const payload = {
			id: userState.id,
			name: userState.name,
			email: userState.email,
			old_password: userState.old_password,
			password: userState.password,
		};

		await updatePassword(payload);
	}

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Senha atualizada com sucesso', {
				variant: 'success',
			});
			setIsDisabled(true);
		}
		if (status.error) {
			if (status.error.data.message === 'Current password is not valid') {
				enqueueSnackbar('Senha atual incorreta', {
					variant: 'error',
				});
			} else {
				enqueueSnackbar(
					'Ocorreu um erro ao realizar sua atualização de senha',
					{
						variant: 'error',
					}
				);
			}
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

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
				<Typography component="h1" variant="h5">
					Alterar Senha
				</Typography>
				<Box
					component="form"
					// noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="old_password"
								required
								fullWidth
								id="old_password"
								label="Senha Atual"
								type="password"
								autoComplete="current-password"
								onChange={handleChange}
								value={userState.old_password}
							/>
						</Grid>

						<PasswordAndConfirmPasswordValidation
							user={userState}
							handleChange={handleChange}
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isDisabled}
						sx={{ mt: 3, mb: 2 }}
					>
						Alterar Senha
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
