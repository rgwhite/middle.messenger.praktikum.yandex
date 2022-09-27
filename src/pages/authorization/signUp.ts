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

export class SignUp extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "title": pages.signUp.title,
            "fieldEmail": new GroupItem({
                id: "email",
                name: "email",
                label: "Почта",
                value: "",
                regexp: validate.email.regexp,
                error: validate.email.error
            }),
            "fieldLogin": new GroupItem({
                id: "login",
                name: "login",
                label: "Логин",
                value: "",
                regexp: validate.login.regexp,
                error: validate.login.error
            }),
            "fieldFirstName": new GroupItem({
                id: "first_name",
                name: "first_name",
                label: "Имя",
                value: "",
                regexp: validate.name.regexp,
                error: validate.name.error
            }),
            "fieldSecondName": new GroupItem({
                id: "second_name",
                name: "second_name",
                label: "Фамилия",
                value: "",
                regexp: validate.name.regexp,
                error: validate.name.error
            }),
            "fieldPhone": new GroupItem({
                id: "phone",
                name: "phone",
                label: "Телефон",
                value: "",
                regexp: validate.phone.regexp,
                error: validate.phone.error
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
            "fieldConfirmPassword": new GroupItem({
                id: "confirm_password",
                name: "confirm_password",
                label: "Пароль (еще раз)",
                type: "password",
                value: "",
                regexp: validate.password.regexp,
                error: validate.password.error
            }),
            "buttonSubmit": new Button({
                id: "submit",
                type: "submit",
                form: "signup-form",
                text: "Зарегистрироваться",
                onCick: () => {
                    console.log("click");
                }
            }),
            "linkSignin": new Link({
                href: pages.signIn.href,
                text: "Войти",
                onCick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.signIn.href);
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
                    <form id="signup-form" action="" class="auth-container__form">
                        <div class="auth-container__fields">
                            {{{ fieldEmail }}}
                            {{{ fieldLogin }}}
                            {{{ fieldFirstName }}}
                            {{{ fieldSecondName }}}
                            {{{ fieldPhone }}}
                            {{{ fieldPassword }}}
                            {{{ fieldConfirmPassword }}}
                        </div>
                        <div class="auth-container__buttons">
                            {{{ buttonSubmit }}}
                            {{{ linkSignin }}}
                        </div>
                    </form>
                </div>`;
    }
}