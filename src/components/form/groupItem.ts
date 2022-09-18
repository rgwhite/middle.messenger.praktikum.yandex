import Block from "../../core/block";
import { Props } from "../../types/types";
import "./groupItem.css";

export class GroupItem extends Block {
    constructor(props: Props) {
        const validate = () => {
            this.validate();
        };
        const moreProps: Props = {
            events: {
                blur: validate,
                focus: validate
            }
        };

        super({ ...props, ...moreProps });
    }

    public validate(): boolean {
        const element = this.getContent();
        const input = element.querySelector("input");
        if (input && this.getMeta().regexp) {
            const value = input!.value;
            const result = RegExp(this.getMeta().regexp).test(value);
            if (result) {
                element.classList.remove("item-invalid");
            } else {
                element.classList.add("item-invalid");
                return false;
            }
        }
        return true;
    }
    //{{#if side}}group-item-side{{else}}group-item{{/if}}
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