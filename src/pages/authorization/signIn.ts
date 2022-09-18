import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import { Link } from "../../components/buttons/link/link";
import pages from "../../data/pages.json";
import validate from "../../data/validate.json";
import "./authorization.css";

export class SignIn extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "title": pages.signIn.title,
            "field_login": new GroupItem({
                id: "login", name: "login", label: "Логин", value: "", regexp: validate.login.regexp, error: validate.login.error
            }),
            "field_password": new GroupItem({
                id: "password", name: "password", label: "Пароль", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "primary_submit": new Button({
                id: "submit", type: "submit", form: "signin-form", text: "Авторизоваться",
                events: {
                    click: () => {
                        console.log("click");
                    }
                }
            }),
            "link_signup": new Link({
                href: pages.signUp.href, text: "Нет аккаунта?",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.signUp.href);
                    }
                }
            }),
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const validateList = Object.values(this.children).filter((item) => item instanceof GroupItem) as GroupItem[];
                    if (validateList.length) {
                        const validateResult = validateList.map((item) => item.validate());
                        if (!validateResult.includes(false)) {
                            const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
                            console.log(data);
                        }
                    }
                }
            }
        };

        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="auth-container">
                    <div class="auth-container__title">
                        <span>{{title}}</span>
                    </div>
                    <form id="signin-form" action="" class="auth-container__form">
                        <div class="auth-container__fields">
                            {{{ field_login }}}
                            {{{ field_password }}}
                        </div>
                        <div class="auth-container__buttons">
                            {{{ primary_submit }}}
                            {{{ link_signup }}}
                        </div>
                    </form>
                </div>`;
    }
}