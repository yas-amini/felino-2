import "./OpeningHours.css";

type OpeningHourItem = {
  day: string;
  time: string;
};

type OpeningHoursProps = {
  hours: OpeningHourItem[];
};

export default function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <div className="openingHoursContent">
      <h2 className="openingTitle">ÖPPETTIDER</h2>

      <div className="hoursList">
        {hours.map((item) => (
          <div className="hoursBlock" key={item.day}>
            <span className="hoursDay">{item.day}</span>
            <strong className="hoursTime">{item.time}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}