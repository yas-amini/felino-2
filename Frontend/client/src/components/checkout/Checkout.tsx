import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";
import Button from "../common/Button/Button";

import "./Checkout.css";

type CustomerForm = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();


  const [form, setForm] = useState<CustomerForm>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Din varukorg är tom.</p>
        <Button to="/bestall">Gå till menyn</Button>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    // Phone — allow digits only, same as old project
    if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: value.replace(/[^0-9]/g, "") }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) {
      setErrorMsg("Ange ditt namn.");
      return;
    }
    if (!form.phone.trim()) {
      setErrorMsg("Ange ditt telefonnummer.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: form.name.trim(),
        customerAddress: form.address.trim(),
        customerPhone: form.phone.trim(),
        customerEmail: form.email.trim(),
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          extras: item.specialInstructions || ""
        }))
      };

      // 1. Create the Order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) {
        const error = await orderRes.text();
        throw new Error(error || "Misslyckades att skapa order.");
      }

      const order = await orderRes.json();

      // 2. Process the Payment (Simulated as "Card")
      const paymentData = {
        orderId: order.id,
        amount: order.total,
        paymentMethod: "Card"
      };

      const paymentRes = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!paymentRes.ok) {
        // We still have the order, but the payment failed. 
        const error = await paymentRes.text();
        console.error("Payment failed:", error);
      }

      // ─── Success ───
      clearCart();
      showNotification(`Tack ${form.name}! Din order #${order.id} är mottagen.`);
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Något gick fel – försök igen.";
      setErrorMsg(msg);
      showNotification(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout">
      {/* ── Order summary (right column on desktop) ── */}
      <div className="checkout-summary">
        <h2>Din beställning</h2>
        <ul className="checkout-summary-list">
          {cartItems.map((item) => (
            <li key={item.cartItemId} className="checkout-summary-item">
              <span className="checkout-summary-name">
                {item.name} <span className="checkout-summary-qty">×{item.quantity}</span>
              </span>
              <span className="checkout-summary-price">
                {(item.price * item.quantity).toFixed(2)} SEK
              </span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Totalt:</span>
          <strong>{cartTotal.toFixed(2)} SEK</strong>
        </div>
      </div>

      {/* ── Customer form (left column on desktop) ── */}
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h2>Dina uppgifter</h2>

        <div className="checkout-field">
          <label htmlFor="checkout-name">Namn *</label>
          <input
            id="checkout-name"
            name="name"
            type="text"
            placeholder="Ditt namn"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkout-field">
          <label htmlFor="checkout-address">Adress</label>
          <input
            id="checkout-address"
            name="address"
            type="text"
            placeholder="Din leveransadress"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="checkout-field">
          <label htmlFor="checkout-phone">Telefon *</label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="07XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkout-field">
          <label htmlFor="checkout-email">E-post</label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            placeholder="din@epost.se"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {errorMsg && <p className="checkout-error">{errorMsg}</p>}

        <Button
          type="submit"
          width="full"
          isLoading={isSubmitting}
        >
          Lägg beställning
        </Button>
      </form>
    </div>
  );
}