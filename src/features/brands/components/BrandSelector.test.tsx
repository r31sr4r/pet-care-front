import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, renderWithProviders, screen, waitFor } from '../../../utils/test/test-utils';
import { baseUrl } from '../../api/apiSlice';
import { BrandSelector } from './BrandSelector';
import { brandsMockResult } from './mocks/brandsMock';

const brandType = 'DOG';

export const handlers = [
	rest.get(`${baseUrl}/brands/brand-type/${brandType}`, (_, res, ctx) => {		                
		return res(ctx.json(brandsMockResult), ctx.delay(150));
	}),
];

const server = setupServer(...handlers);


const Props = {
    brandType: brandType,
    brandId: '',
    handleBrandChange: () => {},
};

describe('BrandSelector', () => {
    afterAll(() => server.close());
	afterEach(() => server.resetHandlers());
	beforeAll(() => server.listen());

    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<BrandSelector {...Props} />);
        expect(asFragment()).toMatchSnapshot();        
    });

    // it('should render with results', async () => {
    //     renderWithProviders(<BrandSelector {...Props} />);
    //     await waitFor(() => {
	// 		const brandLabel = screen.getAllByLabelText('Raça');
    //         expect(brandLabel).toHaveLength(1);
    //     })
	// 	const dropButton = screen.getByTestId('ArrowDropDownIcon');
	// 	fireEvent.click(dropButton);
    // });

});