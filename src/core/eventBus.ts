export type Callback = (...args: any[]) => void;

export default class EventBus {
    private listeners: Record<string, Callback[]> = {};

    public on(event: string, callback: Callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: Callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback,
        );
    }

    public emit(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}