import React, { useState, useMemo, useEffect } from 'react';
import { Col, Row} from 'reactstrap';

const CategoriesDropdown = ({ data }) => {
  const [level1Categories, setLevel1Categories] = useState([]);
  const [level2And3Categories, setLevel2And3Categories] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState(null);

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

    // Combine Level 2 and Level 3 categories into a single list
    const level2And3 = selectedCategory?.subCategories?.$values.flatMap((subCategory) => [
      {
        id: subCategory.categoryID,
        code: subCategory.categoryCode,
        name: subCategory.categoryName,
      },
      ...(subCategory.subCategories?.$values || []).map((nestedSubCategory) => ({
        id: nestedSubCategory.categoryID,
        code: nestedSubCategory.categoryCode,
        name: nestedSubCategory.categoryName,
      })),
    ]) || [];

    // Sort combined list alphabetically by categoryCode
    const sortedLevel2And3 = level2And3.sort((a, b) => a.code.localeCompare(b.code));
    setLevel2And3Categories(sortedLevel2And3);
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
          <label htmlFor="level2And3">Sub Sector / Category</label>
          <select id="level2And3">
            <option value="">Select Sub Sector</option>
            {level2And3Categories.map((subCategory) => (
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
