import React, { useState, useCallback, useEffect } from 'react';
import { ReactFlow, addEdge, useNodesState, useEdgesState, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

// Components
import Header from './components/Header';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';

// Hooks and Utils
import useFlowValidation from './hooks/useFlowValidation';
import { nodeTypes } from './utils/nodeTypes';

// Types
import { TextNode, TextNodeData, FlowData, NotificationState } from './types';

// Main App Component
const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<TextNode | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({
    type: null,
    message: null
  });

  // Use custom hook for validation
  const { validateFlow } = useFlowValidation();

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.id); 
    setSelectedNode(node as TextNode);
    setShowSettings(true);
  }, []);

  // Handle node deletion - currently not used since not in requirement 
  const onNodesDelete = useCallback((deletedNodes: Node[]) => {
    // Clear selection if deleted node was selected
    const deletedNodeIds = deletedNodes.map(node => node.id);
    if (selectedNode && deletedNodeIds.includes(selectedNode.id)) {
      setSelectedNode(null);
      setShowSettings(false);
    }
  }, [selectedNode]);

  // Handle node updates
  const onNodeUpdate = useCallback((nodeId: string, newData: Partial<TextNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Keep selectedNode in sync with nodes
  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedNode && JSON.stringify(updatedNode.data) !== JSON.stringify(selectedNode.data)) {
        setSelectedNode(updatedNode as TextNode);
      }
    }
  }, [nodes, selectedNode]);

  // Handle drag start for adding new nodes
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  // Handle drop to add new nodes
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData('application/reactflow');

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: TextNode = {
        id: `${type}-${Date.now()}`,
        type: 'textNode',
        position,
        data: { text: '' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Handle drag over
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle connections
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle save
  const handleSave = useCallback(() => {
    const validation = validateFlow(nodes, edges);
    if (!validation.isValid) {
      setNotification({
        type: 'error',
        message: validation.error
      });
      return;
    }
    
    // Clear any existing notifications
    setNotification({
      type: null,
      message: null
    });
    
    // Here you would typically save to backend
    const flowData: FlowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data as TextNodeData
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }))
    };
    
    console.log('Flow saved:', flowData);
    setNotification({
      type: 'success',
      message: 'Flow saved successfully!'
    });
  }, [nodes, edges, validateFlow]);

  // Close settings panel
  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="flow-builder">
      <Header 
        notification={notification} 
        onSave={handleSave} 
        onClearNotification={() => setNotification({ type: null, message: null })} 
      />
      
      <div className="main-content">
        <div className="flow-area">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onNodesDelete={onNodesDelete}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="react-flow"
            deleteKeyCode={['Delete', 'Backspace']} 
          />
        </div>
        
        <div className="side-panel">
          {showSettings ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onNodeUpdate={onNodeUpdate}
              onClose={closeSettings}
            />
          ) : (
            <NodesPanel onDragStart={onDragStart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 