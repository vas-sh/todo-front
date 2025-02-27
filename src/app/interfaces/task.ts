import { Status } from "../enums/status";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: Status;
}
