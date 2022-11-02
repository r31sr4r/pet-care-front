import { renderWithProviders } from '../../utils/test/test-utils';
import SignIn from './SignIn';

describe('SignIn', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<SignIn />);
        expect(asFragment()).toMatchSnapshot();
    });
});