import { renderWithProviders } from '../../../utils/test/test-utils';
import { CreatePet } from '../CreatePet';

describe('CreatePet', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<CreatePet />);
        expect(asFragment()).toMatchSnapshot();
    });
});