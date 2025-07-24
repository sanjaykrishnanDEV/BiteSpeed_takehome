# Flow Builder

A modern, extensible flow builder built with React and React Flow for creating message automation workflows.

## Features

### 🎯 Core Functionality

1. **Text Nodes**
   - Drag and drop message nodes from the nodes panel
   - Edit message content through the settings panel
   - Visual representation with WhatsApp-style icons
   - Support for multiple text nodes in a single flow

2. **Nodes Panel**
   - Extensible design for future node types
   - Drag and drop interface for adding nodes
   - Currently supports Message nodes (easily extensible)

3. **Connections & Edges**
   - Connect nodes with visual edges
   - Source handles (right side) - can only have one outgoing connection
   - Target handles (left side) - can have multiple incoming connections
   - Automatic validation of connection rules

4. **Settings Panel**
   - Replaces nodes panel when a node is selected
   - Text editing interface for message content
   - Back button to return to nodes panel
   - Real-time updates to node content

5. **Flow Validation**
   - Comprehensive validation before saving
   - Checks for disconnected nodes
   - Ensures proper flow connectivity
   - Prevents saving invalid flows

6. **Save Functionality**
   - Save button with validation
   - Error messages for invalid flows
   - Structured data export for backend integration

### 🎨 User Interface

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Selected states, hover effects, and transitions
- **Intuitive Navigation**: Clear visual hierarchy and user flow

### 🔧 Technical Features

- **Extensible Architecture**: Easy to add new node types
- **State Management**: Efficient React state handling
- **Performance Optimized**: Smooth interactions and updates
- **Keyboard Support**: Delete key for removing nodes
- **Drag & Drop**: Intuitive node placement and connection

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## Usage

### Creating a Flow

1. **Add Nodes**: Drag message nodes from the left panel to the canvas
2. **Connect Nodes**: Click and drag from the right handle (source) of one node to the left handle (target) of another
3. **Edit Content**: Click on any node to open the settings panel and edit the message text
4. **Save Flow**: Click the "Save Changes" button to validate and save your flow

### Node Management

- **Select**: Click on any node to select it
- **Move**: Drag nodes around the canvas
- **Delete**: Select a node and press the Delete key
- **Edit**: Click on a node to open the settings panel

### Validation Rules

The flow builder enforces the following rules:

1. **Single Source**: Each source handle can only have one outgoing connection
2. **Multiple Targets**: Target handles can accept multiple incoming connections
3. **Connected Flow**: All nodes must be connected in a single flow
4. **No Disconnected Nodes**: Every node must have at least one connection

## Architecture

### Component Structure

```
App.jsx
├── TextNode (Custom Node Component)
├── NodesPanel (Left Side Panel)
├── SettingsPanel (Right Side Panel)
└── ReactFlow (Main Canvas)
```

### State Management

- **Nodes**: Array of flow nodes with positions and data
- **Edges**: Array of connections between nodes
- **Selected Node**: Currently selected node for editing
- **Panel State**: Toggle between nodes panel and settings panel

### Extensibility

To add new node types:

1. Create a new node component
2. Add it to the `nodeTypes` object
3. Add it to the `availableNodeTypes` array in `NodesPanel`
4. Update the settings panel to handle the new node type

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Dependencies

- **@xyflow/react**: React Flow library for the canvas
- **React**: UI framework
- **Vite**: Build tool and dev server

## Future Enhancements

- [ ] Additional node types (Conditional, Delay, API calls)
- [ ] Flow templates and presets
- [ ] Export/import functionality
- [ ] Undo/redo functionality
- [ ] Collaborative editing
- [ ] Flow analytics and metrics
- [ ] Custom themes and styling
- [ ] Mobile responsive design improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
