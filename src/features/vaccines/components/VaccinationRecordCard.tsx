import {
	Box,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	styled,
	Tooltip,
	Typography,
} from '@mui/material';
import { VaccinationRecord } from '../../../types/VaccinationRecord';
import Moment from 'moment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type Props = {
	vaccinationGrouped: any;
	handleClick: (vaccinationId: string) => void;
};

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const formatDate = (date: string) => Moment(date).format('DD/MM/YYYY');

export const VaccinationRecordCard = ({
	vaccinationGrouped,
	handleClick,
}: Props) => {
	return (
		<Box>
			{vaccinationGrouped &&
				Object.keys(vaccinationGrouped).map((key) => {
					return (
						<>
							<Box key={key} sx={{ mb: 2 }}>
								<Grid container>
									<Grid item xs={11}>
										<Typography
											variant="h6"
											marginBottom={2}
										>
											{
												vaccinationGrouped[key][0]
													.vaccine?.name
											}
										</Typography>
									</Grid>
									<Grid item xs={1} textAlign={'end'}>
										<Tooltip
											title="Detalhar"
											placement="left-start"
										>
											<IconButton
												edge="end"
												aria-label="detail"
												onClick={() => handleClick(vaccinationGrouped[key][0].vaccine_id)}
											>
												<OpenInNewIcon />
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									spacing={{ xs: 1, sm: 2, md: 2 }}
								>
									{vaccinationGrouped[key].map(
										(vaccination: VaccinationRecord) => {
											return (
												<>
													<Box key={vaccination.id}>
														<Item>
															<Typography variant="body2">
																{
																	vaccination
																		.vaccine_schedule
																		?.description
																}
															</Typography>
															<Typography variant="body2">
																{formatDate(
																	vaccination?.application_date ||
																		''
																)}
															</Typography>
														</Item>
													</Box>
												</>
											);
										}
									)}
								</Stack>
							</Box>
							<Divider flexItem sx={{ mb: 2 }} />
						</>
					);
				})}
		</Box>
	);
};
