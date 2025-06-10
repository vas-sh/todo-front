import { User } from "./user";

export interface LoginResp {
    token: string;
    type: string;
    user: User
}
