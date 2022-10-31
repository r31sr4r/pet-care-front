import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PasswordAndConfirmPasswordValidation } from './PasswordAndConfirmPasswordValidation';

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
	handleChange: () => {},
};

describe('PasswordAndConfirmPasswordValidation', () => {
	it('should render successfully', () => {
		const { asFragment } = render(
			<PasswordAndConfirmPasswordValidation {...Props} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with a invalid password', () => {
		const { asFragment } = render(
			<PasswordAndConfirmPasswordValidation
				{...Props}
				user={{ ...mockUser, password: 'pa' }}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

    it('should render with other invalid password', () => {
		const { asFragment } = render(
			<PasswordAndConfirmPasswordValidation
				{...Props}
				user={{ ...mockUser, password: 'SW' }}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});


    it('should render with a valid password', () => {
        const { asFragment } = render(
            <PasswordAndConfirmPasswordValidation
                {...Props}
                user={{ ...mockUser, password: 'Password@' }}
            />,
            {
                wrapper: BrowserRouter,
            }
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
