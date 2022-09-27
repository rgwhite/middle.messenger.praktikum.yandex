import Block from "../core/block";

export type Props = {
    [prop: string]: any,
    events?: Record<string, (...args: any[]) => void>
};
export type Childs = Record<string, Block>;