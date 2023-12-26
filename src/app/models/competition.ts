export interface ICompetition {
    id:number;
    year:number;
    month:number;
    day:number;
    name:string;
    address: string;
    yearBirthdayMin: number;
    yearBirthdayMax: number;    
    maxInscriptionDate: Date;
}