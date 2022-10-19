import {
	AppBar,
	Box,
	Button,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo_white from '../assets/images/logo-white.png';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function Header() {
	let navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [userLogged, setUserLogged] = React.useState<boolean>(token !== null);

	const handleLogout = () => {
		setUserLogged(false);
		localStorage.removeItem('token');
		navigate('/signin');
	};

	const handleLogin = () => {
		navigate('/signin');
	};

	useEffect(() => {
		setUserLogged(token !== null);
	}, [token]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<div>
						<img src={logo_white} alt="pet-care-club" />
					</div>
					<Typography
						variant="h6"
						component="div"
						sx={{ ml: 1, flexGrow: 1 }}
					>
						Pet Care Club
					</Typography>

					{!userLogged ? (
						<Button color="inherit" onClick={handleLogin}>Login</Button>
					) : (
						<Button
							color="inherit"
							endIcon={<Logout />}
							onClick={handleLogout}
						>
							Sair
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
