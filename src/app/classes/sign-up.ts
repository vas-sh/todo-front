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

    get validationErrors(): string {
        let errs: string[] = [];
        if (!this.name) {
            errs.push("name is required");
        }
        if (!this.email) {
            errs.push("email is required");
        }
        if (!this.password) {
            errs.push("password is required");
        }
        if (errs.length) {
            errs[0] = errs[0].slice(0, 1).toUpperCase() + errs[0].slice(1); 
            return errs.join("; ");
        }
        return ""
    }
}
