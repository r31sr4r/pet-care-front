import { Backdrop, Box, CircularProgress, Paper, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useGetVaccinationRecordQuery } from './vaccinationRecordsSlice';

export const DetailVaccinationRecord = () => {
	const id = useParams<{ id: string }>().id || '';
	const {
		data: vaccinationRecord,
		isFetching,
		error,
	} = useGetVaccinationRecordQuery({ id });

	return (
		<Box>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={isFetching}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Paper>
				<Box p={2}>
					<Box>
						<Typography variant="h4">
							Vacina {vaccinationRecord?.data?.vaccine?.name}
						</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<Box>
						<Typography variant="h6">
							{vaccinationRecord?.data?.pet?.name}
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};
