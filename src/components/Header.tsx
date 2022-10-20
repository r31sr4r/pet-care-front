import {
	AppBar,
	Box,
	Button,
	IconButton,
	Link,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo_white from '../assets/images/logo-white.png';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function Header() {
	let navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [userLogged, setUserLogged] = React.useState<boolean>(token !== null);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (ev: any) => {
		setAnchorEl(null);
		if (ev.nativeEvent.target.outerText === 'Sair') {
			handleLogout();
		}
	};

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
						<Button color="inherit" onClick={handleLogin}>
							Login
						</Button>
					) : (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									Alterar Senha
								</MenuItem>
								<MenuItem onClick={handleClose}>
									Minha Conta
								</MenuItem>
								<MenuItem onClick={handleClose}>Sair</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
