import Block from "../../core/block";
import { Props } from "../../types/types";
import "./groupItem.css";

interface GroupItemProps extends Props{
    id?: string,
    name?: string,
    class?: string,
    type?: string,
    value?: string,
    placeholder?: string,
    disabled?: boolean,
    side?: boolean,
    regexp?: string,
    error?: string
}

export class GroupItem extends Block<GroupItemProps> {
    constructor(props: GroupItemProps = {}) {
        const validate = () => {
            return this.validate();
        }
        
        super({
            ...props,
            events: {
                blur: validate,
                focus: validate
            }   
        });
    }

    validate = () => {
        const element = this.getContent();
        const input = element.querySelector("input");
        const regexp = this.getMeta().regexp;
        if (regexp) {
            const value = input!.value;
            const isValid = RegExp(regexp).test(value);
            if (isValid) {
                element.classList.remove("item-invalid");
            } else {
                element.classList.add("item-invalid");
                return false;
            }
        }
        return true;
    }

    render() {
        return `<div class="{{#if side}}group-item-side{{else}}group-item{{/if}} {{#if class}}{{class}}{{/if}}">
                    <div class="{{#if side}}group-item-side{{else}}group-item{{/if}}__field">
                        {{#if label}}
                        <label
                            {{#if id}}
                            for="{{id}}"
                            {{/if}}
                            class="{{#if side}}group-item-side{{else}}group-item{{/if}}__label"
                        >
                        {{label}}
                        </label>
                        {{/if}}
                        <input
                            {{#if id}}
                            id="{{id}}"
                            {{/if}}
                            class="{{#if side}}group-item-side{{else}}group-item{{/if}}__input"
                            {{#if name}}
                            name="{{name}}"
                            {{/if}}
                            {{#if placeholder}}
                            placeholder="{{placeholder}}"
                            {{/if}}
                            {{#if type}}
                            type="{{type}}"
                            {{/if}}
                            {{#if value}}
                            value="{{value}}"
                            {{/if}}
                            {{#if disabled}}
                            disabled
                            {{/if}}
                            autocomplete="off"
                        >
                    </div>
                    <div class="{{#if side}}group-item-side{{else}}group-item{{/if}}__error">
                        <span>{{error}}</span>
                    </div>
                </div>`;
    }
}