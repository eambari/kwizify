'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface TabsContextProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextProps>({
    activeIndex: 0,
    setActiveIndex: () => {},
});

interface TabsProps {
    children: ReactNode;
    index?: number;
    onChange?: (index: number) => void;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
                                              children,
                                              index = 0,
                                              onChange,
                                              className = '',
                                          }) => {
    const [activeIndex, setActiveIndex] = useState(index);

    const handleTabChange = (index: number) => {
        setActiveIndex(index);
        if (onChange) {
            onChange(index);
        }
    };

    return (
        <TabsContext.Provider
            value={{
                activeIndex,
                setActiveIndex: handleTabChange
            }}
        >
            <div className={className}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

interface TabListProps {
    children: ReactNode;
    className?: string;
}

export const TabList: React.FC<TabListProps> = ({ children, className = '' }) => {
    return (
        <div role="tablist" className={className}>
            {children}
        </div>
    );
};

interface TabProps {
    children: ReactNode;
    index?: number;
    className?: string;
    activeClassName?: string;
}

export const Tab: React.FC<TabProps> = ({
                                            children,
                                            index: tabIndex,
                                            className = '',
                                            activeClassName = 'text-blue-600 border-blue-600'
                                        }) => {
    const { activeIndex, setActiveIndex } = useContext(TabsContext);

    // If tabIndex is not explicitly provided, determine it from the order in the TabList
    const actualIndex = tabIndex !== undefined ? tabIndex : React.Children.count(children) - 1;
    const isActive = activeIndex === actualIndex;

    return (
        <div
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveIndex(actualIndex)}
            className={`${className} ${isActive ? activeClassName : ''}`}
        >
            {children}
        </div>
    );
};

interface TabPanelProps {
    children: ReactNode;
    index?: number;
    className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
                                                      children,
                                                      index: panelIndex,
                                                      className = ''
                                                  }) => {
    const { activeIndex } = useContext(TabsContext);

    // If panelIndex is not explicitly provided, determine it from the order in the Tabs
    const actualIndex = panelIndex !== undefined ? panelIndex : 0;

    if (activeIndex !== actualIndex) {
        return null;
    }

    return (
        <div role="tabpanel" className={className}>
            {children}
        </div>
    );
};