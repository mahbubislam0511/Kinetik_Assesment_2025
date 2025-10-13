import { Locator, Page } from "@playwright/test";

export class LoginPage{
    
    readonly page: Page;
    readonly emailLocator: Locator;
    readonly passwordLocator: Locator;
    readonly loginSubmitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailLocator = page.locator("//input[@data-qa='login-email']");
        this.passwordLocator = page.locator("//input[@placeholder='Password']");
        this.loginSubmitButton = page.locator("//button[normalize-space()='Login']");
    }

    async loginToApplication(email:string, password:string) {
      await this.emailLocator.fill(email);
      await this.passwordLocator.fill(password);
      await this.page.waitForTimeout(2000);
      await this.loginSubmitButton.click();
      await this.page.waitForTimeout(3000);
    }
}