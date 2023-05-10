import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { User } from '../../../types/User';
import { EmailInputField } from '../../../utils/components/email/EmailInputField';
import { PasswordAndConfirmPasswordValidation } from '../../../utils/components/password/PasswordAndConfirmPasswordValidation';

type Props = {
	user: User;
	isDisabled?: boolean;
	userType: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SignUpForm({
	user,
	isDisabled,
	userType,
	handleSubmit,
	handleChange,
}: Props) {
	const [nameError, setNameError] = useState(false);

	const handleNameValidation = () => {
		if (user.name.length < 3 && user.name) {
			setNameError(true);
		} else {
			setNameError(false);
		}
	};

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
			<Typography component="h1" variant="h5" color={'text.primary'}>
				Criar Conta
			</Typography>
			<Typography component="h1" variant="h6" color={'text.primary'}>
				{userType}
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

					<PasswordAndConfirmPasswordValidation
						user={user}
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
					Cadastrar
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item xs>
						<Link href="/type" variant="body2">
							Voltar
						</Link>
					</Grid>
					<Grid item>
						<Link href="/signin" variant="body2">
							Já possui um conta? Faça o login
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
