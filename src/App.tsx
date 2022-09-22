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

function App() {
	return (
		<ThemeProvider theme={appTheme}>
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
						<Route path="/pets" element={<ListPets />} />
						<Route path="/pets/create" element={<CreatePet />} />
						<Route path="/pets/edit/:id" element={<EditPet />} />

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
			</Box>
		</ThemeProvider>
	);
}

export default App;
