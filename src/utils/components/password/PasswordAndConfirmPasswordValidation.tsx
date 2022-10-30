import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { User } from '../../../types/User';

type Props = {
	user: User;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordAndConfirmPasswordValidation({
	user,
	handleChange,
}: Props) {
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [passwordErrorMessages, setPasswordErrorMessages] = useState('');

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
		<>
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
					helperText={passwordError ? passwordErrorMessages : ''}
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
						confirmPasswordError ? 'As senhas não conferem' : ''
					}
				/>
			</Grid>
		</>
	);
}
