import { CssBaseline, Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { ListBreeds } from './features/breeds/ListBreeds';
import { CreatePet } from './features/pets/CreatePet';
import { EditPet } from './features/pets/EditPet';
import { ListPets } from './features/pets/ListPets';
import { ChangePassword } from './features/users/ChangePassword';
import ActionAreaCard from './features/users/components/SelectUserType';
import SignIn from './features/users/SignIn';
import SignUp from './features/users/SignUp';
import { CreateVaccinationRecord } from './features/vaccines/CreateVaccinationRecord';
import { DetailVaccinationRecord } from './features/vaccines/DetailVaccinationRecord';
import { EditVaccinationRecord } from './features/vaccines/EditVaccinationRecord';
import { VaccinationRecordList } from './features/vaccines/VaccinationRecordList';
import { useAppTheme } from './hooks/useAppTheme';

function App() {
	const [currentTheme, toggleCurrentTheme] =  useAppTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<CssBaseline />
			<SnackbarProvider
				autoHideDuration={3000}
				maxSnack={3}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Header
					toggle={toggleCurrentTheme}
					theme={currentTheme.palette.mode}
				 />
				<Layout>
					<Routes>
						<Route path="/" element={<ListPets />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
						<Route
							path="/user/change-password"
							element={<ChangePassword />}
						/>
						<Route path="/pets" element={<ListPets />} />
						<Route path="/type" element={<ActionAreaCard />} />
						<Route path="/pets/create" element={<CreatePet />} />
						<Route path="/pets/edit/:id" element={<EditPet />} />
						<Route
							path="/pets/:id/vaccines"
							element={<VaccinationRecordList />}
						/>
						<Route
							path="/pets/:id/vaccines/create"
							element={<CreateVaccinationRecord />}
						/>
						<Route
							path="/pets/:pet_id/vaccines/:id/edit"
							element={<EditVaccinationRecord />}
						/>
						<Route
							path="/pets/:pet_id/vaccines/:id"
							element={<DetailVaccinationRecord />}
						/>
						<Route path="/breeds" element={<ListBreeds />} />

						<Route
							path="*"
							element={
								<Box
									sx={{
										color: (theme) =>
											theme.palette.grey[500],
									}}
								>
									<Typography variant="h1">404</Typography>
									<Typography variant="h2">
										Page not found
									</Typography>
								</Box>
							}
						/>
					</Routes>
				</Layout>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
