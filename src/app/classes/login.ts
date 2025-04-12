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

    get validationError(): string {
        let errs: string[] = [];
        if (!this.username) {
            errs.push("username is required");
        }
        if (!this.password) {
            errs.push("email is required");
        }
        if (errs.length) {
            errs[0] = errs[0].slice(0, 1).toUpperCase() + errs[0].slice(1); 
            return errs.join("; ");
        }
        return ""
    }
}
