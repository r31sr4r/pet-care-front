import { FormControl, TextField } from "@mui/material";
import { KeyboardEventHandler } from "react";

type Props = {
    handleValidation: KeyboardEventHandler<HTMLDivElement>;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordValue: string;
    passwordError: boolean;
}

export function PasswordInputField({
    handleValidation,
    handlePasswordChange,
    passwordValue,
    passwordError,
}: Props) {
    return (
        <FormControl fullWidth>
            <TextField
                required
                name="password"
                label="Password"
                value={passwordValue}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}                
                error={passwordError}
                helperText={passwordError ? 'Password does not match' : ''}
                type="password"
            />
        </FormControl>
    );
}