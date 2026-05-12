import { BasePage } from "./BasePage";
import { expect} from "@playwright/test";

export class LoginPage extends BasePage {

    async openLoginPage() {
        await this.navigateTo('/login');
    }

    async userLogin(username: string, password: string) {
        await this.basePageFill('#username', username);
        await this.basePageFill('#password', password);
        await this.basePageClick('xpath=//button[text()="Login"]');
    }

    async assertFailedUsername(){
        await this.basePageExpectToBeVisible(this.page.locator('#flash'));
        await expect(this.page.locator('#flash')).toContainText('Your username is invalid!');
    }
}