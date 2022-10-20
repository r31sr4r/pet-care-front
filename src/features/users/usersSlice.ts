import { AccessResult, Result, UserSignIn } from '../../types/User';
import { apiSlice } from '../api/apiSlice';

export interface User {
	id: string | null;
	name: string;
	email: string;
	password: string;
	confirm_password: string | null;
	group: string;
	role: string;
	is_active: boolean | null;
	created_at: string | null;
}

const endpointUrl = '/users';

function createUserMutation(user: User) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: user,
	};
}

function signInUserMutation(user: User) {
	return {
		url: `${endpointUrl}/signin`,
		method: 'POST',
		body: user,
	};
}

export const userApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ mutation }) => ({
		createUser: mutation<Result, User>({
			query: createUserMutation,
			invalidatesTags: ['Users'],
		}),
		signInUser: mutation<AccessResult, UserSignIn>({
			query: signInUserMutation,
			transformResponse: (response: any) => {
				const { data } = response;
				const { accessToken } = data;
				localStorage.setItem('token', accessToken);
				return data;
			},
			invalidatesTags: ['Users'],
		}),
	}),
});

export const { useCreateUserMutation, useSignInUserMutation } = userApiSlice;