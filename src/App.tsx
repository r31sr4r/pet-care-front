import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import * as React from 'react';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => <Typography variant="h3">Home</Typography>;

const About = () => <Typography variant="h3">About</Typography>;

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
					<h1>Welcome to React Router!</h1>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="about" element={<About />} />
					</Routes>
				</Layout>
			</Box>
		</ThemeProvider>
	);
}

export default App;
