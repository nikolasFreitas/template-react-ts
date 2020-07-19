export type RequestObject<T> = { [k in keyof T ]: (...args: any[]) => Promise<any>};
