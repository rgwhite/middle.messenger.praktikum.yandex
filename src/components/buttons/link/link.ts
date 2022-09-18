import Block from "../../../core/block";
import { Props } from "../../../types/types";
import "./link.css";

export class Link extends Block {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return `<a
                    {{#if href}}
                    href="{{href}}"
                    {{/if}}
                    {{#if id}}
                    id="{{id}}"
                    {{/if}}
                    class="link-button {{#if class}}{{class}}{{/if}}"
                >
                    <span>
                        {{#if text}}
                        {{text}}
                        {{/if}}
                    </span>
                </a>`;
    }
}