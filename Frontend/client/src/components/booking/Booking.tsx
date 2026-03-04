import BookTable from "./BookTable";
import HandleBooking from "./HandleBooking";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col mt-auto">
      <section>
        <h1 className="text-[2rem] font-semibold text-center p-4 mt-8 sm:text-[40px] lg:text-[56px]">
          Boka Bord
        </h1>

        <p className="text-[1rem] font-medium mx-4 text-center sm:max-w-3xl sm:mx-auto sm:text-[18px] lg:text-[20px]">
          Nu kan du enkelt boka bord hos oss direkt här på hemsidan. Välj datum,
          antal gäster, plats och tid – så ordnar vi resten.
        </p>
      </section>

      <BookTable />

      <section>
        <h1 className="text-[2rem] font-semibold text-center p-4 sm:text-[40px] lg:text-[56px]">
          Hantera din bokning
        </h1>

        <p className="text-[1rem] font-medium mx-4 text-center sm:max-w-3xl sm:mx-auto sm:text-[18px] lg:text-[20px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum minima
          assumenda esse molestiae dolore tenetur voluptatem adipisci dolorem.
          Velit, quos.
        </p>
      </section>

      <HandleBooking />
    </div>
  );
}
