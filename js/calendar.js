/* ============================================================
   BIGDOG — Static Availability Calendar
   Edit the BOOKINGS and PRICES objects below to update the site.
   ============================================================ */

// --- Configuration: edit these to update availability ---

// Booked date ranges (inclusive). Format: ['YYYY-MM-DD', 'YYYY-MM-DD']
const BOOKINGS = [
  // Exempel:
  // ['2026-06-28', '2026-07-05'],
  // ['2026-07-12', '2026-07-19'],
  // ['2026-12-22', '2027-01-02'],
];

// How many months ahead to show (from current month)
const MONTHS_TO_SHOW = 6;

// Swedish day names (Mon-Sun)
const DAY_NAMES = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
  'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
];

// --- Helpers ---

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function isBooked(date) {
  const time = date.getTime();
  return BOOKINGS.some(([start, end]) => {
    return time >= parseDate(start).getTime() && time <= parseDate(end).getTime();
  });
}

function isToday(date) {
  const now = new Date();
  return date.getFullYear() === now.getFullYear() &&
         date.getMonth() === now.getMonth() &&
         date.getDate() === now.getDate();
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Monday = 0 ... Sunday = 6  (ISO week)
function dayOfWeekMon(date) {
  return (date.getDay() + 6) % 7;
}

// --- Render ---

function renderCalendar() {
  const container = document.getElementById('calendar-months');
  if (!container) return;

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  let html = '';

  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    const m = (month + i) % 12;
    const y = year + Math.floor((month + i) / 12);
    html += renderMonth(y, m);
  }

  container.innerHTML = html;
}

function renderMonth(year, month) {
  const total = daysInMonth(year, month);
  const firstDay = dayOfWeekMon(new Date(year, month, 1));

  let html = `<div class="cal-month">
    <div class="cal-month-title">${MONTH_NAMES[month]} ${year}</div>
    <div class="cal-grid">`;

  // Day headers
  DAY_NAMES.forEach(d => {
    html += `<div class="day-header">${d}</div>`;
  });

  // Empty cells before first day
  for (let e = 0; e < firstDay; e++) {
    html += `<div class="day empty"></div>`;
  }

  // Days
  for (let d = 1; d <= total; d++) {
    const date = new Date(year, month, d);
    const past = date < new Date(new Date().toDateString());
    let cls = 'day';
    if (past) {
      cls += ' empty';
    } else if (isBooked(date)) {
      cls += ' booked';
    } else {
      cls += ' available';
    }
    if (isToday(date)) cls += ' today';
    html += `<div class="${cls}">${d}</div>`;
  }

  html += `</div></div>`;
  return html;
}

// --- Init ---
document.addEventListener('DOMContentLoaded', renderCalendar);
