import { Pet } from './Pet';
import { SortDirection } from './SortDirection';
import { Vaccine } from './Vaccine';
import { VaccineSchedule } from './VaccineSchedule';
import { Brand } from './Brand';

export interface Results {
    meta: Meta
    data: VaccinationRecord[];
}

export interface Result {
    meta: Meta
    data: VaccinationRecord;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface VaccinationRecord {
	id: string;
	pet_id: string;
	vaccine_id: string;
	vaccine_schedule_id: string;
	brand_id: string | null;
	was_applied: boolean;
	application_date: string | null | undefined;
	booster_date: string | null | undefined;
	notes: string | null;
	clinic: string | null;
	vet: string | null;
	update_reason: string | null;	
	created_at: string | null;
	pet: Pet | null;
	vaccine: Vaccine | null;
	vaccine_schedule: VaccineSchedule | null;
	brand: Brand | null;
}

export interface SearchParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}