import { EjtPersonType } from "../enums/ejt-person-type";

export interface IEjtPerson {
    id: number;
    name: string;
    type: EjtPersonType;
    role: string;
    detail: string;
    photoname: string;
}