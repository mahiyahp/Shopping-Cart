import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Context
import { ProductsContext } from '../context/ProductContextProvider';

// Style
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const params = useParams();
  const id = params.id;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setInfo(response.data);
      } catch (error) {
        console.log('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const data = useContext(ProductsContext);
  const product = data[id - 1];

  // Check if product data is available in context or fetched from API
  const { image, title, description, price, category } = product || info || {};

  if (!product && !info) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="product" />
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.category}><span>Category:</span> {category}</p>
        <div className={styles.buttonContainer}>
          <span className={styles.price}>{price} $</span>
          <Link to="/products">Back to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;