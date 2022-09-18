import Block from "../../core/block";
import { Props } from "../../types/types";
import { ChatItem } from "./components/chatItem";
import { MessageItem } from "./components/messageItem";
import { Link } from "../../components/buttons/link/link";
import { Button } from "../../components/buttons/button/button";
import { GroupItem } from "../../components/form/groupItem";
import { redirectToPage } from "../../core/redirect";
import validate from "../../data/validate.json";
import pages from "../../data/pages.json";
import "./chat.css";

export class Chat extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            chat_name: "Яндекс",
            link_profile: new Link({
                href: pages.profile.href, class: "link-profile", text: "Профиль >",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.profile.href);
                    }
                }
            }),
            input_find: new GroupItem({
                id: "find", name: "find", class: "item-find", value: "", placeholder: "Поиск"
            }),
            button_upload: new Button({
                id: "upload", type: "button", class: "button-upload", text: "F"
            }),
            input_message: new GroupItem({
                id: "message", name: "message", class: "chat-message", value: "", placeholder: "Сообщение", regexp: validate.message.regexp, error: validate.message.error
            }),
            button_submit: new Button({
                id: "submit", class: "button-submit", type: "submit", form: "chat-form", text: ">",
                events: {
                    click: () => {
                        console.log("click");
                    }
                }              
            }),
            chat_1: new ChatItem({
                name: "Тест чат", message: "тест!", time: "1d", count: 1
            }),
            chat_2: new ChatItem({
                name: "Яндекс", message: "Привет", time: "now", active: true, count: 0
            }),
            message_1: new MessageItem({
                message: "Привет", time: "12:22"
            }),
            message_2: new MessageItem({
                message: "Привет, как дела?", time: "12:24", author: true
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
        return `<div class="main-chat-container">
                    <div class="main-chat-container__left-panel chat-left-panel">
                        <div class="chat-left-panel__find chat-find">
                            <div class="chat-find__link-profile">
                                {{{ link_profile }}}
                            </div>
                            <div class="chat-find__input">
                                {{{ input_find }}}
                            </div>    
                        </div>
                        <div class="chat-left-panel__chats">
                            {{{ chat_1 }}}
                            {{{ chat_2 }}}
                        </div>
                    </div>
                    <div class="main-chat-container__right-panel chat-right-panel">
                        <div class="chat-right-panel__header">
                            <div class="chat-header__avatar ">
                                <span class="avatar__icon"></span>
                            </div>
                            <div class="chat-header__name">
                                <span>{{chat_name}}</span>
                            </div>    
                        </div>
                        <div class="chat-right-panel__chat">
                            {{{ message_1 }}}
                            {{{ message_2 }}}
                        </div>
                        <div class="chat-right-panel__footer chat-footer">
                            <form id="chat-form" action="" class="chat-footer__form">
                                <div class="chat-footer__upload">
                                    {{{ button_upload }}}
                                </div>
                                <div class="chat-footer__message">
                                    {{{ input_message }}}
                                </div>
                                <div class="chat-footer__submit">
                                    {{{ button_submit }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}