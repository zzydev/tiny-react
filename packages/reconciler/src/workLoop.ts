import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

//全局的指针指向当前正在工作的FiberNode
let workInProgress: FiberNode | null = null;

const prepareFreshStack = (fiber: FiberNode) => {
	workInProgress = fiber;
};

const renderRoot = (root: FiberNode) => {
	//初始化: 让wip指定第一个需要遍历的FiberNode
	prepareFreshStack(root);

	//执行递归流程,在浏览器有空闲时调用workLoop
	requestIdleCallback(workLoop);
};

const workLoop = (IdleDeadline: IdleDeadline) => {
	while (workInProgress !== null && IdleDeadline.timeRemaining() > 0) {
		performUnitOfWork(workInProgress);
	}
};

function performUnitOfWork(fiber: FiberNode) {
	// next 子fiber
	const next = beginWork(fiber);
	// 执行完beginWork后，pendingProps 变为 memoizedProps
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		const next = completeWork(node);

		if (next !== null) {
			workInProgress = next;
			return;
		}

		const sibling = node.sibling;
		if (sibling) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
