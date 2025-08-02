import React, { useState, useEffect } from 'react';

const StoreTagsPage = ({ onLogout, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('store');
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showOrientationPopup, setShowOrientationPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('Portrait');
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);
  const [isPopupMaximized, setIsPopupMaximized] = useState(false);
  const [showSelFilter, setShowSelFilter] = useState(false);
  const [selFilterConditions, setSelFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedSelItems, setSelectedSelItems] = useState([]);
  const [showBcFilter, setShowBcFilter] = useState(false);
  const [bcFilterConditions, setBcFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedBcItems, setSelectedBcItems] = useState([]);
  const [showItemFilter, setShowItemFilter] = useState(false);
  const [itemFilterConditions, setItemFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedItemItems, setSelectedItemItems] = useState([]);
  const [showDescriptionFilter, setShowDescriptionFilter] = useState(false);
  const [descriptionFilterConditions, setDescriptionFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedDescriptionItems, setSelectedDescriptionItems] = useState([]);
  const [showTemplateFilter, setShowTemplateFilter] = useState(false);
  const [templateFilterConditions, setTemplateFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedTemplateItems, setSelectedTemplateItems] = useState([]);
  const [showDateCreatedFilter, setShowDateCreatedFilter] = useState(false);
  const [dateCreatedFilterConditions, setDateCreatedFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedDateCreatedItems, setSelectedDateCreatedItems] = useState([]);
  const [showCreatedByFilter, setShowCreatedByFilter] = useState(false);
  const [createdByFilterConditions, setCreatedByFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedCreatedByItems, setSelectedCreatedByItems] = useState([]);


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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNewDropdown(false);
    };
    
    if (showNewDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNewDropdown]);

  const handleTabClick = (tab) => {
    if (tab === 'logout') {
      onLogout();
      return;
    }
    if (tab === 'list') {
      onPageChange('templates');
      return;
    }
    if (tab === 'new') {
      setShowNewDropdown(!showNewDropdown);
    } else {
      setShowNewDropdown(false);
    }
    setActiveTab(tab);
  };

  const handleNewTemplateSelect = (templateType) => {
    console.log('Creating new template:', templateType);
    setSelectedTemplate(templateType);
    setShowNewDropdown(false);
    setShowOrientationPopup(true);
    setSelectedOrientation('Portrait');
    setIsPopupMinimized(false);
  };

  // Sel filter handlers
  const handleSelFilterClick = () => {
    setShowSelFilter(true);
  };

  const handleSelFilterClose = () => {
    setShowSelFilter(false);
  };

  const handleSelFilterApply = () => {
    console.log('Applying Sel filter:', selFilterConditions);
    setShowSelFilter(false);
  };

  const handleSelFilterClear = () => {
    setSelFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedSelItems([]);
  };

  const handleSelSelectAll = (checked) => {
    if (checked) {
      setSelectedSelItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // Sample data rows
    } else {
      setSelectedSelItems([]);
    }
  };

  // BC # filter handlers
  const handleBcFilterClick = () => {
    setShowBcFilter(true);
  };

  const handleBcFilterClose = () => {
    setShowBcFilter(false);
  };

  const handleBcFilterApply = () => {
    console.log('Applying BC # filter:', bcFilterConditions);
    setShowBcFilter(false);
  };

  const handleBcFilterClear = () => {
    setBcFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedBcItems([]);
  };

  const handleBcConditionChange = (condition, field, value) => {
    setBcFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleBcSelectAll = (checked) => {
    if (checked) {
      setSelectedBcItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // Sample data rows
    } else {
      setSelectedBcItems([]);
    }
  };

  // Item filter handlers
  const handleItemFilterClick = () => {
    setShowItemFilter(true);
  };

  const handleItemFilterClose = () => {
    setShowItemFilter(false);
  };

  const handleItemFilterApply = () => {
    console.log('Applying Item filter:', itemFilterConditions);
    setShowItemFilter(false);
  };

  const handleItemFilterClear = () => {
    setItemFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedItemItems([]);
  };

  const handleItemConditionChange = (condition, field, value) => {
    setItemFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleItemSelectAll = (checked) => {
    if (checked) {
      setSelectedItemItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setSelectedItemItems([]);
    }
  };

  // Description filter handlers
  const handleDescriptionFilterClick = () => {
    setShowDescriptionFilter(true);
  };

  const handleDescriptionFilterClose = () => {
    setShowDescriptionFilter(false);
  };

  const handleDescriptionFilterApply = () => {
    console.log('Applying Description filter:', descriptionFilterConditions);
    setShowDescriptionFilter(false);
  };

  const handleDescriptionFilterClear = () => {
    setDescriptionFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedDescriptionItems([]);
  };

  const handleDescriptionConditionChange = (condition, field, value) => {
    setDescriptionFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleDescriptionSelectAll = (checked) => {
    if (checked) {
      setSelectedDescriptionItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setSelectedDescriptionItems([]);
    }
  };

  // Template filter handlers
  const handleTemplateFilterClick = () => {
    setShowTemplateFilter(true);
  };

  const handleTemplateFilterClose = () => {
    setShowTemplateFilter(false);
  };

  const handleTemplateFilterApply = () => {
    console.log('Applying Template filter:', templateFilterConditions);
    setShowTemplateFilter(false);
  };

  const handleTemplateFilterClear = () => {
    setTemplateFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedTemplateItems([]);
  };

  const handleTemplateConditionChange = (condition, field, value) => {
    setTemplateFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleTemplateSelectAll = (checked) => {
    if (checked) {
      setSelectedTemplateItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setSelectedTemplateItems([]);
    }
  };

  // Date Created filter handlers
  const handleDateCreatedFilterClick = () => {
    setShowDateCreatedFilter(true);
  };

  const handleDateCreatedFilterClose = () => {
    setShowDateCreatedFilter(false);
  };

  const handleDateCreatedFilterApply = () => {
    console.log('Applying Date Created filter:', dateCreatedFilterConditions);
    setShowDateCreatedFilter(false);
  };

  const handleDateCreatedFilterClear = () => {
    setDateCreatedFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedDateCreatedItems([]);
  };

  const handleDateCreatedConditionChange = (condition, field, value) => {
    setDateCreatedFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleDateCreatedSelectAll = (checked) => {
    if (checked) {
      setSelectedDateCreatedItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setSelectedDateCreatedItems([]);
    }
  };

  // Created By filter handlers
  const handleCreatedByFilterClick = () => {
    setShowCreatedByFilter(true);
  };

  const handleCreatedByFilterClose = () => {
    setShowCreatedByFilter(false);
  };

  const handleCreatedByFilterApply = () => {
    console.log('Applying Created By filter:', createdByFilterConditions);
    setShowCreatedByFilter(false);
  };

  const handleCreatedByFilterClear = () => {
    setCreatedByFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedCreatedByItems([]);
  };

  const handleCreatedByConditionChange = (condition, field, value) => {
    setCreatedByFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleCreatedBySelectAll = (checked) => {
    if (checked) {
      setSelectedCreatedByItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setSelectedCreatedByItems([]);
    }
  };





  return (
    <div className="h-screen flex flex-col font-system">
      {/* Header navbar */}
      <div className="bg-gradient-to-br from-orange-primary to-orange-secondary text-black px-6 py-4 shadow-lg flex items-center justify-start h-[70px]">
        <div className="flex items-center gap-3">
          <i className="fas fa-copy text-3xl text-black bg-none bg-opacity-15 p-2 rounded-md w-9 h-9 flex items-center justify-center"></i>
          <h1 className="text-3xl font-semibold tracking-wide text-black">Store Tags</h1>
        </div>
      </div>

      {/* Main layout with sidebar and content */}
      <div className="flex h-[calc(100vh-70px)]">
        {/* Left Sidebar */}
        <div className="w-[80px] bg-orange-primary flex flex-col justify-between p-0 shadow-lg flex-shrink-0">
          {/* Top section buttons */}
          <div className="flex flex-col">
            {/* New button with dropdown */}
            <div 
              className={`flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 relative hover:bg-white hover:bg-opacity-10 ${activeTab === 'new' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowNewDropdown(!showNewDropdown);
                setActiveTab('new');
              }}
            >
              <div className="flex items-center gap-1">
                <i className="fas fa-file-plus text-lg opacity-90"></i>
                <span className="text-xs font-medium leading-tight opacity-95">New</span>
                <i className={`fas fa-chevron-${showNewDropdown ? 'up' : 'down'} text-xs opacity-80 transition-transform duration-200`}></i>
              </div>
              
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
              <i className="fas fa-list text-lg mb-1 opacity-90"></i>
              <span className="text-xs font-medium leading-tight opacity-95">List</span>
            </div>
            
            <div 
              className={`flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10 ${activeTab === 'store' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleTabClick('store')}
            >
              <i className="fas fa-tags text-lg mb-1 opacity-90"></i>
              <span className="text-xs font-medium leading-tight opacity-95">Store Tags</span>
            </div>

          </div>
          
          {/* Bottom section buttons */}
          <div className="flex flex-col mt-auto">
            <div className="flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10">
              <i className="fas fa-chart-line text-lg mb-1 opacity-90"></i>
              <span className="text-xs font-medium leading-tight opacity-95">View Log</span>
            </div>
            <div 
              className="flex flex-col items-center justify-center px-1 py-3 text-white cursor-pointer transition-all duration-200 text-center h-20 gap-1 hover:bg-white hover:bg-opacity-10"
              onClick={() => handleTabClick('logout')}
            >
              <i className="fas fa-sign-out-alt text-lg mb-1 opacity-90"></i>
              <span className="text-xs font-medium leading-tight opacity-95">Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-0 bg-white flex flex-col overflow-hidden">
          {/* Filter Bar Section */}
          <div className="bg-white py-3 px-4 border-b border-gray-300 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Filter Sequences Label */}
              <div className="flex items-center">
                <span 
                  className="text-sm text-gray-700 font-medium"
                  style={{ fontSize: '13px' }}
                >
                  Filter Sequences
                </span>
              </div>
              
              {/* Select Store Dropdown */}
              <div className="relative flex items-center">
                <select 
                  className="py-1 px-2 bg-transparent border-0 border-b border-gray-400 text-sm text-gray-700 min-w-[140px] cursor-pointer focus:outline-none focus:border-blue-500 appearance-none"
                  style={{ fontSize: '13px', paddingRight: '20px' }}
                >
                  <option>... Select Store ...</option>
                </select>
                <i className="fas fa-chevron-down absolute right-1 text-gray-500 text-xs pointer-events-none"></i>
              </div>
              
              {/* Select Tag Dropdown */}
              <div className="relative flex items-center">
                <select 
                  className="py-1 px-2 bg-transparent border-0 border-b border-gray-400 text-sm text-gray-700 min-w-[140px] cursor-pointer focus:outline-none focus:border-blue-500 appearance-none"
                  style={{ fontSize: '13px', paddingRight: '20px' }}
                >
                  <option>... Select Tag ...</option>
                </select>
                <i className="fas fa-chevron-down absolute right-1 text-gray-500 text-xs pointer-events-none"></i>
              </div>
              
              {/* Refresh Button */}
              <button 
                className="bg-[#90ee90] hover:bg-green-400 text-black border-none py-5 px-3 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: '12px', height: '32px' }}
              >
                <i className="fas fa-sync-alt text-xs"></i>
                <span>Refresh</span>
              </button>
              
              {/* Search Box */}
              <div className="relative flex items-center">
                <i className="fas fa-search absolute left-3 text-gray-500 text-sm"></i>
                <input 
                  type="text" 
                  className="py-2 pl-10 pr-3 border border-gray-400 bg-white text-sm min-w-[200px] focus:outline-none focus:border-blue-500"
                  style={{ fontSize: '13px', height: '32px' }}
                  placeholder=""
                />
              </div>
            </div>
            
            {/* Select All / Deselect All buttons */}
            <div className="flex items-center gap-3">
              <button 
                className="bg-white hover:bg-[#e1e1e1] text-black border border-gray-400 py-2 px-4 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: '12px', height: '32px' }}
              >
                <i className="fa-solid fa-check-double text-sm"></i>
                <span>Select All</span>
              </button>
              <button 
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-400 py-2 px-4 text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: '12px', height: '32px' }}
              >
                <i className="far fa-square text-sm"></i>
                <span>Deselect All</span>
              </button>
            </div>
          </div>
          
          {/* Pagination Controls */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <button 
                className="bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200"
                style={{ width: '24px', height: '22px' }}
              >
                <i className="fas fa-angle-double-left text-xs"></i>
              </button>
              <button 
                className="bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200"
                style={{ width: '24px', height: '22px' }}
              >
                <i className="fas fa-angle-left text-xs"></i>
              </button>
              <button 
                className="bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200"
                style={{ width: '24px', height: '22px' }}
              >
                <i className="fas fa-angle-right text-xs"></i>
              </button>
              <button 
                className="bg-white hover:bg-gray-100 border border-gray-400 px-2 py-1 text-sm cursor-pointer flex items-center justify-center text-gray-700 transition-all duration-200"
                style={{ width: '24px', height: '22px' }}
              >
                <i className="fas fa-angle-double-right text-xs"></i>
              </button>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <span style={{ fontSize: '12px' }}>Page</span>
              <input 
                type="text" 
                className="border border-gray-400 px-1 py-0 w-8 text-center text-sm"
                style={{ height: '18px', fontSize: '11px' }}
                defaultValue="1"
              />
              <span style={{ fontSize: '12px' }}>of 1</span>
            </div>
          </div>
          
          {/* Data Table */}
          <div className="flex-1 overflow-auto bg-white border-l border-r border-gray-300">
            <table className="w-full border-collapse text-sm bg-white">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100">
                  <th 
                    className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer relative"
                    style={{ width: '50px' }}
                  >
                    <span className="mr-3">Sel</span>
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleSelFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ width: '80px' }}
                  >
                    <span>BC #</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleBcFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ width: '120px' }}
                  >
                    <span>Item</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleItemFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ minWidth: '200px' }}
                  >
                    <span>Description</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleDescriptionFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ width: '120px' }}
                  >
                    <span>Template</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleTemplateFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ width: '120px' }}
                  >
                    <span>Date Created</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleDateCreatedFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                  <th 
                    className="py-2 px-2 text-left font-medium text-gray-600 whitespace-nowrap text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 relative"
                    style={{ width: '120px' }}
                  >
                    <span>Created By</span>
                    <button 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                      onClick={handleCreatedByFilterClick}
                    >
                      <i className="fas fa-filter text-xs"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              {/* Table Body - Empty for now */}
              <tbody>
                <tr>
                  <td 
                    colSpan={7} 
                    className="text-center text-gray-500 italic py-8 text-sm border-b border-gray-300"
                  >
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Bottom Action Buttons */}
          <div className="bg-white py-6 px-4 flex justify-center border-t border-gray-300">
            <div className="bg-orange-200 p-4 rounded flex gap-4 justify-center shadow-sm">
              <button 
                className="bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200"
                style={{ fontSize: '12px' }}
              >
                <i className="fas fa-print text-sm text-black"></i>
                <span className="text-black">Print Selected</span>
              </button>
              <button 
                className="bg-[#e6d4b9] hover:bg-[#d8c6ab] text-black py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200"
                style={{ fontSize: '12px' }}
              >
                <i className="fas fa-print text-sm text-black"></i>
                <span className="text-black">Print All</span>
              </button>
              <button 
                className="bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200"
                style={{ fontSize: '12px' }}
              >
                <i className="fas fa-trash text-sm text-black"></i>
                <span className="text-black">Delete Selected</span>
              </button>
              <button 
                className="bg-[#e6d4b9] hover:bg-[#d8c6ab] border-none py-2 px-4 text-sm cursor-pointer flex items-center gap-2 text-black transition-all duration-200"
                style={{ fontSize: '12px' }}
              >
                <i className="fas fa-cog text-sm text-black"></i>
                <span className="text-black">Settings</span>
              </button>
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
                      
                      // Navigate to Fabric Canvas page when template is selected
                      console.log('Continue clicked. Template:', selectedTemplate, 'Orientation:', selectedOrientation);
                      console.log('Navigating to fabric-canvas page');
                      onPageChange('fabric-canvas');
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

        {/* Sel Filter Modal */}
        {showSelFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-64">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllSel"
                    checked={selectedSelItems.length === 10}
                    onChange={(e) => handleSelSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllSel" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleSelFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-0">
                <button 
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-colors"
                  onClick={handleSelFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-colors"
                  onClick={handleSelFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BC # Filter Modal */}
        {showBcFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllBc"
                    checked={selectedBcItems.length === 10}
                    onChange={(e) => handleBcSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllBc" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleBcFilterClose}
                >
                  ×
                </button>
              </div>



              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={bcFilterConditions.condition1.operator}
                    onChange={(e) => handleBcConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={bcFilterConditions.condition1.value}
                      onChange={(e) => handleBcConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={bcFilterConditions.condition2.operator}
                    onChange={(e) => handleBcConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={bcFilterConditions.condition2.value}
                      onChange={(e) => handleBcConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleBcFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleBcFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item Filter Modal */}
        {showItemFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllItem"
                    checked={selectedItemItems.length === 10}
                    onChange={(e) => handleItemSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllItem" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleItemFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={itemFilterConditions.condition1.operator}
                    onChange={(e) => handleItemConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={itemFilterConditions.condition1.value}
                      onChange={(e) => handleItemConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={itemFilterConditions.condition2.operator}
                    onChange={(e) => handleItemConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={itemFilterConditions.condition2.value}
                      onChange={(e) => handleItemConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleItemFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleItemFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Description Filter Modal */}
        {showDescriptionFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllDescription"
                    checked={selectedDescriptionItems.length === 10}
                    onChange={(e) => handleDescriptionSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllDescription" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleDescriptionFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={descriptionFilterConditions.condition1.operator}
                    onChange={(e) => handleDescriptionConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={descriptionFilterConditions.condition1.value}
                      onChange={(e) => handleDescriptionConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={descriptionFilterConditions.condition2.operator}
                    onChange={(e) => handleDescriptionConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={descriptionFilterConditions.condition2.value}
                      onChange={(e) => handleDescriptionConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDescriptionFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDescriptionFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Template Filter Modal */}
        {showTemplateFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllTemplate"
                    checked={selectedTemplateItems.length === 10}
                    onChange={(e) => handleTemplateSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllTemplate" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleTemplateFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={templateFilterConditions.condition1.operator}
                    onChange={(e) => handleTemplateConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={templateFilterConditions.condition1.value}
                      onChange={(e) => handleTemplateConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={templateFilterConditions.condition2.operator}
                    onChange={(e) => handleTemplateConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={templateFilterConditions.condition2.value}
                      onChange={(e) => handleTemplateConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleTemplateFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleTemplateFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Date Created Filter Modal */}
        {showDateCreatedFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllDateCreated"
                    checked={selectedDateCreatedItems.length === 10}
                    onChange={(e) => handleDateCreatedSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllDateCreated" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleDateCreatedFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={dateCreatedFilterConditions.condition1.operator}
                    onChange={(e) => handleDateCreatedConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateCreatedFilterConditions.condition1.value}
                      onChange={(e) => handleDateCreatedConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={dateCreatedFilterConditions.condition2.operator}
                    onChange={(e) => handleDateCreatedConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateCreatedFilterConditions.condition2.value}
                      onChange={(e) => handleDateCreatedConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDateCreatedFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDateCreatedFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Created By Filter Modal */}
        {showCreatedByFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllCreatedBy"
                    checked={selectedCreatedByItems.length === 10}
                    onChange={(e) => handleCreatedBySelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllCreatedBy" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleCreatedByFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={createdByFilterConditions.condition1.operator}
                    onChange={(e) => handleCreatedByConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={createdByFilterConditions.condition1.value}
                      onChange={(e) => handleCreatedByConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={createdByFilterConditions.condition2.operator}
                    onChange={(e) => handleCreatedByConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Contains</option>
                    <option>Does not contain</option>
                    <option>Starts with</option>
                    <option>Ends with</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={createdByFilterConditions.condition2.value}
                      onChange={(e) => handleCreatedByConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600">
                      aA
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleCreatedByFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleCreatedByFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StoreTagsPage; 