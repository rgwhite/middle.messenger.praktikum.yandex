import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
//import { redirectToPage } from "../../core/redirect";
//import validate from "../../data/validate.json";
import "./messageItem.css";

export class MessageItem extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {};

        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="message-item-group {{#if author}}message-right{{else}}message-left{{/if}}">
                    <div class="message-item-group__content message-content">
                        <span class="message-content__text">{{message}}</span>
                    </div>
                    <div class="message-item-group__time">
                        <span>{{time}}</span>
                    </div>
                </div>`;
    }
}