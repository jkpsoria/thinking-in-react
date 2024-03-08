"use client";

import { useState } from "react";

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ textDecoration: "line-through", color: "red" }}>
      {product.name}
    </span>
  );

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="thead">
        {category}
      </th>
    </tr>
  );
}

function ProductTable({ products, filterText, inStocked }) {
  const rows = [];
  let lastCategory = null;

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((product) => !inStocked || (inStocked && product.stocked));

  filteredProducts.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.name} />);
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="thead">
              <h5>Name</h5>
            </th>
            <th className="thead">
              <h5>Price</h5>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

function SearchBar({ filterText, inStocked, onFilterChange, onStockChange }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />{" "}
      <br></br>
      <label>
        <input
          type="checkbox"
          checked={inStocked}
          onChange={(e) => onStockChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStocked, setInStocked] = useState();

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStocked={inStocked}
        onFilterChange={setFilterText}
        onStockChange={setInStocked}
      />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inStocked={inStocked}
      />
    </>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function Home() {
  return (
    <>
      <div className="main">
        <h1>Product Search</h1>
        <FilterableProductTable products={PRODUCTS} />
      </div>
    </>
  );
}
