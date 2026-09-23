export const restaurant = {
  name: 'Mesa',
  tagline: 'Modern Filipino food, made for the table.',
  description:
    'Mesa is a modern Filipino kitchen in the heart of Poblacion — heritage recipes cooked with intention, plated for the way we eat today: together, hands reaching across the table.',
  address: '112 Palanca Street, Poblacion, Makati City, 1210 Metro Manila',
  phone: '+63 2 8123 4567',
  email: 'kumain@mesa.ph',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },
  hours: [
    { day: 'Monday – Thursday', open: '11:00 AM', close: '10:00 PM' },
    { day: 'Friday – Saturday', open: '11:00 AM', close: '12:00 MN' },
    { day: 'Sunday', open: '10:00 AM', close: '10:00 PM' },
  ],
  // reservation config
  capacity: 60,
  maxPartySize: 12,
  slotMinutes: 90,
  timeSlots: [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM',
  ],
  blockedDates: ['2026-12-25', '2026-01-01'],
  // fees
  serviceFeeRate: 0.1, // 10%
  taxRate: 0.12, // 12% VAT
}
