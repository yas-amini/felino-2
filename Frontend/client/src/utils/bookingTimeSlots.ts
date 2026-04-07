type OpeningHours = {
  start: string;
  end: string;
};

const openingHoursByDay: Record<number, OpeningHours> = {
  0: { start: "12:00", end: "21:00" }, // Söndag
  1: { start: "11:00", end: "21:00" }, // Måndag
  2: { start: "11:00", end: "21:00" }, // Tisdag
  3: { start: "11:00", end: "21:00" }, // Onsdag
  4: { start: "11:00", end: "21:00" }, // Torsdag
  5: { start: "11:00", end: "22:00" }, // Fredag
  6: { start: "11:00", end: "22:00" }, // Lördag
};

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTimeString(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getAvailableTimesForDate(
  dateString: string,
  intervalMinutes = 60
): string[] {
  if (!dateString) return [];

  const selectedDate = new Date(dateString);
  const dayOfWeek = selectedDate.getDay();
  const openingHours = openingHoursByDay[dayOfWeek];

  if (!openingHours) return [];

  const startMinutes = toMinutes(openingHours.start);
  const endMinutes = toMinutes(openingHours.end);

  const slots: string[] = [];

  for (
    let currentMinutes = startMinutes;
    currentMinutes <= endMinutes;
    currentMinutes += intervalMinutes
  ) {
    slots.push(toTimeString(currentMinutes));
  }

  return slots;
}