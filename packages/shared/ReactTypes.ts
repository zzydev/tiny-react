export type Ref = { current: any } | ((instance: any) => void);
export type ElementType = any;
export type Key = string | null;
export type Props = {
	[key: string]: any;
	children?: any;
};

export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__mark: string;
}

export type Action<State> = State | ((previousState: State) => State);
