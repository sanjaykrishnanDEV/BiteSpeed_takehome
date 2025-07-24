import TextNode from '../components/TextNode';
import { NodeTypeConfig } from '../types';

export const nodeTypes = {
  textNode: TextNode,
  // Future nodes will be added here:
  // conditionalNode: ConditionalNode,
  // delayNode: DelayNode,
  // apiNode: ApiNode,
  // as per requiremnt
} as const;

export const availableNodeTypes: NodeTypeConfig[] = [
  { type: 'textNode', label: 'Message', icon: '📱' }
  // Future types will be added here:
  // { type: 'conditionalNode', label: 'Condition', icon: '��' },
  // { type: 'delayNode', label: 'Delay', icon: '⏱️' },
  // { type: 'apiNode', label: 'API Call', icon: '��' },
]; 