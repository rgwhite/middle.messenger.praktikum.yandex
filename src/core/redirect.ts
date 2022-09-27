import Block from "./block";
import renderDOM from "./renderDOM";
import { Nav } from "../pages/nav/nav";
import { Error404, Error500 } from "../pages/errors"
import { SignIn, SignUp } from "../pages/authorization"
import { Profile, ChangePassword, ChangeProfileData } from "../pages/profile";
import { Chat } from "../pages/chat/chat";
import { Props } from "../types/types";
import pages from "../data/pages.json";


const classes: Props = {
    nav: Nav,
    error404: Error404, error500: Error500,
    signIn: SignIn, signUp: SignUp,
    profile: Profile, changePassword: ChangePassword, changeProfileData: ChangeProfileData,
    chat: Chat
};

export function redirectToPage(path: string) {
    const pageInstance = getPageInstance(path);
    if (pageInstance) {
        renderDOM(pageInstance);
    }
}

function getPageInstance(path: string): Block | null {
    const page = Object.entries(pages).find((item) => item[1].href == path);
    if (page) {
        const blockClass = classes[page[0]];
        if (blockClass) {
            return new blockClass();
        }
    }
    return null;
}