import Block from "../../../core/block";
import { Props } from "../../../types/types";
import "./button.css";

export class Button extends Block {
    constructor(props: Props) {
        super(props);
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