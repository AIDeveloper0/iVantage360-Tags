import React, { useState } from 'react';

const TemplatesPage = ({ onLogout, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [showNewDropdown, setShowNewDropdown] = useState(false);

  const [showOrientationPopup, setShowOrientationPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('Portrait');
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);
  const [isPopupMaximized, setIsPopupMaximized] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterConditions, setFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCreatedByFilter, setShowCreatedByFilter] = useState(false);
  const [createdByFilterConditions, setCreatedByFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedCreatedByItems, setSelectedCreatedByItems] = useState([]);
  const [showDateCreatedFilter, setShowDateCreatedFilter] = useState(false);
  const [dateCreatedFilterConditions, setDateCreatedFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedDateCreatedItems, setSelectedDateCreatedItems] = useState([]);
  const [showDateModifiedFilter, setShowDateModifiedFilter] = useState(false);
  const [dateModifiedFilterConditions, setDateModifiedFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedDateModifiedItems, setSelectedDateModifiedItems] = useState([]);
  const [showModifiedByFilter, setShowModifiedByFilter] = useState(false);
  const [modifiedByFilterConditions, setModifiedByFilterConditions] = useState({
    condition1: { operator: 'Is equal to', value: '' },
    condition2: { operator: 'Is equal to', value: '' }
  });
  const [selectedModifiedByItems, setSelectedModifiedByItems] = useState([]);
  const [showDateCreatedCalendar, setShowDateCreatedCalendar] = useState(false);
  const [showDateModifiedCalendar, setShowDateModifiedCalendar] = useState(false);
  const [activeCalendarField, setActiveCalendarField] = useState('');
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Sample data for the templates table
  const templates = [
    {
      title: 'Test_Now',
      createdBy: 'Amitesh Sinha',
      dateCreated: '07-24-2025',
      dateModified: '07-24-2025',
      modifiedBy: 'Amitesh Sinha'
    },
    {
      title: 'new test',
      createdBy: 'Admin',
      dateCreated: '07-22-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-08-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-04-2025',
      modifiedBy: 'Admin'
    },
    {
      title: '4UP No Cents',
      createdBy: 'Ben Streiff',
      dateCreated: '05-06-2022',
      dateModified: '06-20-2023',
      modifiedBy: 'Emily Noyola'
    },
    {
      title: 'two pages',
      createdBy: 'Admin',
      dateCreated: '05-04-2022',
      dateModified: '07-02-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'TAg 2 brs',
      createdBy: 'Admin',
      dateCreated: '05-04-2022',
      dateModified: '07-02-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    },
    {
      title: 'final',
      createdBy: 'Admin',
      dateCreated: '07-21-2025',
      dateModified: '07-21-2025',
      modifiedBy: 'Admin'
    }
  ];

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

  const handleTabClick = (tab) => {
    if (tab === 'logout') {
      onLogout();
      return;
    }
    if (tab === 'store') {
      onPageChange('store-tags');
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
    console.log('Template selected:', templateType, 'Orientation set to Portrait');
  };

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleFilterClose = () => {
    setShowFilterModal(false);
  };

  const handleFilterApply = () => {
    console.log('Applying filter:', filterConditions);
    setShowFilterModal(false);
  };

  const handleFilterClear = () => {
    setFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedItems([]);
  };

  const handleConditionChange = (condition, field, value) => {
    setFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(templates.map((_, index) => index));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (index, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, index]);
    } else {
      setSelectedItems(prev => prev.filter(i => i !== index));
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
    const uniqueCreators = [...new Set(templates.map(template => template.createdBy))];
    if (checked) {
      setSelectedCreatedByItems(uniqueCreators.map((_, index) => index));
    } else {
      setSelectedCreatedByItems([]);
    }
  };

  const handleCreatedByItemSelect = (index, checked) => {
    if (checked) {
      setSelectedCreatedByItems(prev => [...prev, index]);
    } else {
      setSelectedCreatedByItems(prev => prev.filter(i => i !== index));
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
    const uniqueDates = [...new Set(templates.map(template => template.dateCreated))];
    if (checked) {
      setSelectedDateCreatedItems(uniqueDates.map((_, index) => index));
    } else {
      setSelectedDateCreatedItems([]);
    }
  };

  const handleDateCreatedItemSelect = (index, checked) => {
    if (checked) {
      setSelectedDateCreatedItems(prev => [...prev, index]);
    } else {
      setSelectedDateCreatedItems(prev => prev.filter(i => i !== index));
    }
  };

  // Date Modified filter handlers
  const handleDateModifiedFilterClick = () => {
    setShowDateModifiedFilter(true);
  };

  const handleDateModifiedFilterClose = () => {
    setShowDateModifiedFilter(false);
  };

  const handleDateModifiedFilterApply = () => {
    console.log('Applying Date Modified filter:', dateModifiedFilterConditions);
    setShowDateModifiedFilter(false);
  };

  const handleDateModifiedFilterClear = () => {
    setDateModifiedFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedDateModifiedItems([]);
  };

  const handleDateModifiedConditionChange = (condition, field, value) => {
    setDateModifiedFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleDateModifiedSelectAll = (checked) => {
    const uniqueDates = [...new Set(templates.map(template => template.dateModified))];
    if (checked) {
      setSelectedDateModifiedItems(uniqueDates.map((_, index) => index));
    } else {
      setSelectedDateModifiedItems([]);
    }
  };

  const handleDateModifiedItemSelect = (index, checked) => {
    if (checked) {
      setSelectedDateModifiedItems(prev => [...prev, index]);
    } else {
      setSelectedDateModifiedItems(prev => prev.filter(i => i !== index));
    }
  };

  // Modified By filter handlers
  const handleModifiedByFilterClick = () => {
    setShowModifiedByFilter(true);
  };

  const handleModifiedByFilterClose = () => {
    setShowModifiedByFilter(false);
  };

  const handleModifiedByFilterApply = () => {
    console.log('Applying Modified By filter:', modifiedByFilterConditions);
    setShowModifiedByFilter(false);
  };

  const handleModifiedByFilterClear = () => {
    setModifiedByFilterConditions({
      condition1: { operator: 'Is equal to', value: '' },
      condition2: { operator: 'Is equal to', value: '' }
    });
    setSelectedModifiedByItems([]);
  };

  const handleModifiedByConditionChange = (condition, field, value) => {
    setModifiedByFilterConditions(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [field]: value
      }
    }));
  };

  const handleModifiedBySelectAll = (checked) => {
    const uniqueModifiers = [...new Set(templates.map(template => template.modifiedBy))];
    if (checked) {
      setSelectedModifiedByItems(uniqueModifiers.map((_, index) => index));
    } else {
      setSelectedModifiedByItems([]);
    }
  };

  const handleModifiedByItemSelect = (index, checked) => {
    if (checked) {
      setSelectedModifiedByItems(prev => [...prev, index]);
    } else {
      setSelectedModifiedByItems(prev => prev.filter(i => i !== index));
    }
  };

  // Calendar handlers
  const handleCalendarClick = (filterType, field) => {
    setActiveCalendarField(`${filterType}-${field}`);
    if (filterType === 'dateCreated') {
      setShowDateCreatedCalendar(true);
    } else if (filterType === 'dateModified') {
      setShowDateModifiedCalendar(true);
    }
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    if (activeCalendarField.includes('dateCreated')) {
      const field = activeCalendarField.split('-')[1];
      handleDateCreatedConditionChange(field, 'value', formattedDate);
      setShowDateCreatedCalendar(false);
    } else if (activeCalendarField.includes('dateModified')) {
      const field = activeCalendarField.split('-')[1];
      handleDateModifiedConditionChange(field, 'value', formattedDate);
      setShowDateModifiedCalendar(false);
    }
  };

  const handleCalendarClose = () => {
    setShowDateCreatedCalendar(false);
    setShowDateModifiedCalendar(false);
    setActiveCalendarField('');
  };

  const handleCalendarNavigation = (direction) => {
    setCurrentCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  return (
    <div className="h-screen flex flex-col font-system">
      {/* Header navbar */}
      <div className="bg-gradient-to-br from-orange-primary to-orange-secondary text-black px-6 py-4 shadow-lg flex items-center justify-start h-[70px]">
        <div className="flex items-center gap-3">
          <i className="fas fa-copy text-3xl text-black bg-none bg-opacity-15 p-2 rounded-md w-9 h-9 flex items-center justify-center"></i>
          <h1 className="text-3xl font-semibold tracking-wide text-black">Templates</h1>
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
          {/* Saved Templates Section */}
          <div className="h-full flex flex-col p-4">
            {/* Section Header */}
            <div className="pb-4 flex items-center gap-3 border-b border-gray-300 min-h-[45px]">
              <h2 className="text-sm font-medium text-gray-800 m-0">Saved Templates</h2>
              <button className="bg-gray-300 hover:bg-gray-400 border-none text-gray-700 text-sm cursor-pointer p-0 transition-colors duration-200 flex items-center justify-center w-6 h-6">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            
            {/* Table Container */}
            <div className="flex-1 overflow-auto bg-white border border-gray-300">
              <table className="w-full border-collapse text-sm bg-white table-fixed">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[15%] hover:bg-gray-200"> 
                      Title
                      <button 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={handleFilterClick}
                      >
                        <i className="fas fa-filter text-xs"></i>
                      </button>
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200"> 
                      Created By
                      <button 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={handleCreatedByFilterClick}
                      >
                        <i className="fas fa-filter text-xs"></i>
                      </button>
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200"> 
                      Date Created
                      <button 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={handleDateCreatedFilterClick}
                      >
                        <i className="fas fa-filter text-xs"></i>
                      </button>
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200"> 
                      Date Modified
                      <button 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={handleDateModifiedFilterClick}
                      >
                        <i className="fas fa-filter text-xs"></i>
                      </button>
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200"> 
                      Modified By
                      <button 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={handleModifiedByFilterClick}
                      >
                        <i className="fas fa-filter text-xs"></i>
                      </button>
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200">Edit</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200">Clone</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200">Print</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-600 border-r-0 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200">Delete</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {templates.map((template, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3 text-xs border-r border-gray-200">{template.title}</td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">{template.createdBy}</td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">{template.dateCreated}</td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">{template.dateModified}</td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">{template.modifiedBy}</td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">
                        <button className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded px-2 py-1 text-xs transition-colors">
                          <i className="fas fa-edit mr-1"></i>Edit
                        </button>
                      </td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">
                        <button className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded px-2 py-1 text-xs transition-colors">
                          <i className="fas fa-copy mr-1"></i>Clone
                        </button>
                      </td>
                      <td className="py-2 px-3 text-xs border-r border-gray-200">
                        <button className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded px-2 py-1 text-xs transition-colors">
                          <i className="fas fa-print mr-1"></i>Print
                        </button>
                      </td>
                      <td className="py-2 px-3 text-xs">
                        <button className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded px-2 py-1 text-xs transition-colors">
                          <i className="fas fa-trash mr-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                      
                      // Navigate to Fabric Canvas page when 1UP and Portrait are selected
                      console.log('Continue clicked. Template:', selectedTemplate, 'Orientation:', selectedOrientation);
                      if (selectedTemplate === '1UP' && selectedOrientation === 'Portrait') {
                        console.log('Navigating to fabric-canvas page');
                        onPageChange('fabric-canvas');
                      } else {
                        console.log('Condition not met:', { selectedTemplate, selectedOrientation });
                        // For testing, let's also navigate for any 1UP selection
                        if (selectedTemplate === '1UP') {
                          console.log('Navigating to fabric-canvas page (1UP only)');
                          onPageChange('fabric-canvas');
                        }
                      }
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

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <span className="text-white text-sm font-medium">Filter Templates</span>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Selection List */}
              <div className="px-4 py-3 border-b border-gray-600 max-h-48 overflow-y-auto">
                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox" 
                    id="selectAll"
                    checked={selectedItems.length === templates.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAll" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                
                <div className="space-y-2">
                  {templates.map((template, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`item-${index}`}
                        checked={selectedItems.includes(index)}
                        onChange={(e) => handleItemSelect(index, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`item-${index}`} className="text-white text-sm cursor-pointer">
                        {template.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={filterConditions.condition1.operator}
                    onChange={(e) => handleConditionChange('condition1', 'operator', e.target.value)}
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
                      value={filterConditions.condition1.value}
                      onChange={(e) => handleConditionChange('condition1', 'value', e.target.value)}
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
                    value={filterConditions.condition2.operator}
                    onChange={(e) => handleConditionChange('condition2', 'operator', e.target.value)}
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
                      value={filterConditions.condition2.value}
                      onChange={(e) => handleConditionChange('condition2', 'value', e.target.value)}
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
                  onClick={handleFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleFilterClear}
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
                <span className="text-white text-sm font-medium">Filter Created By</span>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleCreatedByFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Selection List */}
              <div className="px-4 py-3 border-b border-gray-600 max-h-48 overflow-y-auto">
                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox" 
                    id="selectAllCreatedBy"
                    checked={selectedCreatedByItems.length === [...new Set(templates.map(template => template.createdBy))].length}
                    onChange={(e) => handleCreatedBySelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllCreatedBy" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                
                <div className="space-y-2">
                  {[...new Set(templates.map(template => template.createdBy))].map((creator, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`createdBy-item-${index}`}
                        checked={selectedCreatedByItems.includes(index)}
                        onChange={(e) => handleCreatedByItemSelect(index, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`createdBy-item-${index}`} className="text-white text-sm cursor-pointer">
                        {creator}
                      </label>
                    </div>
                  ))}
                </div>
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
                    checked={selectedDateCreatedItems.length === [...new Set(templates.map(template => template.dateCreated))].length}
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

              {/* Date Selection List */}
              <div className="px-4 py-3 border-b border-gray-600 max-h-48 overflow-y-auto bg-gray-700">
                <div className="space-y-2">
                  {[...new Set(templates.map(template => template.dateCreated))].map((date, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`dateCreated-item-${index}`}
                        checked={selectedDateCreatedItems.includes(index)}
                        onChange={(e) => handleDateCreatedItemSelect(index, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`dateCreated-item-${index}`} className="text-white text-sm cursor-pointer">
                        {date}
                      </label>
                    </div>
                  ))}
                </div>
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
                    <option>Is greater than</option>
                    <option>Is less than</option>
                    <option>Is greater than or equal to</option>
                    <option>Is less than or equal to</option>
                    <option>Is between</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateCreatedFilterConditions.condition1.value}
                      onChange={(e) => handleDateCreatedConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter date"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button 
                      className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => handleCalendarClick('dateCreated', 'condition1')}
                    >
                      <i className="fas fa-calendar text-sm"></i>
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
                    <option>Is greater than</option>
                    <option>Is less than</option>
                    <option>Is greater than or equal to</option>
                    <option>Is less than or equal to</option>
                    <option>Is between</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateCreatedFilterConditions.condition2.value}
                      onChange={(e) => handleDateCreatedConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter date"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button 
                      className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => handleCalendarClick('dateCreated', 'condition2')}
                    >
                      <i className="fas fa-calendar text-sm"></i>
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

        {/* Date Modified Filter Modal */}
        {showDateModifiedFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllDateModified"
                    checked={selectedDateModifiedItems.length === [...new Set(templates.map(template => template.dateModified))].length}
                    onChange={(e) => handleDateModifiedSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllDateModified" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleDateModifiedFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Date Selection List */}
              <div className="px-4 py-3 border-b border-gray-600 max-h-48 overflow-y-auto bg-gray-700">
                <div className="space-y-2">
                  {[...new Set(templates.map(template => template.dateModified))].map((date, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`dateModified-item-${index}`}
                        checked={selectedDateModifiedItems.includes(index)}
                        onChange={(e) => handleDateModifiedItemSelect(index, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`dateModified-item-${index}`} className="text-white text-sm cursor-pointer">
                        {date}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={dateModifiedFilterConditions.condition1.operator}
                    onChange={(e) => handleDateModifiedConditionChange('condition1', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Is greater than</option>
                    <option>Is less than</option>
                    <option>Is greater than or equal to</option>
                    <option>Is less than or equal to</option>
                    <option>Is between</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateModifiedFilterConditions.condition1.value}
                      onChange={(e) => handleDateModifiedConditionChange('condition1', 'value', e.target.value)}
                      placeholder="Enter date"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button 
                      className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => handleCalendarClick('dateModified', 'condition1')}
                    >
                      <i className="fas fa-calendar text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* And Separator */}
                <div className="text-center text-gray-400 text-sm mb-3">And</div>

                {/* Second Condition */}
                <div>
                  <select 
                    value={dateModifiedFilterConditions.condition2.operator}
                    onChange={(e) => handleDateModifiedConditionChange('condition2', 'operator', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded mb-2"
                  >
                    <option>Is equal to</option>
                    <option>Is not equal to</option>
                    <option>Is greater than</option>
                    <option>Is less than</option>
                    <option>Is greater than or equal to</option>
                    <option>Is less than or equal to</option>
                    <option>Is between</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={dateModifiedFilterConditions.condition2.value}
                      onChange={(e) => handleDateModifiedConditionChange('condition2', 'value', e.target.value)}
                      placeholder="Enter date"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded"
                    />
                    <button 
                      className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-600"
                      onClick={() => handleCalendarClick('dateModified', 'condition2')}
                    >
                      <i className="fas fa-calendar text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 flex gap-3">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDateModifiedFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleDateModifiedFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modified By Filter Modal */}
        {showModifiedByFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[2000]">
            <div className="bg-gray-800 border border-gray-600 rounded shadow-lg w-96 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="selectAllModifiedBy"
                    checked={selectedModifiedByItems.length === [...new Set(templates.map(template => template.modifiedBy))].length}
                    onChange={(e) => handleModifiedBySelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllModifiedBy" className="text-white text-sm cursor-pointer">Select All</label>
                </div>
                <button 
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                  onClick={handleModifiedByFilterClose}
                >
                  ×
                </button>
              </div>

              {/* Selection List */}
              <div className="px-4 py-3 border-b border-gray-600 max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {[...new Set(templates.map(template => template.modifiedBy))].map((modifier, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`modifiedBy-item-${index}`}
                        checked={selectedModifiedByItems.includes(index)}
                        onChange={(e) => handleModifiedByItemSelect(index, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`modifiedBy-item-${index}`} className="text-white text-sm cursor-pointer">
                        {modifier}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Criteria */}
              <div className="px-4 py-3 border-b border-gray-600">
                <h4 className="text-white text-sm font-medium mb-3">Show rows with value that</h4>
                
                {/* First Condition */}
                <div className="mb-3">
                  <select 
                    value={modifiedByFilterConditions.condition1.operator}
                    onChange={(e) => handleModifiedByConditionChange('condition1', 'operator', e.target.value)}
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
                      value={modifiedByFilterConditions.condition1.value}
                      onChange={(e) => handleModifiedByConditionChange('condition1', 'value', e.target.value)}
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
                    value={modifiedByFilterConditions.condition2.operator}
                    onChange={(e) => handleModifiedByConditionChange('condition2', 'operator', e.target.value)}
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
                      value={modifiedByFilterConditions.condition2.value}
                      onChange={(e) => handleModifiedByConditionChange('condition2', 'value', e.target.value)}
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
                  onClick={handleModifiedByFilterApply}
                >
                  Filter
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  onClick={handleModifiedByFilterClear}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Widget */}
        {(showDateCreatedCalendar || showDateModifiedCalendar) && (
          <div className="fixed inset-0 flex items-center justify-center z-[2001]">
            <div className="bg-white border border-gray-300 rounded shadow-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {currentCalendarDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <div className="flex gap-2">
                  <button 
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCalendarNavigation('prev')}
                  >
                    <i className="fas fa-chevron-up text-gray-600"></i>
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCalendarNavigation('next')}
                  >
                    <i className="fas fa-chevron-down text-gray-600"></i>
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentCalendarDate).map((dayData, index) => (
                  <button
                    key={index}
                    className={`p-2 text-sm rounded hover:bg-blue-100 transition-colors ${
                      dayData.isCurrentMonth 
                        ? 'text-gray-800 hover:bg-blue-200' 
                        : 'text-gray-400'
                    } ${
                      dayData.date.toDateString() === new Date().toDateString() 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : ''
                    }`}
                    onClick={() => dayData.isCurrentMonth && handleDateSelect(dayData.date)}
                    disabled={!dayData.isCurrentMonth}
                  >
                    {dayData.date.getDate()}
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <div className="mt-4 text-center">
                <button 
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
                  onClick={handleCalendarClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default TemplatesPage; 