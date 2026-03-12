import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "../common/Button/Button";
import "./Cart.css";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p>Din varukorg är tom.</p>
        <Button to="/bestall">Gå till menyn</Button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.cartItemId} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                {Number(item.price).toFixed(2)} SEK / st
              </p>
              {item.specialInstructions && (
                <p className="cart-item-instructions">
                  <em>Specialinstruktioner: {item.specialInstructions}</em>
                </p>
              )}
              <div className="cart-item-qty">
                <label>Antal:</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.cartItemId,
                      parseInt(e.target.value, 10) || 1,
                    )
                  }
                />
              </div>
              <p className="cart-item-subtotal">
                Summa: {(item.price * item.quantity).toFixed(2)} SEK
              </p>
            </div>

            <div className="cart-item-actions">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeFromCart(item.cartItemId)}
              >
                Ta bort
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Totalt:</span>
          <span className="cart-total-amount">{cartTotal.toFixed(2)} SEK</span>
        </div>
        <div className="cart-actions">
          <Button variant="ghost" to="/bestall">
            Fortsätt handla
          </Button>
          <Button onClick={() => navigate("/checkout")}>Gå till kassan</Button>
        </div>
      </div>
    </div>
  );
}
