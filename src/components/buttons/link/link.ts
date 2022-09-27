import Block from "../../../core/block";
import { Props } from "../../../types/types";
import "./link.css";

interface LinkProps extends Props{
    id?: string,
    class?: string,
    href?: string,
    text?: string,
    onClick?: (event: Event) => void
}

export class Link extends Block<LinkProps> {
    constructor(props: LinkProps = {}) {
        super({
            ...props,
            events: {
                click: props.onClick!
            }
        });
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