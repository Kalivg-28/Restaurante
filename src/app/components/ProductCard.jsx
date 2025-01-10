"use client";

import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  width: calc(100% / 4 - 2rem);
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: calc(100% / 3 - 2rem);
  }

  @media (max-width: 768px) {
    width: calc(100% / 2 - 2rem);
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 1rem 0;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px; /* Ajusta la altura según sea necesario */
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button onClick={() => addToCart(product)}>Añadir al Pedido</Button>
    </Card>
  );
};

export default ProductCard;
