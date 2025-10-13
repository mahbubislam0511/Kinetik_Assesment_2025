import { Page } from "@playwright/test";

export class CheckoutAndPlaceOrderPage{
    readonly page: Page;

    constructor(page : Page){
        this.page = page;
    }

    async checkoutAndPlaceOrder(){
        await this.page.getByText('Proceed To Checkout').click();
        await this.page.getByRole('link', { name: 'Place Order' }).click();
    }
}