import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { LeftPanel } from "./components/leftPanel/leftPanel";
import { Header } from "./components/header/header";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import pages from "../../data/pages.json";
import user from "../../data/user.json";
import validate from "../../data/validate.json";
import "./profile.css";

export class ChangeProfileData extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "left_panel": new LeftPanel({
                href: pages.chat.href,
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.chat.href);
                    }
                }
            }),
            "header": new Header({}),
            "title": "",
            "field_email": new GroupItem({
                id: "email", name: "email", side: "true", label: "Почта", value: user.email, regexp: validate.email.regexp, error: validate.email.error
            }),
            "field_login": new GroupItem({
                id: "login", name: "login", side: "true", label: "Логин", value: user.login, regexp: validate.login.regexp, error: validate.login.error
            }),
            "field_first_name": new GroupItem({
                id: "first_name", name: "first_name", side: "true", label: "Имя", value: user.firstName, regexp: validate.name.regexp, error: validate.name.error
            }),
            "field_second_name": new GroupItem({
                id: "second_name", name: "second_name", side: "true", label: "Фамилия", value: user.secondName, regexp: validate.name.regexp, error: validate.name.error
            }),
            "field_display_name": new GroupItem({
                id: "display_name", name: "display_name", side: "true", label: "Имя в чате", value: user.displayName, regexp: validate.name.regexp, error: validate.name.error
            }),
            "field_phone": new GroupItem({
                id: "phone", name: "phone", side: "true", label: "Телефон", value: user.phone, regexp: validate.phone.regexp, error: validate.phone.error
            }),
            "primary_submit": new Button({
                id: "submit", form: "profile-form", type: "submit", text: "Сохранить",
                events: {
                    click: () => {
                        console.log("click");
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
        return `<div class="main-profile-container">
                    {{{ left_panel }}}
                    <div class="main-profile-container__right-panel">
                        {{{ header }}}
                        <div class="profile-container">
                            <div class="profile-container__title">
                                <span>{{title}}</span>
                            </div>
                            <form id="profile-form" action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ field_email }}}
                                    {{{ field_login }}}
                                    {{{ field_first_name }}}
                                    {{{ field_second_name }}}
                                    {{{ field_display_name }}}
                                    {{{ field_phone }}}
                                </div>
                                <div class="profile-container__buttons buttons__center">
                                    {{{ primary_submit }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}