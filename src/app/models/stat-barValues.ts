export interface IStatBarValues {
    labels:string[];
    values: IStatBarDataset[];
}

export interface IStatBarDataset {
    label:string;
    data: number[];
}