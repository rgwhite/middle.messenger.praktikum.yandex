import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import { Link } from "../../components/buttons/link/link";
import { formSubmit } from "../../utils/formSubmit";
import pages from "../../data/pages.json";
import validate from "../../data/validate.json";
import "./authorization.css";

export class SignIn extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "title": pages.signIn.title,
            "fieldLogin": new GroupItem({
                id: "login",
                name: "login",
                label: "Логин",
                value: "",
                regexp: validate.login.regexp,
                error: validate.login.error
            }),
            "fieldPassword": new GroupItem({
                id: "password",
                name: "password",
                label: "Пароль",
                type: "password",
                value: "",
                regexp: validate.password.regexp,
                error: validate.password.error
            }),
            "buttonSubmit": new Button({
                id: "submit",
                type: "submit",
                form: "signin-form",
                text: "Авторизоваться",
                onClick: () => {
                    console.log("click");
                }
            }),
            "linkSignup": new Link({
                href: pages.signUp.href,
                text: "Нет аккаунта?",
                onClick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.signUp.href);
                }
            }),
            events: {
                submit: (event: Event) => {
                    formSubmit(event, this.children);
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
                            {{{ fieldLogin }}}
                            {{{ fieldPassword }}}
                        </div>
                        <div class="auth-container__buttons">
                            {{{ buttonSubmit }}}
                            {{{ linkSignup }}}
                        </div>
                    </form>
                </div>`;
    }
}