"use client";
import styled from 'styled-components';
import { useState } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Login from './components/Login';

const products = [
  {
    id: 1,
    name: 'Pozole',
    price: 105,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNPUUyIVMbm2ov3jlpf7EOBz3BAW5uDUmWsw&s',
  },
  {
    id: 2,
    name: 'Enchiladas',
    price: 105,
    image: 'https://cocinamia.com.mx/wp-content/uploads/2020/02/b-07-1100x500.png',
  },
  {
    id: 3,
    name: 'Chilaquiles',
    price: 97,
    image: 'https://patijinich.com/es/wp-content/uploads/sites/3/2017/07/207-chilaquiles-verdes.jpg',
  },
  {
    id: 4,
    name: 'Flautas (Orden de 3)',
    price: 110,
    image: 'https://sabrosano.com/wp-content/uploads/2020/05/Flautas_res_principal.jpg',
  },
  {
    id: 5,
    name: 'Sope',
    price: 69,
    image: 'https://patijinich.com/es/wp-content/uploads/sites/3/2017/12/610-sopes.jpg',
  },
  {
    id: 6,
    name: 'Tacos de suadero (Orden de 3)',
    price: 105,
    image: 'https://www.cocinadelirante.com/sites/default/files/images/2024/03/tacos-de-bistec-con-papas-estilo-taqueria-receta-rendidora.jpg',
  },
  {
    id: 7,
    name: 'Tostada',
    price: 50,
    image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/414b1e83-1119-40df-ad25-9c3a01f9e1c7/Derivates/b67635ea-e63e-4b9e-9542-2275cd25f429.jpg',
  },
  {
    id: 8,
    name: 'Molletes (Orden de 3)',
    price: 85,
    image: 'https://i.blogs.es/22aed8/dap-1-64-/1366_2000.jpg',
  },
  {
    id: 9,
    name: 'Enfrijoladas',
    price: 105,
    image: 'https://healthysimpleyum.com/wp-content/uploads/2022/01/Enfrijoladas-3-scaled-1-683x1024.jpg',
  },
  {
    id: 10,
    name: 'Vaso de agua de horchata',
    price: 29,
    image: 'https://www.recetasnestle.com.mx/sites/default/files/srh_recipes/1c06b340734ce162966b6e4847497f52.jpeg',
  },
  {
    id: 11,
    name: 'Vaso de agua de jamaica',
    price: 29,
    image: 'https://cdn7.kiwilimon.com/recetaimagen/3630/640x640/15252.jpg.webp',
  },
  {
    id: 12,
    name: 'Rebanada de pastel de chocolate',
    price: 45,
    image: 'https://sarasellos.com/wp-content/uploads/2024/03/pastel-chocolate.jpeg',
  },
  {
    id: 13,
    name: 'Helado de vainilla',
    price: 39,
    image: 'https://comedera.com/wp-content/uploads/sites/9/2022/05/Helado-de-vainilla-sin-azucar.jpg',
  },
  {
    id: 14,
    name: 'Helado napolitano',
    price: 39,
    image: 'https://i.pinimg.com/originals/a9/6f/63/a96f63c3f5b05838e0335752a1432454.jpg',
  },
  {
    id: 15,
    name: 'Quesadilla',
    price: 35,
    image: 'https://mexico10.org/wp-content/uploads/2020/07/quesadillas-jam%C3%B3n-serrano-758x559.jpg',
  },
];

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2rem;
  gap: 2rem;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const CartButton = styled.button`
  float: right;
  background-color: black;
  color: white;
  text-align: center;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color:rgba(4, 133, 26, 0.76);
  }

  @media (max-width: 768px) {
    float: none;
    text-align: center;
  }
`;

const TopBar = styled.div`
  display: flex;
  height: 120px;
  width: auto;
  align-items: center;
  justify-content: center;
  background-color: orange;
  padding: 1rem;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
  position: absolute;
  left: 1rem;
`;

const Title = styled.h1`
  font-style: italic;
  margin: 0;
`;

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <TopBar>
        <Logo src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo%2Crestaurant-icon-logo-free-design-template-e4e92c7d3b5631a777fce7a5d629a00a_screen.jpg?ts=1662468709" />
        <Title>Antojitos Mexicanos</Title>
      </TopBar>
      {user.position === 'gerente' && (
        <NavBar toggleCartVisibility={toggleCartVisibility} isCartVisible={isCartVisible} />
      )}
      <CartButton onClick={toggleCartVisibility}>
        {isCartVisible ? 'Cerrar Carrito' : 'Abrir Carrito'}
      </CartButton>
      <Container>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </Container>

      {isCartVisible && (
        <CartContainer>
          <Cart cartItems={cart} removeFromCart={removeFromCart} />
        </CartContainer>
      )}
    </div>
  );
}
