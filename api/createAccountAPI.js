import { request } from '@playwright/test';

export async function createAccount(userData) {

    const apiContext = await request.newContext();

    const params = new URLSearchParams({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        title: userData.title,
        birth_date: userData.birth_date,
        birth_month: userData.birth_month,
        birth_year: userData.birth_year,
        firstname: userData.firstname,
        lastname: userData.lastname,
        company: userData.company,
        address1: userData.address1,
        address2: userData.address2,
        country: userData.country,
        state: userData.state,
        city: userData.city,
        zipcode: userData.zipcode,
        mobile_number: userData.mobile_number
    });

    const response = await apiContext.post(
        'https://automationexercise.com/api/createAccount',
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: params.toString()
        }
    );

    return response;

}