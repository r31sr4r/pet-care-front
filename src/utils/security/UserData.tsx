import { TokenPayload } from '../../types/User';
import jwt_decode from 'jwt-decode';

export function UserData() {
	const token = localStorage.getItem('token') || '';
	let decodedTokenPayload: TokenPayload = {
        exp: 0,
        iat: 0,
		user: {
			id: '',
			name: '',
			email: '',
			profile: [
				{
					role: '',
					group: '',
				},
			],
		},
	};
	if (token) {
		decodedTokenPayload = jwt_decode<TokenPayload>(token);
	}
	return decodedTokenPayload;
}
