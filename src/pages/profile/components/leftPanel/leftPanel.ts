import Block from "../../../../core/block";
import { Props } from "../../../../types/types";
import "./leftPanel.css";

interface LeftPanelProps extends Props{
    href?: string,
    onClick?: (event: Event) => void
}

export class LeftPanel extends Block<LeftPanelProps> {
    constructor(props: LeftPanelProps = {}) {
        super({
            ...props,
            events: {
                click: props.onClick!
            }
        });
    }

    render() {
        return `<a href="{{href}}" class="main-profile-container__left-panel profile-left-panel">
                    <span class="profile-left-panel__button"><</span>
                </a>`;
    }
}