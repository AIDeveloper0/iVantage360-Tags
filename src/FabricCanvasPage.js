import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Line } from 'fabric';

const FabricCanvasPage = ({ onLogout, onPageChange }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const [activeTab, setActiveTab] = useState('editor');
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showOrientationPopup, setShowOrientationPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('Portrait');
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);
  const [isPopupMaximized, setIsPopupMaximized] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('basic');


  // Template options for New dropdown
  const templateOptions = [
    '1UP',
    '1UP (LEGAL)',
    '2UP',
    '4UP',
    '4UP(4.25 X 5.1)',
    '8UP',
    '16UP',
    '16UP',
    'Avery 5160',
    'Avery 5163',
    'Two Page',
    'Full Page'
  ];

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        selection: true,
        preserveObjectStacking: true,
      });

      const gridSize = 20;
      const gridColor = '#e0e0e0';
      
      for (let i = 0; i <= fabricCanvasRef.current.width; i += gridSize) {
        const line = new Line([i, 0, i, fabricCanvasRef.current.height], {
          stroke: gridColor,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(line);
      }
      
      for (let i = 0; i <= fabricCanvasRef.current.height; i += gridSize) {
        const line = new Line([0, i, fabricCanvasRef.current.width, i], {
          stroke: gridColor,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(line);
      }

      fabricCanvasRef.current.renderAll();
    }

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            e.preventDefault();
            handleCopy();
            break;
          case 'x':
            e.preventDefault();
            handleCut();
            break;
          case 'v':
            e.preventDefault();
            handlePaste();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'p':
            e.preventDefault();
            handlePrint();
            break;
          default:
            break;
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNewDropdown && !event.target.closest('.dropdown-container')) {
        setShowNewDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNewDropdown]);





  const handleCopy = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.getActiveObject().clone((cloned) => {
        fabricCanvasRef.current.clipboard = cloned;
      });
    }
  };

  const handleCut = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.getActiveObject().clone((cloned) => {
        fabricCanvasRef.current.clipboard = cloned;
        fabricCanvasRef.current.remove(fabricCanvasRef.current.getActiveObject());
      fabricCanvasRef.current.renderAll();
      });
    }
  };

  const handlePaste = () => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.clipboard) {
      fabricCanvasRef.current.clipboard.clone((clonedObj) => {
        fabricCanvasRef.current.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        fabricCanvasRef.current.add(clonedObj);
        fabricCanvasRef.current.setActiveObject(clonedObj);
        fabricCanvasRef.current.renderAll();
      });
    }
  };

  const handleDelete = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.remove(fabricCanvasRef.current.getActiveObject());
      fabricCanvasRef.current.renderAll();
    }
  };

  const handleSave = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      const link = document.createElement('a');
      link.download = 'canvas-export.png';
      link.href = dataURL;
      link.click();
    }
  };

  const handlePrint = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head><title>Print Canvas</title></head>
          <body>
            <img src="${dataURL}" style="width: 100%; height: auto;" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleNewTemplateSelect = (templateType) => {
    console.log('Creating new template:', templateType);
    setSelectedTemplate(templateType);
    setShowNewDropdown(false);
    setShowOrientationPopup(true);
    setSelectedOrientation('Portrait');
    setIsPopupMinimized(false);
    console.log('Template selected:', templateType, 'Orientation set to Portrait');
  };

  const handleTabClick = (tab) => {
    if (tab === 'logout') {
      onLogout();
      return;
    }
    if (tab === 'store') {
      onPageChange('store-tags');
      return;
    }
    if (tab === 'list') {
      onPageChange('list');
      return;
    }
    if (tab === 'new') {
      setShowNewDropdown(!showNewDropdown);
      setActiveTab('new');
      return;
    }
    if (tab === 'editor') {
      setActiveTab('editor');
      setShowNewDropdown(false);
      return;
    }
    setActiveTab(tab);
    setShowNewDropdown(false);
  };

  return (
    <div className="h-screen flex flex-col font-system">
       {/* Main Title Bar - Orange */}
      <div className="bg-orange-500 text-black px-6 py-3 flex items-center gap-3">
        <i className="fas fa-copy text-2xl"></i>
        <h2 className="text-2xl font-semibold">Tag Designer: New</h2>
      </div>

      {/* Main layout */}
      <div className="flex h-[calc(100vh-84px)]">
        {/* Left Sidebar - Same as other pages */}
        <div className="w-[80px] bg-orange-primary flex flex-col justify-between p-0 shadow-lg flex-shrink-0 h-full">
          {/* Top section buttons */}
          <div className="flex flex-col">
            <div
              className={`dropdown-container flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 relative hover:bg-white hover:bg-opacity-10 ${activeTab === 'new' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowNewDropdown(!showNewDropdown);
                setActiveTab('new');
              }}
            >
              <i className="fas fa-file-plus text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>New</span>
              <i className={`fas fa-chevron-${showNewDropdown ? 'up' : 'down'} absolute bottom-2 right-2 text-xs opacity-80 transition-transform duration-200 drop-shadow-sm`}></i>
              
              {/* Dropdown menu */}
              {showNewDropdown && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-32 max-w-36">
                  {templateOptions.map((option, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewTemplateSelect(option);
                      }}
                    >
                      <i className="fas fa-file-medical text-black text-lg"></i>
                      <span className="text-xs font-medium">{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div
              className={`flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10 ${activeTab === 'list' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleTabClick('list')}
            >
              <i className="fas fa-list text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>List</span>
            </div>
            
            <div
              className={`flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10 ${activeTab === 'store' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleTabClick('store')}
            >
              <i className="fas fa-tags text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Store Tags</span>
            </div>
            
            <div
              className={`flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10 ${activeTab === 'editor' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleTabClick('editor')}
            >
              <i className="fas fa-pencil-alt text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Editor</span>
            </div>
          </div>
          
          {/* Bottom section buttons */}
          <div className="flex flex-col mt-auto">
            <div className="flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10">
              <i className="fas fa-chart-line text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>View Log</span>
            </div>
            <div
              className="flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10"
              onClick={() => handleTabClick('logout')}
            >
              <i className="fas fa-sign-out-alt text-lg mb-1 opacity-90 drop-shadow-sm"></i>
              <span className="text-xs font-medium leading-tight opacity-95 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Logout</span>
            </div>
          </div>
        </div>

                                   {/* Central Workspace */}
         <div className="flex-1 flex bg-white">
                       {/* Canvas Area with Grid and Rulers */}
            <div className="flex-1 flex flex-col">
              {/* Top Toolbar - Horizontal */}
              <div className="h-24 bg-white border-b border-gray-200 flex items-center justify-center px-8 gap-8 py-4">
                {/* Copy Button - Disabled */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-not-allowed">
                    <i className="fas fa-copy text-gray-500 text-xs"></i>
                  </button>
                  <span className="text-xs text-gray-500">copy</span>
                </div>
      
                {/* Cut Button - Disabled */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-not-allowed">
                    <i className="fas fa-cut text-gray-500 text-xs"></i>
                  </button>
                  <span className="text-xs text-gray-500">cut</span>
                </div>
      
                {/* Paste Button - Active */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                    <i className="fas fa-clipboard text-white text-xs"></i>
                  </button>
                  <span className="text-xs text-black font-medium">paste</span>
                </div>
      
                {/* Delete Button - Disabled */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-not-allowed">
                    <i className="fas fa-trash text-gray-500 text-xs"></i>
                  </button>
                  <span className="text-xs text-gray-500">delete</span>
                </div>
      
                {/* Save Button - Active */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                    <span className="text-white text-sm font-bold">A</span>
                  </button>
                  <span className="text-xs text-black font-medium">Save</span>
                </div>
      
                {/* Print Button - Active */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                    <i className="fas fa-file-pdf text-white text-xs"></i>
                  </button>
                  <span className="text-xs text-black font-medium">Print</span>
                </div>
      
                {/* Calculations Button - Active */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                    <i className="fas fa-calculator text-white text-xs"></i>
                  </button>
                  <span className="text-xs text-black font-medium">Calculations</span>
                </div>
      
                {/* Close Button - Active */}
                <div className="flex flex-col items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                    <i className="fas fa-times text-white text-xs"></i>
                  </button>
                  <span className="text-xs text-black font-medium">Close</span>
            </div>
          </div>

              {/* Canvas Area with Grid and Rulers */}
            <div className="flex-1 flex">
                                                                                                                                                                                                                                                                               {/* Left Toolbar - Vertical */}
                    <div className="w-32 bg-white border-r border-gray-200 flex flex-col items-center py-2 gap-2 px-12">
                   

              {/* Text Tool */}
                   <div className="flex flex-col items-center">
                     <button className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center">
                       <span className="text-black text-xl font-bold">T</span>
              </button>
                   </div>
                   
                   {/* Document with Pencil Tool */}
                   <div className="flex flex-col items-center">
                     <button className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center">
                       <i className="fas fa-file-alt text-black text-xl"></i>
              </button>
                   </div>

              {/* Image Tool */}
                   <div className="flex flex-col items-center">
                     <button className="w-10 h-10 rounded-full bg-gray-200 shadow-md flex items-center justify-center">
                       <i className="fas fa-mountain text-black text-xl"></i>
              </button>
                   </div>

              {/* Pencil Tool */}
                    <div className="flex flex-col items-center">
                      <button className="w-10 h-10 rounded bg-gray-200 shadow-md flex items-center justify-center">
                        <i className="fas fa-pencil-alt text-black text-xl"></i>
              </button>
                    </div>

              {/* Line Tool */}
                    <div className="flex flex-col items-center">
                      <button className="w-10 h-10 rounded bg-gray-200 shadow-md flex items-center justify-center">
                        <div className="w-8 h-1.5 bg-black transform rotate-45"></div>
              </button>
                    </div>

              {/* Stroke Color */}
                   <div className="flex flex-col items-center">
                     <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-300">
                       <div className="w-8 h-8 rounded-full bg-red-500"></div>
                     </button>
                     <span className="text-xs text-black font-medium mt-1">stroke</span>
              </div>

              {/* Fill Color */}
                   <div className="flex flex-col items-center">
                     <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-300">
                       <div className="w-8 h-8 rounded-full bg-red-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-6 h-0.5 bg-white transform rotate-45"></div>
                </div>
                       </div>
                     </button>
                     <span className="text-xs text-black font-medium mt-1">fill</span>
              </div>

                                       {/* Small Black Dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded bg-gray-200 shadow-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                      </div>
                    </div>

              {/* Star Tool */}
                    <div className="flex flex-col items-center">
                      <button className="w-10 h-10 rounded bg-gray-200 shadow-md flex items-center justify-center">
                        <i className="fas fa-star text-black text-xl"></i>
              </button>
                    </div>
            </div>

            {/* Canvas Area */}
                    <div className="flex-1 flex flex-col">
                      {/* Canvas with Grid */}
                      <div className="flex-1 bg-white relative flex items-center justify-center p-8">
              <div className="relative">
                          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <canvas
                  ref={canvasRef}
                            className="border border-gray-200"
                />
              </div>
            </div>
          </div>
               </div>
             </div>

                                                                                                               {/* Gallery Panel - Split into two sections */}
                <div className="w-96 bg-white border-l border-gray-200 flex mt-24 ml-16 transition-all duration-300">
                                   {/* Left Section - Categories - Hidden when expanded */}
                   {!galleryExpanded && (
                     <div className="w-40 bg-gray-50 border-r border-gray-200 flex flex-col">
                       <h3 className="text-lg font-semibold text-black p-4 pb-2">Gallery</h3>
                       
                                          {/* Categories */}
                       <div className="flex flex-col gap-1 px-4 mb-4">
                         <div 
                           className={`px-3 py-2 rounded font-medium cursor-pointer ${activeCategory === 'basic' ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                           onClick={() => setActiveCategory('basic')}
                         >
                           Basic
                         </div>
                         <div 
                           className={`px-3 py-2 rounded font-medium cursor-pointer ${activeCategory === 'arrow' ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                           onClick={() => setActiveCategory('arrow')}
                         >
                           Arrow
                         </div>
                         
                       </div>
                     
                       {/* Close button at bottom */}
                       <div className="mt-auto p-4">
                         <i className="fas fa-times text-gray-500 cursor-pointer"></i>
                       </div>
                     </div>
                   )}

                 {/* Right Section - Symbols Grid */}
                 <div className={`${galleryExpanded ? 'w-full' : 'flex-1'} flex flex-col h-full`}>
                   {/* Scrollable Shapes Grid */}
                   <div className="flex-1 overflow-y-auto p-4 h-full">
                     {!galleryExpanded ? (
                       <div className="grid grid-cols-2 gap-3">
                         {activeCategory === 'basic' ? (
                           <>
                             {/* Row 1 - Basic Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-10 bg-cyan-400 rounded-full"></div>
                               <span className="text-xs text-black mt-1 text-center">Ellipse</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-10 bg-cyan-400 rounded-lg"></div>
                               <span className="text-xs text-black mt-1 text-center">Rounded Rectangle</span>
                             </div>
                             
                             {/* Row 2 - Basic Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-10 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Right Triangle</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-10 bg-cyan-400 rounded"></div>
                               <span className="text-xs text-black mt-1 text-center">Rectangle</span>
                             </div>
                             
                             {/* Row 3 - Basic Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-12 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Pentagon</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-12 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Heptagon</span>
                             </div>
                             
                             {/* Row 4 - Basic Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-12 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Octagon</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-10 h-10 bg-cyan-400 rounded relative">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-8 h-0.5 bg-white"></div>
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-0.5 h-8 bg-white"></div>
                                 </div>
                               </div>
                               <span className="text-xs text-black mt-1 text-center">Cross</span>
                             </div>
                             
                             {/* Row 5 - Basic Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-12 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Star 5</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-12 h-12 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Star 6</span>
                             </div>
                           </>
                         ) : activeCategory === 'arrow' ? (
                           <>
                             {/* Row 1 - Arrow Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 1</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 2</span>
                             </div>
                             
                             {/* Row 2 - Arrow Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 4</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 5</span>
                             </div>
                             
                             {/* Row 3 - Arrow Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl" style={{ transform: 'scaleX(-1)' }}></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 7</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-4xl" style={{ transform: 'scaleX(-1)' }}></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 8</span>
                             </div>
                             
                             {/* Row 4 - Arrow Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrows-alt-h text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Double Arrow 2</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrows-alt-h text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Double Arrow 3</span>
                             </div>
                             
                             {/* Row 5 - Additional Arrow Shapes */}
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-up text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Up Arrow</span>
                             </div>
                             <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-down text-cyan-400 text-4xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Down Arrow</span>
                             </div>
                           </>
                         ) : null}
                       </div>
                     ) : (
                       <div className="grid grid-cols-3 gap-4">
                         {activeCategory === 'basic' ? (
                           <>
                             {/* Row 1 - Extended Basic Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded-full"></div>
                               <span className="text-xs text-black mt-1 text-center">Ellipse</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded-lg"></div>
                               <span className="text-xs text-black mt-1 text-center">Rounded Rectangle</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded-full" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Cloud</span>
                             </div>
                             
                             {/* Row 2 - Extended Basic Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Right Triangle</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded"></div>
                               <span className="text-xs text-black mt-1 text-center">Rectangle</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-14 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Triangle</span>
                             </div>
                             
                             {/* Row 3 - Extended Basic Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-16 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Pentagon</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-16 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Heptagon</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-16 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Hexagon</span>
                             </div>
                             
                             {/* Row 4 - Extended Basic Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-16 h-16 bg-cyan-400 rounded" style={{ clipPath: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)' }}></div>
                               <span className="text-xs text-black mt-1 text-center">Octagon</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-14 h-14 bg-cyan-400 rounded relative">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-12 h-0.5 bg-white"></div>
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-0.5 h-12 bg-white"></div>
                                 </div>
                               </div>
                               <span className="text-xs text-black mt-1 text-center">Cross</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <div className="w-14 h-14 bg-cyan-400 rounded relative">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-12 h-0.5 bg-white"></div>
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-0.5 h-12 bg-white"></div>
                                 </div>
                               </div>
                               <span className="text-xs text-black mt-1 text-center">Cross 2</span>
                             </div>
                           </>
                         ) : activeCategory === 'arrow' ? (
                           <>
                             {/* Row 1 - Extended Arrow Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 1</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 2</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 4</span>
                             </div>
                             
                             {/* Row 2 - Extended Arrow Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 5</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl" style={{ transform: 'scaleX(-1)' }}></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 7</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-left text-cyan-400 text-5xl" style={{ transform: 'scaleX(-1)' }}></i>
                               <span className="text-xs text-black mt-1 text-center">Arrow 8</span>
                             </div>
                             
                             {/* Row 3 - Extended Arrow Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrows-alt-h text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Double Arrow 2</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrows-alt-h text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Double Arrow 3</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-up text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Up Arrow</span>
                             </div>
                             
                             {/* Row 4 - Extended Arrow Shapes */}
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-down text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Down Arrow</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-arrow-right text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Right Arrow</span>
                             </div>
                             <div className="w-28 h-28 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-200">
                               <i className="fas fa-long-arrow-alt-left text-cyan-400 text-5xl"></i>
                               <span className="text-xs text-black mt-1 text-center">Long Arrow</span>
                             </div>
                           </>
                         ) : null}
                       </div>
                     )}
                   </div>
                   
                   {/* Bottom Navigation */}
                   <div className="p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                     <div className="flex items-center">
                       <i 
                         className={`fas fa-chevron-${galleryExpanded ? 'right' : 'left'} cursor-pointer mr-2`}
                         onClick={() => {
                           setGalleryExpanded(!galleryExpanded);
                         }}
                       ></i>
                       <span>View Galleries</span>
                     </div>
                     {galleryExpanded ? (
                       <i className="fas fa-chevron-right cursor-pointer"></i>
                     ) : null}
                   </div>
                 </div>
               </div>

                                                                       
        </div>
      </div>

      {/* Orientation Popup */}
      {showOrientationPopup && !isPopupMinimized && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000]">
          <div 
            className={`${isPopupMaximized ? 'w-full h-full' : 'w-[270px] h-[300px]'} flex flex-col transition-all duration-200`}
            style={{
              backgroundColor: 'rgba(240, 240, 240, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.8px solid #59f9ff',
              borderRadius: '0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
              fontSize: '12px'
            }}
          >
            {/* Popup Header */}
            <div 
              className="px-2 py-2 flex items-center justify-between text-sm text-black h-[35px] bg-transparent font-normal"
              style={{ paddingLeft: '9px' }}
            >
              <span>Select Page Orientation</span>
              <div className="flex gap-0">
                <button 
                  className="bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-gray-300"
                  style={{ fontFamily: 'Segoe UI, sans-serif' }}
                  onClick={() => {
                    setIsPopupMinimized(true);
                    setIsPopupMaximized(false);
                  }}
                >−</button>
                <button 
                  className="bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-gray-300"
                  style={{ fontFamily: 'Segoe UI, sans-serif' }}
                  onClick={() => setIsPopupMaximized(!isPopupMaximized)}
                >{isPopupMaximized ? '🗗' : '□'}</button>
                <button 
                  className="bg-transparent border-none w-[35px] h-[35px] cursor-pointer text-xl text-black flex items-center justify-center font-bold transition-colors duration-200 hover:bg-red-500 hover:text-white"
                  style={{ fontFamily: 'Segoe UI, sans-serif' }}
                  onClick={() => {
                    setShowOrientationPopup(false);
                    setSelectedOrientation('Portrait');
                    setIsPopupMaximized(false);
                    setIsPopupMinimized(false);
                  }}
                >×</button>
              </div>
            </div>
            
            {/* Popup Content */}
            <div 
              className="flex-1 flex flex-col bg-transparent"
              style={isPopupMaximized ? {
                position: 'relative',
                height: '100%',
                backgroundColor: 'transparent'
              } : {}}
            >
              {/* Orientation Section (centered) */}
              <div 
                className="flex-1 flex flex-col justify-center items-center"
                style={{ padding: '30px 20px 20px 20px' }}
              >
                <div 
                  className="flex justify-center gap-12"
                  style={{ marginBottom: '-20px' }}
                >
                  {/* Portrait Option */}
                  <div 
                    className="flex flex-col items-center cursor-pointer transition-all duration-200"
                    style={{ padding: '5px' }}
                    onClick={() => setSelectedOrientation('Portrait')}
                  >
                    <div 
                      className="flex items-center justify-center mb-3 border-none relative text-white transition-all duration-200"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: selectedOrientation === 'Portrait' ? '#20a8d8' : '#9e9e9e',
                        fontSize: '24px'
                      }}
                    >
                      <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i>
                    </div>
                    <span 
                      className="text-gray-800"
                      style={{ 
                        fontSize: '17px', 
                        fontWeight: 'normal',
                        fontFamily: 'Segoe UI, sans-serif'
                      }} 
                    >Portrait</span>
                  </div>
                  
                  {/* Landscape Option */}
                  <div 
                    className="flex flex-col items-center cursor-pointer transition-all duration-200"
                    style={{ padding: '5px' }}
                    onClick={() => setSelectedOrientation('Landscape')}
                  >
                    <div 
                      className="flex items-center justify-center mb-3 border-none relative text-white transition-all duration-200"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: selectedOrientation === 'Landscape' ? '#20a8d8' : '#9e9e9e',
                        fontSize: '24px'
                      }}
                    >
                      <i className="fas fa-bars"></i>
                    </div>
                    <span 
                      className="text-gray-800"
                      style={{ 
                        fontSize: '17px', 
                        fontWeight: 'normal',
                        fontFamily: 'Segoe UI, sans-serif'
                      }} 
                    >Landscape</span>
                  </div>
                </div>
              </div>
              
              {/* Continue Section (bottom) */}
              <div 
                className="text-center bg-transparent"
                style={{ 
                  padding: '15px 20px 20px 20px',
                  borderTop: 'none' 
                }}
              >
                <button 
                  className="border-none cursor-pointer text-gray-800 transition-all duration-200 hover:bg-gray-300"
                  style={{
                    backgroundColor: '#dbdbdb',
                    padding: '15px 17px',
                    marginBottom: '-20px',
                    fontSize: '13px',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: 'normal'
                  }}
                  onClick={() => {
                    console.log('Creating template:', selectedTemplate, selectedOrientation);
                    setShowOrientationPopup(false);
                    
                    // Since we're already on the Fabric Canvas page, just close the popup
                    console.log('Continue clicked. Template:', selectedTemplate, 'Orientation:', selectedOrientation);
                    console.log('Template created successfully with orientation:', selectedOrientation);
                    
                    // Here you can add any additional logic for template creation
                    // For now, we just close the popup and stay on the current page
                  }}
                >Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Popup Tab */}
      {showOrientationPopup && isPopupMinimized && (
        <div 
          className="fixed bottom-2 left-[85px] px-3 py-1 cursor-pointer text-xs text-gray-800 z-[1500] rounded-t shadow-lg transition-all duration-200"
          style={{
            background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
            border: '1px solid #999',
            borderBottom: 'none',
            fontFamily: 'Segoe UI, sans-serif'
          }}
          onClick={() => setIsPopupMinimized(false)}
        >
          <span className="whitespace-nowrap">Select Page Orientation</span>
        </div>
      )}
    </div>
  );
};

export default FabricCanvasPage; 