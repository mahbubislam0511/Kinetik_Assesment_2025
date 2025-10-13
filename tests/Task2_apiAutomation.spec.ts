import { test, expect } from '@playwright/test';
import { createAccount } from '../api/createAccountAPI.js';
import { HelperFunction } from '../fixtures/HelperFunction.js';
import fs from 'fs';

test.describe('API Automation: Create Account API', () => {

    // Register a new user with a unique email and valid details.
    test('Register new user successfully (201)', async () => {
        const userData = JSON.parse(fs.readFileSync('fixtures/user_credentials.json', 'utf-8'));
        
        const uniqueEmail = HelperFunction.generateUniqueEmail();
        userData.email = uniqueEmail;

        const response = await createAccount(userData);
        const responseBody = await response.json();

        // Assert specific fields inside the response
        console.log(responseBody.responseCode);
        expect(responseBody.responseCode).toBe(201);
        console.log(responseBody.message);
        expect(responseBody.message).toBe('User created!');
    });


    // Attempt to register again with the same email.
    test('Attempt to register again with same email (400)', async () => {
        const userData = JSON.parse(fs.readFileSync('fixtures/user_credentials.json', 'utf-8'));

        // First create successfully
        const uniqueEmail = HelperFunction.generateUniqueEmail();
        userData.email = uniqueEmail;

        const firstResponse = await createAccount(userData);

        // Try again with same email
        const secondResponse = await createAccount(userData);
        const SecondResponseBody = await secondResponse.json();

        // Assert specific fields inside the response
        console.log(SecondResponseBody.responseCode);
        expect(SecondResponseBody.responseCode).toBe(400);
        console.log(SecondResponseBody.message);
        expect(SecondResponseBody.message).toBe('Email already exists!');
    });
});