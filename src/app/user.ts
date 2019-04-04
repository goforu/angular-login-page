import { IRes } from './res';

export interface IUser extends IRes{
    data: {
        fullName: string,
        slogan: string
    }
}
