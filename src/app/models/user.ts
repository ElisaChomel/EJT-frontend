import { Profile } from "./../enums/profile"

export interface IUser {
    id:number;
    username:string;
    email:string;
    profile: Profile;
    token: string;
}

