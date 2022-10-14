import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { EmailInputField } from '../../../utils/components/email/EmailInputField';
import { User } from '../usersSlice';

type Props = {
	user: User;
	isDisabled?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SignUpForm({
	user,
	isDisabled,
	handleSubmit,
	handleChange,
}: Props) {
	const [nameError, setNameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [passwordErrorMessages, setPasswordErrorMessages] = useState('');

	const handleNameValidation = () => {
		if (user.name.length < 3 && user.name) {
			setNameError(true);
		} else {
			setNameError(false);
		}
	};

	const handleValidation = () => {
		const upperCaseRegex = /(?=.*?[A-Z])/;
		const lowerCaseRegex = /(?=.*?[a-z])/;
		const numberRegex = /(?=.*?\d)/;
		const specialCharacterRegex = /(?=.*?[#?!@$%^&*-])/;
		const minLengthRegex = /(?=.{6,})/;

		const upperCaseValidation = upperCaseRegex.test(user.password);
		const lowerCaseValidation = lowerCaseRegex.test(user.password);
		const numberValidation = numberRegex.test(user.password);
		const specialCharacterValidation = specialCharacterRegex.test(
			user.password
		);
		const minLengthValidation = minLengthRegex.test(user.password);

		const passwordValidation: boolean =
			upperCaseValidation &&
			lowerCaseValidation &&
			(numberValidation || specialCharacterValidation) &&
			minLengthValidation;

		const numberAndSpecialCharacterValidation: boolean =
			numberValidation || specialCharacterValidation;

		const passwordErrorMessages = `Sua senha precisar ter pelo menos:
            ${upperCaseValidation ? '✔️' : '❌'} uma letra maíuscula
            ${lowerCaseValidation ? '✔️' : '❌'} uma letra minúscula
            ${
				numberAndSpecialCharacterValidation ? '✔️' : '❌'
			} um número ou caracter especial            
            ${minLengthValidation ? '✔️' : '❌'} no mínimo 6 caracteres`;

		if (!passwordValidation) {
			setPasswordError(true);
			setPasswordErrorMessages(passwordErrorMessages);
		} else {
			setPasswordError(false);
			setPasswordErrorMessages('');
		}

		if (user.password !== user.confirm_password) {
			setPasswordError(true);
			setConfirmPasswordError(true);
		} else {
			setPasswordError(false);
			setConfirmPasswordError(false);
		}
	};

	useEffect(() => {
		handleValidation();
	}, [user.password, user.confirm_password]);

	return (
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
				Criar Conta
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
							autoComplete="given-name"
							name="name"
							required
							fullWidth
							id="name"
							label="Nome"
							autoFocus
							value={user.name}
							onChange={handleChange}
							onBlur={handleNameValidation}
							error={nameError}
							helperText={
								nameError
									? 'Nome precisa ter pelo menos 3 caracteres.'
									: ''
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<EmailInputField
							emailValue={user.email}
							handleEmailChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="password"
							label="Senha"
							type="password"
							id="password"
							autoComplete="new-password"
							value={user.password}
							onChange={handleChange}
							error={passwordError}
							helperText={
								passwordError ? passwordErrorMessages : ''
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="confirm_password"
							label="Confirmar senha"
							type="password"
							id="confirm_password"
							autoComplete="new-password"
							value={user.confirm_password}
							onChange={handleChange}
							error={confirmPasswordError}
							helperText={
								confirmPasswordError
									? 'As senhas não conferem'
									: ''
							}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					disabled={isDisabled}
					sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="#" variant="body2">
							Já possui um conta? Faça o login
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
