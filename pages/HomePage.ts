import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator("//a[normalize-space()='Signup / Login']");
    }

    async goToHomePage() {
        await this.page.goto('http://automationexercise.com');
    }

    async goToLoginPage() {
        await this.loginButton.click();
    }
}