export class SignUp {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    public serialise(): any {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}
