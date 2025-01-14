import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_white from '../assets/images/logo-white.png';
import { UserData } from '../utils/security/UserData';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export function Header({
	toggle,
	theme,
	handleDwawerToggle,
}: {
	toggle: () => void;
	theme: string;
	handleDwawerToggle: () => void;
}) {
	let navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [userLogged, setUserLogged] = React.useState<boolean>(token !== null);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleLogout = () => {
		setAnchorEl(null); 
		setTimeout(() => {
			setUserLogged(false);
			localStorage.removeItem('token');
			navigate('/signin');
		}, 300);  
	};
	

	const handleLogin = () => {
		setAnchorEl(null);
		navigate('/signin');
	};

	useEffect(() => {
		setUserLogged(token !== null);
	}, [token]);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};	

	const handlePasswordChange = () => {
		const id = UserData()?.user.id;
		navigate(`/user/change-password`);
	};
	
	const handleAccount = () => {
		setAnchorEl(null);
	};
	
	const handleMenuClose = () => {
		setAnchorEl(null);
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
						onClick={handleDwawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
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

					<IconButton
						sx={{ ml: 1 }}
						onClick={toggle}
						color="inherit"
					>
						{theme === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>

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
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handlePasswordChange}>Alterar Senha</MenuItem>
								{/* <MenuItem onClick={handleAccount}>Minha Conta</MenuItem> */}
								<MenuItem onClick={handleLogout}>Sair</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
