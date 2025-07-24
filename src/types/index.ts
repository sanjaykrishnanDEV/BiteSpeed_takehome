import { Node, Edge } from '@xyflow/react';

// Node Data Types
export interface TextNodeData {
  text: string;
  [key: string]: unknown;
}

// Extended Node Types
export interface TextNode extends Node<TextNodeData> {
  type: 'textNode';
}

export interface FlowEdge extends Edge {
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

// Node Type Configuration
export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: string;
}

// Validation Result
export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}


// Notification State
export type NotificationType = 'error' | 'success' | null;

export interface NotificationState {
  type: NotificationType;
  message: string | null;
}

// Component Props
export interface TextNodeProps {
  data: TextNodeData;
  selected?: boolean;
}

export interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export interface SettingsPanelProps {
  selectedNode: TextNode | null;
  onNodeUpdate: (nodeId: string, newData: Partial<TextNodeData>) => void;
  onClose: () => void;
}

export interface HeaderProps {
  notification: NotificationState;
  onSave: () => void;
  onClearNotification: () => void;
}

// Flow Data
export interface FlowData {
  nodes: Array<{
    id: string;
    type: string | undefined;
    position: { x: number; y: number };
    data: TextNodeData;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
  }>;
} 