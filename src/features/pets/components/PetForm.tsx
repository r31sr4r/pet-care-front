import React from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
	Switch,
	FormControlLabel,
	FormGroup,    
} from '@mui/material';
import { Pet } from '../petsSlice';
import { Link } from 'react-router-dom';

type Props = {
    pet: Pet;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToogle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PetForm({
    pet,
    isdisabled,
    isLoading,
    handleSubmit: onSubmit,
    handleChange,
    handleToogle,
}: Props) {
	return (
		<Box p={2}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="name"
								label="Name"
								value={pet.name}
								disabled={isdisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="type"
								label="Type"
								value={pet.type}
								disabled={isdisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										name="is_active"
										color="secondary"
										onChange={handleToogle}
										checked={pet.is_active}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								label="Active"
							/>
						</FormGroup>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								component={Link}
								to="/pets"
							>
								Back
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isdisabled}
							>
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
