import { test, expect, Page } from '@playwright/test';
import { createAccount } from '../api/createAccountAPI.js';
import { HomePage } from '../pages/HomePage.js';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CheckoutAndPlaceOrderPage } from '../pages/CheckoutAndPlaceOrderPage.js';
import { PaymentAndConfirmationPage } from '../pages/PaymentAndConfirmationPage.js';
import { HelperFunction } from '../fixtures/HelperFunction.js';


test.describe('End-to-End Purchase Flow', () => {

    test('End-to-End Purchase Flow with New User Registration', async ({ page }) => {

        // 1. Send a POST request to https://automationexercise.com/api/createAccount with the required fields.
        const userData = JSON.parse(fs.readFileSync('fixtures/user_credentials.json', 'utf-8'));
        const uniqueEmail = HelperFunction.generateUniqueEmail();
        userData.email = uniqueEmail;
        const response = await createAccount(userData);
        expect(response).toBeTruthy();

        // 2. Navigate to http://automationexercise.com.
        const homePage = new HomePage(page);
        await homePage.goToHomePage();
        await homePage.goToLoginPage();

        // 3. Retrieve credentials from user_credentials.json
        const email: string = userData.email;
        const password: string = userData.password;

        // 4. Perform UI login with the same email & password you stored in user_credentials.json.
        const loginPage = new LoginPage(page);
        await loginPage.loginToApplication(email, password);

        // 5. Add two products to the cart (preferably from different categories).
        const productsPage = new ProductsPage(page);
        await productsPage.selectWomenSaree();
        await productsPage.selectKidsShirt();

        // 6. Proceed to checkout and complete the order.
        const checkoutAndPlaceOrderPage = new CheckoutAndPlaceOrderPage(page);
        await checkoutAndPlaceOrderPage.checkoutAndPlaceOrder();

        // 7. Payment & Verify order placement
        const paymentAndConfirmationPage = new PaymentAndConfirmationPage(page);
        await paymentAndConfirmationPage.makePayment();

        // 8. Assert the success confirmation message and/or validate checkout success URL.
        await paymentAndConfirmationPage.ValidateConfirmationPage();

        // 9.  Download the invoice.
        // 10. Verify the invoice file
        // 11. Check file exists in the local downloads directory.
        // 12. Assert file size > 0 (non-empty).
        await paymentAndConfirmationPage.downloadTheInvoice();
    })
})