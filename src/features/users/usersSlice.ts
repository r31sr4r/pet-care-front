import { AccessResult, Result, User, UserSignIn } from '../../types/User';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/users';

function updatePasswordMutation(user: User) {
	return {
		url: `${endpointUrl}/${user.id}`,
		method: 'PATCH',
		body: user,
	};
}

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
		updatePassword: mutation<Result, User>({
			query: updatePasswordMutation,
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useCreateUserMutation,
	useSignInUserMutation,
	useUpdatePasswordMutation,
} = userApiSlice;
