import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';
import { ElementType, Key, Props, Ref, ReactElement } from 'shared/ReactTypes';

const ReactElement = (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement => {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'zzydev'
	};
	if (Object.freeze) {
		Object.freeze(element.props);
		Object.freeze(element);
	}
	return element;
};

export const jsx = (type: ElementType, config: any, ...children: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};
	if (config != null) {
		if (hasValidRef(config)) {
			ref = config.ref;
		}
		// 此处将 key 值转换为字符串
		if (hasValidKey(config)) {
			key = '' + config.key;
		}
	}

	for (const prop in config) {
		if (
			Object.prototype.hasOwnProperty.call(config, prop) &&
			!Object.prototype.hasOwnProperty.call(RESERVED_PROPS, prop)
		) {
			props[prop] = config[prop];
		}
	}

	const childrenLen = children.length;
	if (childrenLen) {
		if (childrenLen === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};
	if (config != null) {
		if (hasValidRef(config)) {
			ref = config.ref;
		}
		// 此处将 key 值转换为字符串
		if (hasValidKey(config)) {
			key = '' + config.key;
		}
	}

	for (const prop in config) {
		if (
			Object.prototype.hasOwnProperty.call(config, prop) &&
			!Object.prototype.hasOwnProperty.call(RESERVED_PROPS, prop)
		) {
			props[prop] = config[prop];
		}
	}

	return ReactElement(type, key, ref, props);
};

function hasValidKey(config: any) {
	return config.key !== undefined;
}

function hasValidRef(config: any) {
	return config.ref !== undefined;
}

const RESERVED_PROPS: Record<string, boolean> = {
	key: true,
	ref: true
};
