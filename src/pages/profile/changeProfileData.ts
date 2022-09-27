import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { LeftPanel } from "./components/leftPanel/leftPanel";
import { Header } from "./components/header/header";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import { formSubmit } from "../../utils/formSubmit";
import pages from "../../data/pages.json";
import user from "../../data/user.json";
import validate from "../../data/validate.json";
import "./profile.css";

export class ChangeProfileData extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "leftPanel": new LeftPanel({
                href: pages.chat.href,
                onCick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.chat.href);
                }
            }),
            "header": new Header({}),
            "title": "",
            "fieldEmail": new GroupItem({
                id: "email",
                name: "email",
                side: true,
                label: "Почта",
                value: user.email,
                regexp: validate.email.regexp,
                error: validate.email.error
            }),
            "fieldLogin": new GroupItem({
                id: "login",
                name: "login",
                side: true,
                label: "Логин",
                value: user.login,
                regexp: validate.login.regexp,
                error: validate.login.error
            }),
            "fieldFirstName": new GroupItem({
                id: "first_name",
                name: "first_name",
                side: true,
                label: "Имя",
                value: user.firstName,
                regexp: validate.name.regexp,
                error: validate.name.error
            }),
            "fieldSecondName": new GroupItem({
                id: "second_name",
                name: "second_name",
                side: true,
                label: "Фамилия",
                value: user.secondName,
                regexp: validate.name.regexp,
                error: validate.name.error
            }),
            "fieldDisplayName": new GroupItem({
                id: "display_name",
                name: "display_name",
                side: true,
                label: "Имя в чате",
                value: user.displayName,
                regexp: validate.name.regexp,
                error: validate.name.error
            }),
            "fieldPhone": new GroupItem({
                id: "phone",
                name: "phone",
                side: true,
                label: "Телефон",
                value: user.phone,
                regexp: validate.phone.regexp,
                error: validate.phone.error
            }),
            "buttonSubmit": new Button({
                id: "submit",
                form: "profile-form",
                type: "submit",
                text: "Сохранить",
                onClick: () => {
                    console.log("click");
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
        return `<div class="main-profile-container">
                    {{{ leftPanel }}}
                    <div class="main-profile-container__right-panel">
                        {{{ header }}}
                        <div class="profile-container">
                            <div class="profile-container__title">
                                <span>{{title}}</span>
                            </div>
                            <form id="profile-form" action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ fieldEmail }}}
                                    {{{ fieldLogin }}}
                                    {{{ fieldFirstName }}}
                                    {{{ fieldSecondName }}}
                                    {{{ fieldDisplayName }}}
                                    {{{ fieldPhone }}}
                                </div>
                                <div class="profile-container__buttons buttons__center">
                                    {{{ buttonSubmit }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}