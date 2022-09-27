import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import EventBus from "./eventBus";
import { Props, Childs } from "../types/types";

export default abstract class Block<P = Props> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id: string = nanoid(6);
    
    protected props: Props;
    protected children: Childs;
    
    private _meta: Props;
    private _element!: HTMLElement; 
    private eventBus: () => EventBus;

    constructor(propsAndChildren: P = {} as P) {
        this._meta = propsAndChildren as Props;
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        const { children, props } = this._getChildren(this._meta);
        this.children = children;  
        this.props = this._makePropsProxy(props);

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildren(propsAndChildren: Props) {
        const children: Childs = {}; 
        const props: Props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    public init() {
        this._createResources();
        this.dispatchComponentDidMount();
    }

    private _createResources() {
        this._element = this._createDocumentElement();
    }

    private _createDocumentElement(tag: string = "div"): HTMLElement {
        const tagName = this.props.tagName || tag;
        return document.createElement(tagName);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: Props, newProps: Props) : boolean {
        for (const key of Object.keys(newProps)) {
            if (newProps[key] !== oldProps[key]) {
                return true;
            }
        }
        return false;
    }   

    setProps = (newProps: any) => {
        if (!newProps) {
            return;
        }
        const oldProps = { ...this.props };
        Object.assign(this.props, newProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
    };

    public get element(): HTMLElement | null {
        return this._element;
    }

    private _render() {
        const fragment = this._compile();
        const newElement = fragment.firstElementChild as HTMLElement;

        this._removeEvents();
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected render(): string {
        return "";
    }

    private _compile() {
        const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
        const props = { ...this.props };
    
        const template = Handlebars.compile(this.render());

        Object.entries(this.children).forEach(([key, child]) => {
            props[key] = `<div data-id="id-${child.id}"></div>`;
        });
        fragment.innerHTML = template(props);

        Object.entries(this.children).forEach(([, child]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

            if (!stub) {
                return;
            }

            stub.replaceWith(child.getContent());
        });
        return fragment.content;
    }

    public getContent(): HTMLElement {
        return this._element;
    }

    public getMeta(): Props {
        return this._meta;
    }

    private _makePropsProxy(props: Props) {
        const self = this;

        return new Proxy(props, {
            get(target: Props, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },

            set(target: Props, prop: string, value: any) {
                const oldProps = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }

    private _addEvents() {
        this.addEvents();

        const events: Record<string, () => void> = (this.props as any).events;
        if (!events || !this._element) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener, true);
        });
    }

    protected addEvents() {}

    private _removeEvents() {
        this.removeEvents();

        const events: Record<string, () => void> = (this.props as any).events;
        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    protected removeEvents() {}  

    public show() {
        this._element.style.display = "block";
    }
    
    public hide() {
        this._element.style.display = "none";
    }
}