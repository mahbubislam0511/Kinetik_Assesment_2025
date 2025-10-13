import { Locator, Page } from "@playwright/test";

export class ProductsPage {

    readonly page: Page;
    readonly womenCategoryLocator: Locator;
    readonly sareeLocator: Locator;
    readonly addToCartHover: Locator;
    readonly addToCartClick: Locator;

    readonly kidsCategoryLocator: Locator;
    readonly dressLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.womenCategoryLocator = page.locator("//a[normalize-space()='Women']");
        this.sareeLocator = page.locator("//a[normalize-space()='Saree']");

        this.addToCartHover = page.locator("(//a[@href='javascript:void();'][normalize-space()='Add to cart'])[1]");
        this.addToCartClick = page.locator("(//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart'])[2]");

        this.kidsCategoryLocator = page.locator("//a[normalize-space()='Kids']");
        this.dressLocator = page.locator("//div[@id='Kids']//a[contains(text(),'Dress')]");
    }

    
    async selectWomenSaree() {
        // Ensure page navigation is complete
        await this.page.waitForLoadState('domcontentloaded');
        await this.womenCategoryLocator.click();
        await this.sareeLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.addToCartHover.hover();
        await this.addToCartClick.click();
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async selectKidsShirt(){
        await this.kidsCategoryLocator.click();
        await this.dressLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.addToCartHover.hover();
        await this.addToCartClick.click();
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }
}