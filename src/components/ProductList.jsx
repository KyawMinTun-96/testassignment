import React, { useState, useEffect } from 'react';
import productData from '../assets/json/products.json';


const ProductModal = ({ product, onClose, onToggleStatus }) => {
    
  if (!product) return null;

  return (
    <div className="modal">
        <div className="modal-content w-50">
            <div
                className="modal-header"
                style={{
                backgroundColor: product.status === 'active' ? 'green' : 'red',
                color: '#fff',
                }}
            >
            <h2 className='fs-8'>{product.name}</h2>
            <button className='btn text-white' onClick={onClose}>Close</button>
        </div>

        <div className="modal-body">
          <img src={product.image} alt={product.name} />
          <p>Quantity: {product.quantity}</p>
          <p>Status: {product.status}</p>
          <button className='btn btn-secondary' onClick={() => onToggleStatus(product)}>Edit Status</button>
        </div>
        </div>
    </div>
  );
};


const ProductList = () => {

    let maxItemCount = 5;
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setProductList(productData);
    }, []);


    const handleItemClick = (item) => {
        setSelectedProduct(item);
    };


    const handleCloseModal = () => {
        setSelectedProduct(null);
    };


    const handleToggleStatus = (product) => {
        const updatedList = productList.map((item) =>
        item.name === product.name
            ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
            : item
        );
        setProductList(updatedList);
        setSelectedProduct(null); 
    };


    const handleAddProduct = () => {

        if (productList.length >= maxItemCount) {
            alert(`Cannot add more than ${maxItemCount} products.`);
            return;
        }

        const newProduct = {
            id: productList.length + 1,
            name: `Product ${productList.length + 1}`,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
            status: 'active',
        };

        setProductList([...productList, newProduct]);
    };

    return (
        <div className="product-list mb-5">
        <h2 className='text-center'>Product List</h2>
        <ul>
            {productList.map((item, index) => (
            <li className='flex justify-content-between align-items-center' key={index} onClick={() => handleItemClick(item)}>
                <p className='m-0'><img src={item.image} alt={item.name} />{item.name}</p>
                <p className='m-0' style={{width: '120px'}}>Quantity: {item.quantity}</p>
                <p className='m-0' style={{width: '120px', color: item.status === 'active' ? 'green' : 'red'}}>Status: {item.status}</p>
            </li> 
            ))}
        </ul>
        <button className='btn btn-primary' onClick={handleAddProduct}>Add</button>
        <ProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onToggleStatus={handleToggleStatus}
        />
        </div>
    );
};

export default ProductList;
