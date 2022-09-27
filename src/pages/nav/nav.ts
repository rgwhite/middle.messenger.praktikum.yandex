import Block from "../../core/block";
import { Props } from "../../types/types";
import { redirectToPage } from "../../core/redirect";
import { Link } from "../../components/buttons/link/link";
import pages from "../../data/pages.json";
import "./nav.css";

export class Nav extends Block {
    constructor(props: Props = {}) {
        const moreProps: Props = {};

        Object.entries(pages).forEach(([name, page]) => {
            props[`link_${name}`] = new Link({
                href: page.href,
                text: page.title,
                onClick: (event: Event) => {
                    event.preventDefault();
                    redirectToPage(page.href);
                }
            });
        });
        super({ ...props, ...moreProps });
    }

    render() {
        return `<div class="nav">
                    ${Object.keys(this.getMeta()).reduce(
                        (prev: string, cur: string) => prev + `{{{ ${cur} }}}`, 
                    "")}
                </div>`;
    }
}