import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Canvas, 
  Circle, 
  Rect, 
  Text, 
  Line
} from 'fabric';

const TagDesigner = ({ onLogout, onPageChange }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [canvasWidth] = useState(800);
  const [canvasHeight] = useState(600);
  const [selectedTool, setSelectedTool] = useState('select');
  const [textValue, setTextValue] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [shapeColor, setShapeColor] = useState('#ff0000');
  const [lineWidth, setLineWidth] = useState(2);
  const [showRulers, setShowRulers] = useState(true);
  const [zoom, setZoom] = useState(100);

  // Handle selection callback
  const handleSelection = useCallback(() => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      if (activeObject.type === 'text') {
        setTextValue(activeObject.text || '');
        setFontSize(activeObject.fontSize || 16);
        setFontFamily(activeObject.fontFamily || 'Arial');
        setTextColor(activeObject.fill || '#000000');
      }
    }
  }, [canvas]);

  const handleSelectionCleared = useCallback(() => {
    setTextValue('');
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: '#ffffff'
      });
      setCanvas(fabricCanvas);

      // Add event listeners
      fabricCanvas.on('selection:created', handleSelection);
      fabricCanvas.on('selection:updated', handleSelection);
      fabricCanvas.on('selection:cleared', handleSelectionCleared);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvas, canvasWidth, canvasHeight, handleSelection, handleSelectionCleared]);

  // Add rulers function
  const addRulers = useCallback(() => {
    if (!canvas || !showRulers) return;

    // Clear existing rulers
    const objects = canvas.getObjects();
    const rulers = objects.filter(obj => obj.name === 'ruler');
    rulers.forEach(ruler => canvas.remove(ruler));

    // Add horizontal ruler
    for (let i = 0; i <= canvasWidth; i += 50) {
      const rulerLine = new Line([i, 0, i, 10], {
        stroke: '#ccc',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        name: 'ruler'
      });
      canvas.add(rulerLine);

      if (i > 0) {
        const rulerText = new Text(i.toString(), {
          left: i - 10,
          top: 15,
          fontSize: 10,
          fill: '#666',
          selectable: false,
          evented: false,
          name: 'ruler'
        });
        canvas.add(rulerText);
      }
    }

    // Add vertical ruler
    for (let i = 0; i <= canvasHeight; i += 50) {
      const rulerLine = new Line([0, i, 10, i], {
        stroke: '#ccc',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        name: 'ruler'
      });
      canvas.add(rulerLine);

      if (i > 0) {
        const rulerText = new Text(i.toString(), {
          left: 15,
          top: i - 10,
          fontSize: 10,
          fill: '#666',
          selectable: false,
          evented: false,
          name: 'ruler'
        });
        canvas.add(rulerText);
      }
    }

    canvas.renderAll();
  }, [canvas, showRulers, canvasWidth, canvasHeight]);

  // Update rulers when showRulers changes
  useEffect(() => {
    addRulers();
  }, [addRulers]);

  const addText = () => {
    if (!canvas) return;

    const text = new Text(textValue || 'Text', {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: textColor,
      selectable: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!canvas) return;

    const circle = new Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: shapeColor,
      selectable: true
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const addRectangle = () => {
    if (!canvas) return;

    const rect = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: shapeColor,
      selectable: true
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const addLine = () => {
    if (!canvas) return;

    const line = new Line([50, 50, 200, 200], {
      stroke: shapeColor,
      strokeWidth: lineWidth,
      selectable: true
    });

    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
  };

  const deleteSelected = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const clearCanvas = () => {
    if (!canvas) return;

    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    addRulers();
  };

  const exportImage = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    const link = document.createElement('a');
    link.download = 'tag-design.png';
    link.href = dataURL;
    link.click();
  };

  const handleZoom = (newZoom) => {
    if (!canvas) return;

    const zoomLevel = newZoom / 100;
    canvas.setZoom(zoomLevel);
    setZoom(newZoom);
  };

  const handleCanvasClick = useCallback((e) => {
    if (!canvas) return;

    const pointer = canvas.getPointer(e.e);
    
    if (selectedTool === 'text') {
      const text = new Text(textValue || 'Text', {
        left: pointer.x,
        top: pointer.y,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: textColor,
        selectable: true
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  }, [canvas, selectedTool, textValue, fontSize, fontFamily, textColor]);

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', handleCanvasClick);
      return () => {
        canvas.off('mouse:down', handleCanvasClick);
      };
    }
  }, [canvas, selectedTool, textValue, fontSize, fontFamily, textColor]);

  return (
    <div className="tag-designer">
      <div className="toolbar">
        <div className="tool-section">
          <h3>Navigation</h3>
          <button onClick={() => onPageChange('templates')}>
            Back to Templates
          </button>
          <button onClick={() => onPageChange('store-tags')}>
            Store Tags
          </button>
          <button onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="tool-section">
          <h3>Tools</h3>
          <button 
            className={selectedTool === 'select' ? 'active' : ''} 
            onClick={() => setSelectedTool('select')}
          >
            Select
          </button>
          <button 
            className={selectedTool === 'text' ? 'active' : ''} 
            onClick={() => setSelectedTool('text')}
          >
            Text
          </button>
          <button onClick={addCircle}>Circle</button>
          <button onClick={addRectangle}>Rectangle</button>
          <button onClick={addLine}>Line</button>
        </div>

        <div className="tool-section">
          <h3>Text Properties</h3>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Enter text..."
          />
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value) || 16)}
            placeholder="Font size"
          />
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <button onClick={addText}>Add Text</button>
        </div>

        <div className="tool-section">
          <h3>Shape Properties</h3>
          <input
            type="color"
            value={shapeColor}
            onChange={(e) => setShapeColor(e.target.value)}
          />
          <input
            type="number"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value) || 2)}
            placeholder="Line width"
          />
        </div>

        <div className="tool-section">
          <h3>Canvas</h3>
          <label>
            <input
              type="checkbox"
              checked={showRulers}
              onChange={(e) => setShowRulers(e.target.checked)}
            />
            Show Rulers
          </label>
          <input
            type="range"
            min="25"
            max="200"
            value={zoom}
            onChange={(e) => handleZoom(parseInt(e.target.value))}
          />
          <span>{zoom}%</span>
        </div>

        <div className="tool-section">
          <h3>Actions</h3>
          <button onClick={deleteSelected}>Delete Selected</button>
          <button onClick={clearCanvas}>Clear Canvas</button>
          <button onClick={exportImage}>Export Image</button>
        </div>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default TagDesigner; 