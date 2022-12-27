import React from 'react';
import { useParams } from 'react-router-dom';

import { Container } from './styles';

const Shop: React.FC = () => {
  const { shopName } = useParams();

  return (
    <Container>
      <h1>Shop {shopName}</h1>
    </Container>
  );
};

export default Shop;
