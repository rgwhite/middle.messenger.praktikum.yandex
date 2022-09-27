import Block from "../../../core/block";
import { Props } from "../../../types/types";
import "./button.css";

interface ButtonProps extends Props{
    id?: string,
    class?: string,
    form?: string,
    type?: "button" | "submit",
    text?: string,
    onClick?: (event: Event) => void
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps = {}) {
        super({
            ...props,
            events: {
                click: props.onClick! 
            }
        });
    }

    render() {
        return `<button 
                    {{#if id}}
                    id="{{id}}" 
                    {{/if}}
                    class="button {{#if class}}{{class}}{{/if}}" 
                    {{#if form}}
                    form="{{form}}" 
                    {{/if}}
                    {{#if type}}
                    type="{{type}}"
                    {{/if}}
                >
                    <span>
                        {{#if text}}
                        {{text}}
                        {{/if}}
                    </span>    
                </button>`;
    }
}