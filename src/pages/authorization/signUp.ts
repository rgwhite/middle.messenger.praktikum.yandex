import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import { Link } from "../../components/buttons/link/link";
import pages from "../../data/pages.json";
import validate from "../../data/validate.json";
import "./authorization.css";

export class SignUp extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "title": pages.signUp.title,
            "field_email": new GroupItem({
                id: "email", name: "email", label: "Почта", value: "", regexp: validate.email.regexp, error: validate.email.error
            }),
            "field_login": new GroupItem({
                id: "login", name: "login", label: "Логин", value: "", regexp: validate.login.regexp, error: validate.login.error
            }),
            "field_first_name": new GroupItem({
                id: "first_name", name: "first_name", label: "Имя", value: "", regexp: validate.name.regexp, error: validate.name.error
            }),
            "field_second_name": new GroupItem({
                id: "second_name", name: "second_name", label: "Фамилия", value: "", regexp: validate.name.regexp, error: validate.name.error
            }),
            "field_phone": new GroupItem({
                id: "phone", name: "phone", label: "Телефон", value: "", regexp: validate.phone.regexp, error: validate.phone.error
            }),
            "field_password": new GroupItem({
                id: "password", name: "password", label: "Пароль", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "field_confirm_password": new GroupItem({
                id: "confirm_password", name: "confirm_password", label: "Пароль (еще раз)", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "primary_submit": new Button({
                id: "submit", type: "submit", form: "signup-form", text: "Зарегистрироваться",
                events: {
                    submit: () => {
                        console.log("click");
                    }
                }
            }),
            "link_signin": new Link({
                href: pages.signIn.href, text: "Войти",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.signIn.href);
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
                    <form id="signup-form" action="" class="auth-container__form">
                        <div class="auth-container__fields">
                            {{{ field_email }}}
                            {{{ field_login }}}
                            {{{ field_first_name }}}
                            {{{ field_second_name }}}
                            {{{ field_phone }}}
                            {{{ field_password }}}
                            {{{ field_confirm_password }}}
                        </div>
                        <div class="auth-container__buttons">
                            {{{ primary_submit }}}
                            {{{ link_signin }}}
                        </div>
                    </form>
                </div>`;
    }
}