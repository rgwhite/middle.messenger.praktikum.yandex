import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { LeftPanel } from "./components/leftPanel/leftPanel";
import { Header } from "./components/header/header";
import { GroupItem } from "../../components/form/groupItem";
import { Button } from "../../components/buttons/button/button";
import pages from "../../data/pages.json";
import validate from "../../data/validate.json";
import "./profile.css";

export class ChangePassword extends Block {
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
            "field_old_password": new GroupItem({
                id: "oldPassword", name: "oldPassword", side: "true", label: "Старый пароль", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "field_new_password": new GroupItem({
                id: "newPassword", name: "newPassword", side: "true", label: "Новый пароль", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "field_confirm_password": new GroupItem({
                id: "confirmPassword", name: "confirmPassword", side: "true", label: "Повторите новый пароль", type: "password", value: "", regexp: validate.password.regexp, error: validate.password.error
            }),
            "primary_submit": new Button({
                id: "submit", form: "password-form", type: "submit", text: "Сохранить",
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
                            <form id="password-form" action="" class="profile-container__form">
                                <div class="profile-container__fields">
                                    {{{ field_old_password }}}
                                    {{{ field_new_password }}}
                                    {{{ field_confirm_password }}}
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