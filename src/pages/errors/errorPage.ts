import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { Link } from "../../components/buttons/link/link";
import pages from "../../data/pages.json";

export class ErrorPage extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "link_back": new Link({
                href: pages.chat.href,
                class: "error-container__link-button",
                text: "Назад к чатам",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        redirectToPage(pages.chat.href);
                    }
                }
            })
        };

        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="error-container">
                    <div class="error-container__title">
                        <span>{{code}}</span>
                    </div>
                    <div class="error-container__body">
                        <span>{{text}}</span>
                    </div>
                    <div class="error-container__buttons"></div>
                        {{{ link_back }}}
                    </div>
                </div>`;
    }
}