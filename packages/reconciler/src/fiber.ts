import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	ref: Ref;
	stateNode: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: Flags;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		// 对于HostComponent来说 <div> 指的是 div这个DOM
		this.stateNode = null;
		// 对于FunctionComponent 指的是这个函数本身 ()=> {}
		// 对于ClassComponent 指的是这个类
		// 对于HostComponent 指的是 tagName
		this.type = null;

		// 树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		// ul>li*3
		this.index = 0;

		this.ref = null;

		// 工作单元
		//pendingProps 刚开始工作之前的props
		this.pendingProps = pendingProps;
		// 当工作完以后pendingProps的值保存在 memoizedProps
		this.memoizedProps = null;
		// 副作用
		this.flags = NoFlags;
	}
}
