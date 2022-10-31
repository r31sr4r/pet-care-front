import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignUpForm } from './SignUpForm';

const mockUser = {
	id: '1',
	name: 'User Test',
	email: 'user@mail.com',
	password: 'Password123@',
	old_password: null,
	confirm_password: 'Password123@',
	group: 'USER',
	role: 'USER',
	is_active: true,
	created_at: '2021-01-01T00:00:00.000Z',
};

const Props = {
	user: mockUser,
	isDisabled: false,
	userType: 'customer',
	handleSubmit: () => {},
	handleChange: () => {},
};

describe('SignUpForm', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<SignUpForm {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with a invalid userName', () => {
		const { asFragment } = render(
			<SignUpForm {...Props} user={{ ...mockUser, name: 'pa' }} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
