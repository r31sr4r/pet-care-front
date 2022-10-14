import { useState } from 'react';
import { PasswordInputField } from './PasswordInputField';
import { ConfirmPasswordInputField } from './ConfirmPasswordInputField';

export function PasswordAndConfirmPasswordValidation() {
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [passwordInput, setPasswordInput] = useState({
		password: '',
		confirmPassword: '',
	});

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswordInput({ ...passwordInput, [name]: value });
	};

	const handleValidation = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		if (name === 'password') {
			const upperCaseRegex = /(?=.*?[A-Z])/;
			const lowerCaseRegex = /(?=.*?[a-z])/;
			const numberRegex = /(?=.*?[0-9])/;
			const specialCharacterRegex = /(?=.*?[#?!@$%^&*-])/;
			const minLengthRegex = /(?=.{8,})/;

			const passwordValidation: boolean =
				upperCaseRegex.test(value) &&
				lowerCaseRegex.test(value) &&
				numberRegex.test(value) &&
				specialCharacterRegex.test(value) &&
				minLengthRegex.test(value);

			if (value !== passwordInput.confirmPassword) {
				setPasswordError(true);
			} else {
				setPasswordError(false);
			}
		}
		if (name === 'confirmPassword') {
			if (value !== passwordInput.password) {
				setConfirmPasswordError(true);
			} else {
				setConfirmPasswordError(false);
			}
		}
	};

	return (
		<>
			<PasswordInputField
				handleValidation={handleValidation}
				handlePasswordChange={handlePasswordChange}
				passwordValue={passwordInput.password}
				passwordError={passwordError}
			/>
			<ConfirmPasswordInputField
				handleValidation={handleValidation}
				handlePasswordChange={handlePasswordChange}
				passwordValue={passwordInput.confirmPassword}
				passwordError={confirmPasswordError}
			/>
		</>
	);

	// useEffect(() => {
	// 	if (password !== confirmPassword) {
	// 		setPasswordError(true);
	// 		setConfirmPasswordError(true);
	// 	} else {
	// 		setPasswordError(false);
	// 		setConfirmPasswordError(false);
	// 	}
	// }, [password, confirmPassword]);

	// return {
	// 	passwordError,
	// 	confirmPasswordError,
	// };
}
