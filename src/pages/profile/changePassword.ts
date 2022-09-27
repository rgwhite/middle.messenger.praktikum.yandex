import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { LeftPanel } from "./components/leftPanel/leftPanel";
import { Header } from "./components/header/header";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import { formSubmit } from "../../utils/formSubmit";
import pages from "../../data/pages.json";
import validate from "../../data/validate.json";
import "./profile.css";

export class ChangePassword extends Block {
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
            "title": "",
            "fieldOldPassword": new GroupItem({
                id: "oldPassword",
                name: "oldPassword",
                side: true,
                label: "Старый пароль",
                type: "password",
                value: "",
                regexp: validate.password.regexp,
                error: validate.password.error
            }),
            "fieldNewPassword": new GroupItem({
                id: "newPassword",
                name: "newPassword",
                side: true,
                label: "Новый пароль",
                type: "password",
                value: "",
                regexp: validate.password.regexp,
                error: validate.password.error
            }),
            "fieldConfirmPassword": new GroupItem({
                id: "confirmPassword",
                name: "confirmPassword",
                side: true,
                label: "Повторите новый пароль",
                type: "password",
                value: "",
                regexp: validate.password.regexp,
                error: validate.password.error
            }),
            "buttonSubmit": new Button({
                id: "submit",
                form: "password-form",
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
                            <form id="password-form" action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ fieldOldPassword }}}
                                    {{{ fieldNewPassword }}}
                                    {{{ fieldConfirmPassword }}}
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