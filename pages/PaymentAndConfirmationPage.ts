import { Page, expect } from "@playwright/test";
import path from "path";
import fs from 'fs';

export class PaymentAndConfirmationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async makePayment() {

        const nameField = this.page.locator('input[name="name_on_card"]');
        await nameField.waitFor({ state: 'visible' });

        await this.page.locator('input[name="name_on_card"]').fill('Ali');
        await this.page.locator('input[name="card_number"]').click();
        await this.page.locator('input[name="card_number"]').fill('467854367887654');
        await this.page.getByRole('textbox', { name: 'ex.' }).click();
        await this.page.getByRole('textbox', { name: 'ex.' }).fill('344');
        await this.page.getByRole('textbox', { name: 'MM' }).click();
        await this.page.getByRole('textbox', { name: 'MM' }).fill('10');
        await this.page.getByRole('textbox', { name: 'YYYY' }).click();
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill('2028');
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    }

    async ValidateConfirmationPage() {
        const successMessage = this.page.locator("//p[normalize-space()='Congratulations! Your order has been confirmed!']");
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Congratulations! Your order has been confirmed!');
    }

    async downloadTheInvoice() {
        // Wait for a 'download' event — this sets up a listener that resolves when a download starts
        const downloadPromise = this.page.waitForEvent('download');

        // Click the "Download Invoice" link which triggers the file download
        await this.page.getByRole('link', { name: 'Download Invoice' }).click();

        // Wait until the download event is triggered and get the Download object
        const download = await downloadPromise;

        // Ensure a downloads folder exists in the current workspace
        const downloadsDir = path.join(process.cwd(), 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir);
        }

        // Use a timestamped filename to avoid overwriting
        const filePath = path.join(downloadsDir, `invoice_${Date.now()}.pdf`);

        // Save the file
        await download.saveAs(filePath);

        // Check that the file exists and has content
        const stats = await fs.promises.stat(filePath);
        expect(stats.isFile()).toBeTruthy();
        expect(stats.size).toBeGreaterThan(0);

        console.log(`✅ Invoice downloaded successfully: ${filePath}, size: ${stats.size} bytes`);
    }
}