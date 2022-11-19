import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, renderWithProviders, screen, waitFor } from '../../../utils/test/test-utils';
import { baseUrl } from '../../api/apiSlice';
import { BreedSelector } from './BreedSelector';
import { breedsMockResult } from './mocks/breedsMock';

const petType = 'DOG';

export const handlers = [
	rest.get(`${baseUrl}/breeds/type/${petType}`, (_, res, ctx) => {		                
		return res(ctx.json(breedsMockResult), ctx.delay(150));
	}),
];

const server = setupServer(...handlers);


const Props = {
    petType: petType,
    breedName: '',
    handleBreedChange: () => {},
};

describe('BreedSelector', () => {
    afterAll(() => server.close());
	afterEach(() => server.resetHandlers());
	beforeAll(() => server.listen());

    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<BreedSelector {...Props} />);
        expect(asFragment()).toMatchSnapshot();        
    });

    it('should render with results', async () => {
        renderWithProviders(<BreedSelector {...Props} />);
        await waitFor(() => {
			const breedLabel = screen.getAllByLabelText('Raça');
            expect(breedLabel).toHaveLength(1);
        })
		const dropButton = screen.getByTestId('ArrowDropDownIcon');
		fireEvent.click(dropButton);
    });

});