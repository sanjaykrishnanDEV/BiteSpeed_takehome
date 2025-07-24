import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { ValidationResult } from '../types';

const useFlowValidation = () => {
  const validateFlow = useCallback((nodes: Node[], edges: Edge[]): ValidationResult => {
    if (nodes.length === 0) {
      return { isValid: false, error: 'Please add at least one node to the flow.' };
    }

    if (nodes.length === 1) {
      return { isValid: true, error: null };
    }

    // Check if any node has empty target handles (no incoming edges)
    const nodesWithEmptyTargets = nodes.filter(node => {
      const hasIncomingEdges = edges.some(edge => edge.target === node.id);
      return !hasIncomingEdges;
    });

    if (nodesWithEmptyTargets.length > 1) {
      return {
        isValid: false,
        error: 'Multiple nodes have empty target handles. Please connect all nodes properly.'
      };
    }

    // Check for disconnected nodes (nodes with no connections at all)
    const disconnectedNodes = nodes.filter(node => {
      const hasIncomingEdges = edges.some(edge => edge.target === node.id);
      const hasOutgoingEdges = edges.some(edge => edge.source === node.id);
      return !hasIncomingEdges && !hasOutgoingEdges;
    });

    if (disconnectedNodes.length > 0) {
      return {
        isValid: false,
        error: 'Some nodes are not connected. Please connect all nodes in the flow.'
      };
    }

    return { isValid: true, error: null };
  }, []);

  return { validateFlow };
};

export default useFlowValidation; 