import { useEffect, useState } from "react";
import Pagination from "src/components/Pagination";

const productsContainerStyle: React.CSSProperties = {
  display: "grid",
  margin: "20px",
  padding: "0px",
  listStyleType: "none",
  gap: "20px",
  gridTemplateColumns: "1fr 1fr 1fr",
};

const productStyles: React.CSSProperties = {
  height: "250px",
  padding: "20px",
  backgroundColor: "rgb(220, 220, 220)",
  textAlign: "center",
  borderRadius: "5px",
  cursor: "pointer",
  minWidth: 0,
  border: "1px solid #333",
};

const productImageStyles: React.CSSProperties = {
  width: "100%",
  height: "90%",
  marginBottom: "3px",
  objectFit: "contain",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const productLabelStyles: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  width: "100%",
};

const ExamplePagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Dynamic itemsPerPage - can be changed to any number thirogh a dropdown
  // TotalPages is useful when calling only 10 (or just a single page items which can be anything like 9, 12, 15 etc). Essesntially when we do not call all items in one go and call every page item
  // const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=200`);
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      // setTotalPages(Math.ceil(data.total / 10));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Reset to first page when itemsPerPage changes
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="App">
      <h2>React Pagination Component</h2>
      {products.length !== 0 && (
        <div style={productsContainerStyle}>
          {products
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(({ id, thumbnail, title }) => {
              return (
                <div style={productStyles} key={id}>
                  <img
                    style={productImageStyles}
                    src={thumbnail}
                    alt={"product-image"}
                  />
                  <div style={productLabelStyles}>{title}</div>
                </div>
              );
            })}
        </div>
      )}

      {products.length > 0 && (
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default ExamplePagination;
