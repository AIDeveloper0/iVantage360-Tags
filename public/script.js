// React App with Exact iVantage360 Layout
function App() {
    // Template data will come from backend - placeholder for now
    const templateData = [];
    
    // State for dropdown visibility and popup
    const [showNewDropdown, setShowNewDropdown] = React.useState(false);
    const [showOrientationPopup, setShowOrientationPopup] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState('');
    const [selectedOrientation, setSelectedOrientation] = React.useState('Portrait'); // Default to Portrait
    const [isPopupMinimized, setIsPopupMinimized] = React.useState(false);
    const [isPopupMaximized, setIsPopupMaximized] = React.useState(false);
    
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
    React.useEffect(() => {
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

    return React.createElement('div', { className: 'h-screen flex flex-col font-system' },
        // Header navbar
        React.createElement(SharedNavbar, { title: 'Templates' }),

        // Main layout with sidebar and content
        React.createElement('div', { className: 'flex h-[calc(100vh-70px)]' },
            // Left Sidebar
            React.createElement(SharedSidebar, {
                activePage: 'templates',
                showNewDropdown,
                setShowNewDropdown,
                setShowOrientationPopup,
                setSelectedTemplate,
                setSelectedOrientation,
                setIsPopupMinimized,
                templateOptions
            }),

            // Main Content Area
            React.createElement('div', { className: 'flex-1 flex flex-col bg-gray-100 overflow-hidden' },
                // Saved Templates Section
                React.createElement('div', { className: 'h-full flex flex-col p-4' },
                    // Section Header
                    React.createElement('div', { className: 'pb-4 flex items-center gap-3 border-b border-gray-300 min-h-[45px]' },
                        React.createElement('h2', { className: 'text-sm font-medium text-gray-800 m-0' }, 'Saved Templates'),
                        React.createElement('button', { className: 'bg-gray-300 hover:bg-gray-400 border-none text-gray-700 text-sm cursor-pointer p-0 transition-colors duration-200 flex items-center justify-center w-6 h-6' },
                            React.createElement('i', { className: 'fas fa-sync-alt' })
                        )
                    ),
                    
                    // Table Container
                    React.createElement('div', { className: 'flex-1 overflow-auto bg-white border border-gray-300' },
                        React.createElement('table', { className: 'w-full border-collapse text-sm bg-white table-fixed' },
                            // Table Header
                            React.createElement('thead', null,
                                React.createElement('tr', { className: 'bg-gray-100 border-b border-gray-300' },
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[15%] hover:bg-gray-200' }, 
                                        'Title',
                                        React.createElement('span', { className: 'absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70' }, '▼')
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200' }, 
                                        'Created By',
                                        React.createElement('span', { className: 'absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70' }, '▼')
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200' }, 
                                        'Date Created',
                                        React.createElement('span', { className: 'absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70' }, '▼')
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200' }, 
                                        'Date Modified',
                                        React.createElement('span', { className: 'absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70' }, '▼')
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[12%] hover:bg-gray-200' }, 
                                        'Modified By',
                                        React.createElement('span', { className: 'absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-70' }, '▼')
                                    ),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Edit'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Clone'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r border-gray-300 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Print'),
                                    React.createElement('th', { className: 'py-2 px-3 text-left font-medium text-gray-600 border-r-0 whitespace-nowrap relative text-xs bg-gray-100 cursor-pointer overflow-hidden text-ellipsis w-[8%] hover:bg-gray-200' }, 'Delete')
                                )
                            ),
                            // Table Body - Empty, data will be populated from backend
                            React.createElement('tbody', null,
                                React.createElement('tr', null,
                                    React.createElement('td', { 
                                        colSpan: 9, 
                                        className: 'text-center text-gray-500 italic py-8 text-sm' 
                                    }, 'Loading templates...')
                                )
                            )
                        )
                    )
                )
            ),

            // Shared Orientation Popup Component
            React.createElement(OrientationPopup, {
                showOrientationPopup,
                isPopupMinimized,
                isPopupMaximized,
                setIsPopupMinimized,
                setIsPopupMaximized,
                setShowOrientationPopup,
                selectedOrientation,
                setSelectedOrientation,
                selectedTemplate
            })
        )
    );
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App)); 