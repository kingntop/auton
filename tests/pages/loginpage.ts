import type {
    Page
} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    async open() {
        await this.page.goto('http://angular.realworld.io/');
    }
    async goToLoginPage() {
        await this.page.click('a[routerlink="/login"]');
    }
    async login(email: string, password: string) {
        await this.page.goto('http://angular.realworld.io/');
        await this.page.click('a[routerlink="/login"]');
        await this.page.type('[placeholder="Email"]', email);
        await this.page.type('[placeholder="Password"]', password);
        await this.page.click('button[type="submit"]');
    }
}