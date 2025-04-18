import { Status } from "../enums/status";
import { ITask } from "../interfaces/task";

export class Task {
    constructor(
        public id: number,
        public title: string, 
        public status: Status,
        public description?: string,
        public estimateTime?: string,
    ){}

    public serialize(): ITask {
        return {
            id: this.id,
            status: this.status,
            title: this.title,
            description: this.description,
            estimateTime: this.estimateTime 
        }
    }

    public static fromITask(data: ITask): Task {
        return new Task(
            data.id,
            data.title,
            data.status,
            data.description,
            data.estimateTime,      
        )
    }
}
