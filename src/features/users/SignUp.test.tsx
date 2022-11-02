import { renderWithProviders } from '../../utils/test/test-utils';
import SignUp from './SignUp';

describe('SignUp', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<SignUp />);
        expect(asFragment()).toMatchSnapshot();
    });
});