import type {
    Page
} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async login(email: string, password: string) {
        await this.page.type('input[type="email"]', email);
        await this.page.type('input[type="password"]', password);
        await this.page.click('button[type="submit"]');
    }
}