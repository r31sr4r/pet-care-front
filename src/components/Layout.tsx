import { Box, Container } from '@mui/material';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box>
			<Container
				maxWidth="lg"
				sx={{
					color: (theme) => theme.palette.common.white,
					mt: 4,
					mb: 4,
				}}
			>
				{children}
			</Container>
		</Box>
	);
}
