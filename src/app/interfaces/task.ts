import { Status } from "../enums/status";

export interface ITask {
    id: number;
    title: string;
    description?: string;
    status: Status;
}
