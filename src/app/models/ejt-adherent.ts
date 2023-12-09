import { BeltType } from "../enums/belt-type";

export interface IEjtAdherent {
    id: number;
    lastname: string;
    firstname: string;
    birthday: Date;
    licenceCode: string;
    weight: number;
    belt: BeltType
}

export interface IEjtAdherentInscipriton {
    id: number;
    competitions: number[];
}