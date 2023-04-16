import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
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
import { DewormerRecordsList } from './features/dewormers/ListDewormerRecords';
import { CreateDewormerRecord } from './features/dewormers/CreateDewormerRecord';
import { EditDewormerRecord } from './features/dewormers/EditDewormerRecord';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<SignIn />} />
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
					path="/pets/:id/dewormer-records"
					element={<DewormerRecordsList />}
				/>
				<Route
					path="/pets/:id/dewormer-records/create"
					element={<CreateDewormerRecord />}
				/>
				<Route
					path="/pets/:pet_id/dewormer-records/:id/edit"
					element={<EditDewormerRecord />}
				/>

				<Route
					path="*"
					element={
						<Box
							sx={{
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<Typography variant="h1">404</Typography>
							<Typography variant="h2">Page not found</Typography>
						</Box>
					}
				/>
			</Routes>
		</Layout>
	);
}

export default App;
