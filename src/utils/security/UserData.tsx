import { TokenPayload } from "../../types/User";
import jwt_decode from "jwt-decode";

export function UserData() {
    const token = localStorage.getItem('token') || '';
    const decodedTokenPayload = jwt_decode<TokenPayload>(token);
    return decodedTokenPayload;
}