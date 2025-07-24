import React from 'react';
import { SettingsPanelProps } from '../types';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedNode, onNodeUpdate, onClose }) => {
  if (!selectedNode) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNodeUpdate(selectedNode.id, { text: e.target.value });
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onClose}>
          ←
        </button>
        <h3>Message</h3>
      </div>
      <div className="settings-content">
        <div className="setting-group">
          <label>Text</label>
          <textarea
            value={selectedNode.data.text || ''}
            onChange={handleTextChange}
            placeholder="Enter your message..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 