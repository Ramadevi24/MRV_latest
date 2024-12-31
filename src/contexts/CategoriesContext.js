// CategoriesContext.js
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { OrganizationContext } from './OrganizationContext';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const { categories } = useContext(OrganizationContext);
  const data = categories
  const [level1Categories, setLevel1Categories] = useState([]);
  const [level2Categories, setLevel2Categories] = useState([]);
  const [level3Categories, setLevel3Categories] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);

  // Preprocess and sort data
  const preprocessData = (data) => {
    const filterAndSortCategories = (categories) => {
      return categories
        .filter((category) => category.subCategories?.$values?.length > 0) // Remove categories with empty subcategories
        .map((category) => ({
          ...category,
          subCategories: {
            ...category.subCategories,
            $values: filterAndSortCategories(category.subCategories.$values), // Recursively filter and sort subcategories
          },
        }))
        .sort((a, b) => a.categoryCode.localeCompare(b.categoryCode)); // Sort alphabetically by categoryCode
    };

    return filterAndSortCategories(data);
  };

  const processedData = useMemo(() => preprocessData(data), [data]);

  // Initialize Level 1 categories
  useEffect(() => {
    const level1 = processedData.map((item) => ({
      id: item.categoryID,
      code: item.categoryCode,
      name: item.categoryName,
    }));
    setLevel1Categories(level1);
  }, [processedData]);

  // Handle Level 1 selection
  const handleLevel1Change = (selectedId) => {
    setSelectedLevel1(selectedId);

    const selectedCategory = processedData.find((item) => item.categoryID === selectedId);

    // Populate Level 2 categories
    const level2 = selectedCategory?.subCategories?.$values.map((subCategory) => ({
      id: subCategory.categoryID,
      code: subCategory.categoryCode,
      name: subCategory.categoryName,
      subCategories: subCategory.subCategories?.$values || [], // Save Level 3 categories
    })) || [];

    setLevel2Categories(level2);
    setSelectedLevel2(null); // Reset Level 2 and Level 3
    setLevel3Categories([]);
  };

  // Handle Level 2 selection
  const handleLevel2Change = (selectedId) => {
    setSelectedLevel2(selectedId);

    const selectedCategory = level2Categories.find((item) => item.id === selectedId);

    // Populate Level 3 categories
    const level3 = selectedCategory?.subCategories.map((nestedSubCategory) => ({
      id: nestedSubCategory.categoryID,
      code: nestedSubCategory.categoryCode,
      name: nestedSubCategory.categoryName,
    })) || [];

    setLevel3Categories(level3);
  };

  return (
    <CategoriesContext.Provider
      value={{
        level1Categories,
        level2Categories,
        level3Categories,
        selectedLevel1,
        selectedLevel2,
        handleLevel1Change,
        handleLevel2Change,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
