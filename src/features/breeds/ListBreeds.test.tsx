import { renderWithProviders } from '../../utils/test/test-utils';
import { ListBreeds } from './ListBreeds';

describe('ListBreeds', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<ListBreeds />);
        expect(asFragment()).toMatchSnapshot();
    });
});