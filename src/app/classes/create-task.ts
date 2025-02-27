export class CreateTask {
    constructor(
        public title: string, 
        public description: string
    ){}

    public serialize(): any {
        return {
            title: this.title,
            description: this.description
        }
    }
}
