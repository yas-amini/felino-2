import Page from "../../components/layout/Page";
import Cart from "../../components/cart/Cart";

export default function CartPage() {
  return (
    <Page>
      <h1>Varukorg</h1>
      <p>Här ser du dina valda produkter innan du går vidare till kassan.</p>
      <Cart />
    </Page>
  );
}