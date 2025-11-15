const express = require('express');
const app = express();
const PORT = 3000;

const mockFlights = [
  { id: 1, from: "NYC", to: "LAX", price: 299, date: "2024-01-15", time: "06:00", carrier: "American Airlines", carrierCode: "AA", carrierLogo: "https://static.dezeen.com/uploads/2013/01/dezeen_American-Airlines-logo-and-livery_4a.jpg" },
  { id: 2, from: "NYC", to: "LAX", price: 349, date: "2024-01-15", time: "10:30", carrier: "Delta Air Lines", carrierCode: "DL", carrierLogo: "https://www.tramatm.com/_next/image?url=https%3A%2F%2Ftrama-static.s3.eu-central-1.amazonaws.com%2Fimages%2Fhall-of-fame%2Flogos%2F141-logo.png&w=3840&q=75" },
  { id: 3, from: "NYC", to: "LAX", price: 279, date: "2024-01-15", time: "14:15", carrier: "JetBlue Airways", carrierCode: "B6", carrierLogo: "https://1000logos.net/wp-content/uploads/2019/12/JetBlue-Airways-Logo.png" },
  { id: 4, from: "NYC", to: "LAX", price: 329, date: "2024-01-15", time: "18:45", carrier: "United Airlines", carrierCode: "UA", carrierLogo: "https://1000logos.net/wp-content/uploads/2017/06/United-logo.jpg" },
  { id: 5, from: "NYC", to: "LAX", price: 389, date: "2024-01-15", time: "22:20", carrier: "Alaska Airlines", carrierCode: "AS", carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Alaska_Airlines_logo.svg/1280px-Alaska_Airlines_logo.svg.png" },
  { id: 6, from: "LAX", to: "DXB", price: 650, date: "2024-01-16", time: "08:00", carrier: "Emirates", carrierCode: "EK", carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" },
  { id: 7, from: "LAX", to: "DXB", price: 720, date: "2024-01-16", time: "13:30", carrier: "United Airlines", carrierCode: "UA", carrierLogo: "https://1000logos.net/wp-content/uploads/2017/06/United-logo.jpg" },
  { id: 8, from: "LAX", to: "DXB", price: 680, date: "2024-01-16", time: "16:45", carrier: "Qatar Airways", carrierCode: "QR", carrierLogo: "https://e7.pngegg.com/pngimages/235/965/png-clipart-qatar-airways-logo-airline-oryx-others-text-logo-thumbnail.png" },
  { id: 9, from: "LAX", to: "DXB", price: 590, date: "2024-01-16", time: "23:15", carrier: "Turkish Airlines", carrierCode: "TK", carrierLogo: "https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png" },
  { id: 10, from: "DXB", to: "ADD", price: 450, date: "2024-01-17", time: "07:30", carrier: "Emirates", carrierCode: "EK", carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" },
  { id: 11, from: "DXB", to: "ADD", price: 420, date: "2024-01-17", time: "11:00", carrier: "Ethiopian Airlines", carrierCode: "ET", carrierLogo: "https://play-lh.googleusercontent.com/xKrVSAjdWVd-sB3F8vX93DamNvqZoXtH2bjjSLhK7PgSop9ggjNIh_qSblsv7aMM61M" },
  { id: 12, from: "DXB", to: "ADD", price: 480, date: "2024-01-17", time: "15:20", carrier: "flydubai", carrierCode: "FZ", carrierLogo: "https://1000logos.net/wp-content/uploads/2020/04/FlyDubai-Logo.jpg" },
  { id: 13, from: "DXB", to: "ADD", price: 390, date: "2024-01-17", time: "19:45", carrier: "Air Arabia", carrierCode: "G9", carrierLogo: "https://1000logos.net/wp-content/uploads/2021/04/Air-Arabia-logo.png" },
  { id: 14, from: "NYC", to: "ADD", price: 850, date: "2024-01-18", time: "09:15", carrier: "Ethiopian Airlines", carrierCode: "ET", carrierLogo: "https://play-lh.googleusercontent.com/xKrVSAjdWVd-sB3F8vX93DamNvqZoXtH2bjjSLhK7PgSop9ggjNIh_qSblsv7aMM61M" },
  { id: 15, from: "NYC", to: "ADD", price: 920, date: "2024-01-18", time: "14:30", carrier: "Turkish Airlines", carrierCode: "TK", carrierLogo: "https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png" },
  { id: 16, from: "NYC", to: "ADD", price: 780, date: "2024-01-18", time: "17:00", carrier: "Qatar Airways", carrierCode: "QR", carrierLogo: "https://e7.pngegg.com/pngimages/235/965/png-clipart-qatar-airways-logo-airline-oryx-others-text-logo-thumbnail.png" },
  { id: 17, from: "NYC", to: "ADD", price: 890, date: "2024-01-18", time: "21:45", carrier: "Emirates", carrierCode: "EK", carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" }
];

app.get('/api/flights', (req, res) => {
  let flights = [...mockFlights];
  
  const { from, to, carrier, maxPrice } = req.query;
  
  if (from) flights = flights.filter(f => f.from.toLowerCase() === from.toLowerCase());
  if (to) flights = flights.filter(f => f.to.toLowerCase() === to.toLowerCase());
  if (carrier) flights = flights.filter(f => f.carrierCode.toLowerCase() === carrier.toLowerCase());
  if (maxPrice) flights = flights.filter(f => f.price <= parseInt(maxPrice));
  
  if (flights.length === 0) {
    return res.json({ message: "No flights found", flights: [] });
  }
  
  res.json({ flights });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});