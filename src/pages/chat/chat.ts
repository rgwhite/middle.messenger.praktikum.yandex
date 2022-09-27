import Block from "../../core/block";
import { Props } from "../../types/types";
import { ChatItem } from "./components/chatItem";
import { MessageItem } from "./components/messageItem";
import { Link } from "../../components/buttons/link/link";
import { Button } from "../../components/buttons/button/button";
import { GroupItem } from "../../components/form/groupItem";
import { redirectToPage } from "../../core/redirect";
import { formSubmit } from "../../utils/formSubmit";
import validate from "../../data/validate.json";
import pages from "../../data/pages.json";
import "./chat.css";

export class Chat extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            chat_name: "Яндекс",
            linkProfile: new Link({
                href: pages.profile.href,
                class: "link-profile",
                text: "Профиль >",
                onClick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(pages.profile.href);
                }
            }),
            inputFind: new GroupItem({
                id: "find",
                name: "find",
                class: "item-find",
                value: "",
                placeholder: "Поиск"
            }),
            buttonUpload: new Button({
                id: "upload",
                type: "button",
                class: "button-upload",
                text: "F"
            }),
            inputMessage: new GroupItem({
                id: "message",
                name: "message",
                class: "chat-message",
                value: "",
                placeholder: "Сообщение",
                regexp: validate.message.regexp,
                error: validate.message.error
            }),
            buttonSubmit: new Button({
                id: "submit",
                class: "button-submit",
                type: "submit",
                form: "chat-form",
                text: ">",
                onClick: () => {
                    console.log("click");
                }              
            }),
            chat1: new ChatItem({
                name: "Тест чат",
                message: "тест!",
                time: "1d",
                count: 1
            }),
            chat2: new ChatItem({
                name: "Яндекс",
                message: "Привет",
                time: "now",
                active: true,
                count: 0
            }),
            message1: new MessageItem({
                message: "Привет",
                time: "12:22",
                author: false
            }),
            message2: new MessageItem({
                message: "Привет, как дела?",
                time: "12:24",
                author: true
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
        return `<div class="main-chat-container">
                    <div class="main-chat-container__left-panel chat-left-panel">
                        <div class="chat-left-panel__find chat-find">
                            <div class="chat-find__link-profile">
                                {{{ linkProfile }}}
                            </div>
                            <div class="chat-find__input">
                                {{{ inputFind }}}
                            </div>    
                        </div>
                        <div class="chat-left-panel__chats">
                            {{{ chat1 }}}
                            {{{ chat2 }}}
                        </div>
                    </div>
                    <div class="main-chat-container__right-panel chat-right-panel">
                        <div class="chat-right-panel__header">
                            <div class="chat-header__avatar ">
                                <span class="avatar__icon"></span>
                            </div>
                            <div class="chat-header__name">
                                <span>{{chatName}}</span>
                            </div>    
                        </div>
                        <div class="chat-right-panel__chat">
                            {{{ message1 }}}
                            {{{ message2 }}}
                        </div>
                        <div class="chat-right-panel__footer chat-footer">
                            <form id="chat-form" action="" class="chat-footer__form">
                                <div class="chat-footer__upload">
                                    {{{ buttonUpload }}}
                                </div>
                                <div class="chat-footer__message">
                                    {{{ inputMessage }}}
                                </div>
                                <div class="chat-footer__submit">
                                    {{{ buttonSubmit }}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
    }
}