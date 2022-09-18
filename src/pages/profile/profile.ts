import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { LeftPanel } from "./components/leftPanel/leftPanel";
import { Header } from "./components/header/header";
import { GroupItem } from "../../components/form/groupItem";
import { Link } from "../../components/buttons/link/link";
import pages from "../../data/pages.json";
import user from "../../data/user.json";
import "./profile.css";

export class Profile extends Block {
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
            "title": user.firstName,
            "field_email": new GroupItem({
                name: "email", side: true, label: "Почта", value: user.email, disabled: true
            }),
            "field_login": new GroupItem({
                name: "login", side: true, label: "Логин", value: user.login, disabled: true
            }),
            "field_first_name": new GroupItem({
                name: "first_name", side: true, label: "Имя", value: user.firstName, disabled: true
            }),
            "field_second_name": new GroupItem({
                name: "second_name", side: true, label: "Фамилия", value: user.secondName, disabled: true
            }),
            "field_display_name": new GroupItem({
                name: "display_name", side: true, label: "Имя в чате", value: user.displayName, disabled: true
            }),
            "field_phone": new GroupItem({
                name: "phone", side: true, label: "Телефон", value: user.phone, disabled: true
            }),
            "link_change_profile_data": new Link({
                href: pages.changeProfileData.href, text: "Изменить данные",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.changeProfileData.href);
                    }
                }
            }),
            "link_change_password": new Link({
                href: pages.changePassword.href, text: "Изменить пароль",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.changePassword.href);
                    }
                }
            }),
            "link_logout": new Link({
                href: pages.signIn.href, class: "link-red", text: "Выйти",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.signIn.href);
                    }
                }
            })
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
                            <form action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ field_email }}}
                                    {{{ field_login }}}
                                    {{{ field_first_name }}}
                                    {{{ field_second_name }}}
                                    {{{ field_display_name }}}
                                    {{{ field_phone }}}
                                </div>
                                <div class="profile-container__buttons">
                                    {{{ link_change_profile_data }}}
                                    {{{ link_change_password }}}
                                    {{{ link_logout }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}