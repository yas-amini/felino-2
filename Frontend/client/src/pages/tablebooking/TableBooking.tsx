import MenuPage from "../../components/booking/MenuPage";
import Container from "../../components/layout/Container";

export default function TableBooking() {
  return (
    <Container>
      <h1>Boka Bord</h1>
      <p>Välj din favoritmat medan du bokar!</p>
      <MenuPage />
    </Container>
  );
}
