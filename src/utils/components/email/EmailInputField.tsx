import { TextField } from "@mui/material";
import React, { useState } from 'react';

type Props = {
	emailValue: string;	
	handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;	
};

export function EmailInputField({
	emailValue,	
	handleEmailChange,	
}: Props) {
	const [emailError, setEmailError] = useState(false);	

	const handleEmailValidation = () => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		const emailValidation = emailRegex.test(emailValue);

		if (!emailValidation && emailValue) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
	};

	return (
		<TextField
			required
			fullWidth
			id="email"
			label="Email"
			name="email"
			autoComplete="email"
			value={emailValue}
			onChange={handleEmailChange}
			onBlur={handleEmailValidation}
			error={emailError}
			helperText={emailError ? 'Email inválido.' : ''}
		/>
	);
}
