import { ErrorPage } from "./errorPage";
import { Props } from "../../types/types";
import "./errors.css";

export class Error500 extends ErrorPage {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "code": "500",
            "text": "Мы уже фиксим"
        };

        super({ ...props, ...moreProps });
    }
}