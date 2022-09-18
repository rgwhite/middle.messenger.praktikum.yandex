import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
import "./header.css";

export class Header extends Block {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return `<div class="main-container__header header">
                    <label for="avatar-upload" class="header__avatar">
                        <input id="avatar" class="header__upload" type="file" hidden="true"/>
                    </label>
                </div>`;
    }
}