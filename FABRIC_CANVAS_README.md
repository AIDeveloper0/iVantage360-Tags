# Fabric.js Canvas Feature

## Overview
This feature adds a new drawing canvas page that appears when you select "New" → "1UP" → "Portrait" from the Templates page. The canvas is built using Fabric.js and provides a complete drawing interface similar to professional design software.

## How to Access
1. Login to the application
2. Click on "New" in the left sidebar
3. Select "1UP" from the dropdown menu
4. Choose "Portrait" orientation
5. Click "Continue"

## Features

### Top Toolbar
- **Copy**: Copy selected objects (Ctrl+C)
- **Cut**: Cut selected objects (Ctrl+X)
- **Paste**: Paste objects (Ctrl+V)
- **Delete**: Delete selected objects (Delete/Backspace)
- **Save**: Save canvas as PNG image (Ctrl+S)
- **Print**: Print the canvas (Ctrl+P)
- **Calculations**: Open calculations panel
- **Close**: Return to Templates page

### Left Toolbar
- **Select Tool**: Select and manipulate objects
- **Text Tool**: Add text to canvas
- **Pen Tool**: Freehand drawing
- **Image Tool**: Insert images
- **Pencil Tool**: Pencil drawing
- **Line Tool**: Draw straight lines
- **Stroke Color**: Set stroke color (click to change)
- **Fill Color**: Set fill color (click to change)
- **Rectangle Tool**: Draw rectangles
- **Star Tool**: Draw star shapes

### Right Panel - Gallery
- **Basic Shapes**: Ellipse, Rounded Rectangle, Right Triangle, Rectangle, Pentagon, Heptagon, Octagon, Cross
- **Arrow Category**: Additional arrow shapes (expandable)
- **Shape Preview**: Click any shape to add it to the canvas

### Canvas Features
- **Grid**: Visual grid for alignment
- **Rulers**: Horizontal and vertical rulers with measurements
- **Selection**: Click and drag to select objects
- **Resize**: Drag corners to resize objects
- **Rotate**: Drag rotation handle to rotate objects
- **Move**: Drag objects to move them

## Keyboard Shortcuts
- **Ctrl+C**: Copy
- **Ctrl+X**: Cut
- **Ctrl+V**: Paste
- **Ctrl+S**: Save
- **Ctrl+P**: Print
- **Delete/Backspace**: Delete selected objects

## Technical Details
- Built with Fabric.js 6.7.1
- React 19.1.1
- Tailwind CSS for styling
- Font Awesome for icons
- Responsive design
- Canvas size: 800x500 pixels

## File Structure
- `src/FabricCanvasPage.js`: Main canvas component
- `src/App.js`: Updated to include canvas routing
- `src/TemplatesPage.js`: Updated to navigate to canvas

## Dependencies
- fabric: ^6.7.1
- react: ^19.1.1
- react-dom: ^19.1.1
- Font Awesome 6.4.0 (CDN)

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements
- More shape types
- Layer management
- Undo/Redo functionality
- Export to different formats
- Custom brushes
- Image import functionality
- Text formatting options
- Advanced color picker
- Snap to grid
- Alignment tools 