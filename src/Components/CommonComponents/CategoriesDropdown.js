import React, { useState, useMemo, useEffect } from 'react';
import { Col, Row } from 'reactstrap';

const CategoriesDropdown = ({ data }) => {
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
  const handleLevel1Change = (event) => {
    const selectedId = parseInt(event.target.value, 10);
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
  const handleLevel2Change = (event) => {
    const selectedId = parseInt(event.target.value, 10);
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
    <Row>
      <Col md={6}>
        <div className="form-field">
          <label htmlFor="level1">Sector</label>
          <select id="level1" onChange={handleLevel1Change}>
            <option value="">Select Sector</option>
            {level1Categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.code} - {category.name}
              </option>
            ))}
          </select>
        </div>
      </Col>

      <Col md={6}>
        <div className="form-field">
          <label htmlFor="level2">Sub Sector</label>
          <select id="level2" onChange={handleLevel2Change} disabled={!level2Categories.length}>
            <option value="">Select Sub Sector</option>
            {level2Categories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.code} - {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      </Col>

      <Col md={6}>
        <div className="form-field">
          <label htmlFor="level3">Category</label>
          <select id="level3" disabled={!level3Categories.length}>
            <option value="">Select Category</option>
            {level3Categories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.code} - {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      </Col>
    </Row>
  );
};

export default CategoriesDropdown;
