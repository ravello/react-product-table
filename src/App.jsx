import { useState } from 'react'
import './App.css'

// component for product row
function ProductRow({ product }) {

  // if product is in stock, store product as black
  // if product is not in stock, make product red
  let name = product.stocked ? product.name :
    <span style={{ color:'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// component for product category row
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductTable({ filterText, inStockOnly, products }) {
  // define rows using products
  // intialize rows as an empty array
  const rows = [];

  // keep track of the last category we use
  let lastCategory = null;

  // iterate through the product array passed from the parent
  products.forEach((product) => {

    // if the product name is not found in the value input into the filter text at all
    if (product.name.toLowerCase().indexOf(
      filterText.toLowerCase()
      ) === -1 
    ) {
      return;  // return early, don't input into row
    }

    // if we only want to look at instock products, and the product isn't in stock
    if (inStockOnly && !product.stocked) {
      return;  // return early, don't input into row
    }

    // check if the category doesn't match the last category
    if (product.category !== lastCategory){
      rows.push(  // if so, we push a new category (this assumes the PRODUCTS array we're given is sorted by category)
      <ProductCategoryRow
       category={product.category}
       key={product.category} />
      );
    }
    // nonetheless, push a product for every product
    rows.push(
      <ProductRow 
      product={product}
      key={product.name} />
    );
    lastCategory = product.category; 
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ 
  filterText, 
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {

  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder='Search...'
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  // since the searchbar displays the states
  // and the producttable uses the states
  // the states live here, in their common parent
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
    </div>
  );
}

export default function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];