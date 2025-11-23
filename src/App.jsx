import ShoppingCart from './ShoppingCart';

function App() {
  const products = [ { id: 1, name: 'Laptop', price: 999 },
                      { id: 2, name: 'Phone', price: 599 },
                      { id: 3, name: 'Headphones', price: 199 } 
                    ];

  return (
    <>
      <ShoppingCart products={products} />
    </>
  )
}

export default App
