import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
//import { redirectToPage } from "../../core/redirect";
//import validate from "../../data/validate.json";
import "./messageItem.css";

interface MessageItemProps extends Props{
    author: boolean,
    message: string,
    time: string,
}

export class MessageItem extends Block<MessageItemProps> {
    constructor(props: MessageItemProps) {
        super(props,);
    }

    render() {
        return `<div class="message-item-group {{#if author}}message-right{{else}}message-left{{/if}}">
                    <div class="message-item-group__content message-content">
                        <span class="message-content__text">{{message}}</span>
                    </div>
                    <time class="message-item-group__time">
                        {{time}}
                    </time>
                </div>`;
    }
}