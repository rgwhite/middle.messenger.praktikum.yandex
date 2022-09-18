import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
//import { redirectToPage } from "../../core/redirect";
//import validate from "../../data/validate.json";
import "./chatItem.css";

export class ChatItem extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {};

        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="chat-item-group {{#if active}}chat-active{{/if}}">
                    <div class="chat-item-group__container">
                        <div class="chat-item-group__avatar avatar">
                            <span class="avatar__icon"></span>
                        </div>
                        <div class="chat-item-group__chat chat">
                            <div class="chat__name">
                                <span>{{name}}</span>
                            </div>
                            <div class="chat__message">
                                <span>{{message}}</span>
                            </div>
                        </div>
                        <div class="chat-item-group__info info">
                            <div class="info__time">
                                <span>{{time}}</span>
                            </div>
                            {{#if count}}
                            <div class="info__count">
                            <span>{{count}}</span>
                            </div>
                            {{/if}}
                        </div>
                    </div>
                </div>`;
    }
}