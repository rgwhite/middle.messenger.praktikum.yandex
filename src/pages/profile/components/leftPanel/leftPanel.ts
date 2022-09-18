import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
import "./leftPanel.css";

export class LeftPanel extends Block {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return `<a href="{{href}}" class="main-profile-container__left-panel profile-left-panel">
                    <span class="profile-left-panel__button"><</span>
                </a>`;
    }
}