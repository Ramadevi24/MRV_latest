import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSubItem, setCurrentSubItem] = useState(null);
  const [activeLabel, setActiveLabel] = useState('');

  const handleItemClick = (item) => {
    setCurrentItem(item);
    setCurrentSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setCurrentSubItem(subItem);
  };

  return (
    <MenuContext.Provider value={{ currentItem, currentSubItem, handleItemClick, handleSubItemClick,activeLabel, setActiveLabel }}>
      {children}
    </MenuContext.Provider>
  );
};

