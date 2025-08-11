export function generateICSReminder() {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:TEDxHITAM Theme Reveal",
    "DESCRIPTION:The big reveal is happening! Don’t miss it!",
    "DTSTART:20250718T093000Z",  // 3:00 PM IST = 9:30 AM UTC
    "DTEND:20250718T100000Z",
    "LOCATION:TEDxHITAM Event Page",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "DESCRIPTION:Reminder",
    "ACTION:DISPLAY",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "TEDxHITAM-Theme-Reveal.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}