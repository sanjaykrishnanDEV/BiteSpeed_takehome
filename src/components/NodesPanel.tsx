import React from 'react';
import { NodesPanelProps, NodeTypeConfig } from '../types';

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  const availableNodeTypes: NodeTypeConfig[] = [
    { type: 'textNode', label: 'Message', icon: '📱' }
  ];

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes</h3>
      </div>
      <div className="nodes-list">
        {availableNodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="node-item"
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.type)}
          >
            <span className="node-icon">{nodeType.icon}</span>
            <span className="node-label">{nodeType.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel; 