export class LoginPage{
    constructor(page){
        this.page = page;
        this.email = page.getByLabel('email');
        this.password = page.getByLabel('password');
        this.signIn = page.getByRole('button',{name:'Sign In'})
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email,password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signIn.click();
        await this.page.waitForURL('/');
    }
}