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
            "leftPanel": new LeftPanel({
                href: pages.chat.href,
                onClick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.chat.href);
                }
            }),
            "header": new Header({}),
            "title": user.firstName,
            "fieldEmail": new GroupItem({
                name: "email",
                side: true,
                label: "Почта",
                value: user.email,
                disabled: true
            }),
            "fieldLogin": new GroupItem({
                name: "login",
                side: true,
                label: "Логин",
                value: user.login,
                disabled: true
            }),
            "fieldFirstName": new GroupItem({
                name: "first_name",
                side: true,
                label: "Имя",
                value: user.firstName,
                disabled: true
            }),
            "fieldSecondName": new GroupItem({
                name: "second_name",
                side: true,
                label: "Фамилия",
                value: user.secondName,
                disabled: true
            }),
            "fieldDisplayName": new GroupItem({
                name: "display_name",
                side: true,
                label: "Имя в чате",
                value: user.displayName,
                disabled: true
            }),
            "fieldPhone": new GroupItem({
                name: "phone",
                side: true,
                label: "Телефон",
                value: user.phone,
                disabled: true
            }),
            "linkChangeProfileData": new Link({
                href: pages.changeProfileData.href,
                text: "Изменить данные",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.changeProfileData.href);
                    }
                }
            }),
            "linkChangePassword": new Link({
                href: pages.changePassword.href,
                text: "Изменить пароль",
                onCick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.changePassword.href);
                }
            }),
            "linkLogout": new Link({
                href: pages.signIn.href,
                class: "link-red",
                text: "Выйти",
                onCick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.signIn.href);
                }
            })
        };

        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="main-profile-container">
                    {{{ leftPanel }}}
                    <div class="main-profile-container__right-panel">
                        {{{ header }}}
                        <div class="profile-container">
                            <div class="profile-container__title">
                                <span>{{title}}</span>
                            </div>
                            <form action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ fieldEmail }}}
                                    {{{ fieldLogin }}}
                                    {{{ fieldFirstName }}}
                                    {{{ fieldSecondName }}}
                                    {{{ fieldDisplayName }}}
                                    {{{ fieldPhone }}}
                                </div>
                                <div class="profile-container__buttons">
                                    {{{ linkChangeProfileData }}}
                                    {{{ linkChangePassword }}}
                                    {{{ linkLogout }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}