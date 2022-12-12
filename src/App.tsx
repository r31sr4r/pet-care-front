import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import * as React from 'react';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route } from 'react-router-dom';
import { ListPets } from './features/pets/ListPets';
import { CreatePet } from './features/pets/CreatePet';
import { EditPet } from './features/pets/EditPet';
import { SnackbarProvider } from 'notistack';
import { ListBreeds } from './features/breeds/ListBreeds'
import SignUp from './features/users/SignUp';
import SignIn from './features/users/SignIn';
import ActionAreaCard from './features/users/components/SelectUserType';
import { ChangePassword } from './features/users/ChangePassword';
import { VaccinationRecordList } from './features/vaccines/VaccinationRecordList';
import { CreateVaccinationRecord } from './features/vaccines/CreateVaccinationRecord';
import { DetailVaccinationRecord } from './features/vaccines/DetailVaccinationRecord';

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<SnackbarProvider
				autoHideDuration={3000}
				maxSnack={3}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box
					component="main"
					sx={{
						height: '100vh',
						backgroundColor: (theme) => theme.palette.grey[900],
					}}
				>
					<Header />
					<Layout>
						<Routes>
							<Route path="/" element={<ListPets />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/user/change-password" element={<ChangePassword />} />
							<Route path="/pets" element={<ListPets />} />
							<Route path="/type" element={<ActionAreaCard />} />
							<Route
								path="/pets/create"
								element={<CreatePet />}
							/>
							<Route
								path="/pets/edit/:id"
								element={<EditPet />}
							/>
							<Route path='/pets/:id/vaccines' element={<VaccinationRecordList />} />
							<Route path='/pets/:id/vaccines/create' element={<CreateVaccinationRecord />} />
							<Route path='/pets/vaccines/:id' element={<DetailVaccinationRecord />} />
							<Route path='/breeds' element={< ListBreeds />} />


							<Route
								path="*"
								element={
									<Box
										sx={{
											color: (theme) =>
												theme.palette.grey[500],
										}}
									>
										<Typography variant="h1">
											404
										</Typography>
										<Typography variant="h2">
											Page not found
										</Typography>
									</Box>
								}
							/>
						</Routes>
					</Layout>
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
