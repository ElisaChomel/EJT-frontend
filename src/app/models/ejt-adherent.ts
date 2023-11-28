export interface IEjtAdherent {
    id: number;
    lastname: string;
    firstname: string;
    birthday: Date;
    licenceCode: string;
}

export interface IEjtAdherentInscipriton {
    id: number;
    competitions: number[];
}