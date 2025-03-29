export class Login {
    constructor( 
        public username: string,
        public password: string
    ) {}

    public serialise(): any {
        return {
            username: this.username,
            password: this.password
        }
    }
}
