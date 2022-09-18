import { ErrorPage } from "./errorPage";
import { Props } from "../../types/types";
import "./errors.css";

export class Error404 extends ErrorPage {
    constructor(props: Props = {}) {
        const moreProps: Props = {
            "code": "404",
            "text": "Не туда попали"
        };

        super({ ...props, ...moreProps });
    }
}