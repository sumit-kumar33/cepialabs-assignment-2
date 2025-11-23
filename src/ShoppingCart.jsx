import { useState } from 'react';

export default function ShoppingCart({ products = [] }) {
	const [cart, setCart] = useState({}); // { [id]: quantity }

	const addToCart = (product) => {
		setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
	};

	const increaseQty = (productId) => {
		setCart((c) => ({ ...c, [productId]: (c[productId] || 0) + 1 }));
	};

	const decreaseQty = (productId) => {
		setCart((c) => {
			const next = { ...c };
			if (!next[productId]) return next;
			next[productId] = next[productId] - 1;
			if (next[productId] <= 0) delete next[productId];
			return next;
		});
	};

	const removeItem = (productId) => {
		setCart((c) => {
			const next = { ...c };
			delete next[productId];
			return next;
		});
	};

	const itemCount = Object.values(cart).reduce((s, q) => s + q, 0);
	const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

	return (
		<div className="shopping-cart">
			<section className="products">
				<h2 className="section-title">Products</h2>
				<ul className="product-list">
					{products.map((p) => (
						<li key={p.id} className="product-item">
							<div>
								<div className="product-name">{p.name}</div>
								<div className="product-price">${p.price.toFixed(2)}</div>
							</div>
							<button className="btn btn-add" onClick={() => addToCart(p)}>Add to Cart</button>
						</li>
					))}
				</ul>
			</section>

			<aside className="cart">
				<h2 className="section-title">Cart</h2>
				<div className="cart-summary">
					<div className="summary-item">Items: <strong>{itemCount}</strong></div>
					<div className="summary-item">Total: <strong>${total.toFixed(2)}</strong></div>
				</div>

				{itemCount === 0 ? (
					<p className="cart-empty">Your cart is empty.</p>
				) : (
					<ul className="cart-items">
						{products
							.filter((p) => cart[p.id])
							.map((p) => (
								<li key={p.id} className="cart-item">
									<div>
										<div className="product-name">{p.name}</div>
										<div className="product-price">{cart[p.id]} × ${p.price.toFixed(2)}</div>
									</div>
									<div className="cart-item-actions">
											<div className="qty-controls">
												<button className="btn btn-qty" onClick={() => decreaseQty(p.id)} aria-label={`decrease ${p.name}`}>
													−
												</button>
												<div className="qty">{cart[p.id]}</div>
												<button className="btn btn-qty" onClick={() => increaseQty(p.id)} aria-label={`increase ${p.name}`}>
													+
												</button>
											</div>
											<div className="line-total">${(p.price * cart[p.id]).toFixed(2)}</div>
											<button className="btn btn-remove" onClick={() => removeItem(p.id)}>Remove</button>
										</div>
								</li>
							))}
					</ul>
				)}
			</aside>
		</div>
	);
}
