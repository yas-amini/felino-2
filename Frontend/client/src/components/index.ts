/**
 * =========================================================
 * LÄGG TILL DETTA PÅ VARJE SIDA (GLOBAL STANDARD)
 * =========================================================
 *
 * IMPORTERA DETTA:
 *
 * import { Page, Container, Button } from "@/components";
 *
 *
 * =========================================================
 * BASSTRUKTUR (MED CONTAINER) – STANDARD
 * =========================================================
 *
 * export default function ExamplePage() {
 *   return (
 *     <Page>
 *       <Container>
 *
 *         // Skriv din sida här inne
 *
 *       </Container>
 *     </Page>
 *   );
 * }
 *
 *
 * =========================================================
 * BASSTRUKTUR (UTAN CONTAINER)
 * =========================================================
 *
 * export default function ExamplePage() {
 *   return (
 *     <Page>
 *
 *       // Skriv din sida här inne
 *
 *     </Page>
 *   );
 * }
 *
 *
 * =========================================================
 * SKILLNAD (ENKELT)
 * =========================================================
 *
 * MED Container
 * - innehållet får maxbredd
 * - centreras automatiskt
 * - används på de flesta sidor
 *
 * UTAN Container
 * - innehållet går full bredd
 * - bra för hero, bilder, banners
 *
 *
 * =========================================================
 * SNABBA EXEMPEL
 * =========================================================
 *
 * KNAPP:
 *
 * <Button>Lägg till i varukorg</Button>
 *
 *
 * SUBMIT:
 *
 * <Button type="submit">Spara</Button>
 *
 *
 * LÄNK:
 *
 * <Button to="/cartpage">Till varukorg</Button>
 *
 *
 * =========================================================
 * VIKTIGT
 * =========================================================
 *
 * Skriv inte egna <button>
 * använd alltid <Button>
 *
 * Lägg inte Navbar/Footer på pages
 * de ligger redan globalt
 *
 * Page = spacing + layout
 * Container = maxbredd + centrering
 *
 * =========================================================
 */


/* =========================
   EXPORTS
========================= */

export { default as Button } from "./common/Button/Button";
export { default as Modal } from "./common/Modal/Modal";

export { default as Container } from "./layout/Container";
export { default as Navbar } from "./layout/Navbar";
export { default as Footer } from "./layout/Footer";
export { default as Page } from "./layout/Page";

export { default as Logo } from "./Logo";

export { default as Booking } from "./booking/Booking";
export { default as Cart } from "./cart/Cart";
export { default as Checkout } from "./checkout/Checkout";