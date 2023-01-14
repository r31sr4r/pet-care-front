import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
	palette: {
		background: {
			default: '#222222',
		},
		mode: 'dark',
		primary: {
			main: '#f5f5f1',
		},
		secondary: {
			main: '#E50914',
		},
		text: {
			primary: '#f5f5f1',
		},
	},
});

export const lightTheme = createTheme({
	palette: {
		background: {
			default: '#f5f5f1',			
			paper: '#f5f5f5',
		},
		mode: 'light',
		primary: {
			main: '#004153',
		},
		secondary: {
			main: '#00B6B4',
		},
		text: {
			primary: '#222222',
			secondary: '#222222',
		},		

	},
});


