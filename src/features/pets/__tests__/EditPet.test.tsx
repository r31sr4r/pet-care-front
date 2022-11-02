import { renderWithProviders } from '../../../utils/test/test-utils';
import { EditPet } from '../EditPet';

describe('EditPet', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<EditPet />);
        expect(asFragment()).toMatchSnapshot();
    });
});