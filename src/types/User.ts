import { SortDirection } from './SortDirection';

export interface Results {
    meta: Meta
    data: Item[];
}

export interface ResultsByType {    
    data: Item[];
}

export interface Result {
    data: Item;
}

export interface Item {
    id:          string;
    name:        string;
    email:        string;    
    is_active:    boolean;
    created_at:   Date;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface SearchParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}

export interface AccessResult {
    data: AccessData;
}

export interface AccessData {
    access_token: string;
    token_type?: string;
    expires_in?: number;
}

export interface UserSignIn {
    email: string;
    password: string;
}

export interface TokenPayload {
    exp: number;
    iat: number;
    user: UserTokenPayload;
}

export interface UserTokenPayload {
    id: string;
    email: string;
    name: string;
    profile: Profile[]
}

export interface Profile {
    group: string;
    role: string;
}

export interface User {
	id: string | null;
	name: string;
	email: string;
	password: string;
	confirm_password: string | null;
	old_password: string | null;
	group: string;
	role: string;
	is_active: boolean | null;
	created_at: string | null;
}


