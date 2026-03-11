import Page from "../../components/layout/Page";
import Checkout from "../../components/checkout/Checkout";

export default function CheckoutPage() {
  return (
    <Page>
      <h1>Kassa</h1>
      <p>Fyll i dina uppgifter för att slutföra din beställning.</p>
      <Checkout />
    </Page>
  );
}