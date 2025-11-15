# Flight API Documentation

## Overview
This REST API provides flight search functionality for mobile applications. It returns mock flight data with filtering capabilities for building flight booking apps.

## Base URL
```
http://localhost:3000
```

## Authentication
No authentication required for this mock API.

## Content Type
All responses are in JSON format with `Content-Type: application/json`.

## Endpoints

### GET /api/flights
Returns a list of available flights with optional filtering parameters. This endpoint supports multiple query parameters that can be combined for precise flight searches.

#### Query Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `from` | string | Departure airport code | `NYC`, `LAX`, `DXB`, `ADD` |
| `to` | string | Destination airport code | `NYC`, `LAX`, `DXB`, `ADD` |
| `carrier` | string | Airline carrier code | `AA`, `DL`, `UA`, `ET`, `EK` |
| `maxPrice` | number | Maximum price filter | `500`, `800` |

#### Response Format
**Success Response (200 OK):**
```json
{
  "flights": [
    {
      "id": 1,
      "from": "NYC",
      "to": "LAX", 
      "price": 299,
      "date": "2024-01-15",
      "time": "06:00",
      "carrier": "American Airlines",
      "carrierCode": "AA",
      "logoCode": "AA"
    }
  ]
}
```

**Response Fields:**
- `id` (number): Unique flight identifier
- `from` (string): Departure airport code
- `to` (string): Destination airport code
- `price` (number): Flight price in USD
- `date` (string): Flight date in YYYY-MM-DD format
- `time` (string): Departure time in HH:MM format (24-hour)
- `carrier` (string): Full airline name
- `carrierCode` (string): IATA airline code
- `logoCode` (string): Code for airline logo (same as carrierCode)

#### Empty Results (200 OK)
When no flights match the search criteria:
```json
{
  "message": "No flights found",
  "flights": []
}
```

#### Error Handling
- **400 Bad Request**: Invalid query parameters
- **500 Internal Server Error**: Server error

Always check the `flights` array length to determine if results were found.

## Parameter Usage Examples

### Get All Flights
```
GET /api/flights
```
Returns all available flights without any filtering.

### Filter by Departure City
```
GET /api/flights?from=NYC
```
Returns all flights departing from New York (5 flights on 2024-01-15).

### Filter by Destination City
```
GET /api/flights?to=LAX
```
Returns all flights going to Los Angeles.

### Filter by Specific Route
```
GET /api/flights?from=NYC&to=LAX
```
Returns flights from New York to Los Angeles (5 flights with different times and prices).

### Filter by Airline Carrier
```
GET /api/flights?carrier=AA
```
Returns only American Airlines flights.

```
GET /api/flights?carrier=ET
```
Returns only Ethiopian Airlines flights.

### Filter by Maximum Price
```
GET /api/flights?maxPrice=300
```
Returns flights under $300.

```
GET /api/flights?maxPrice=500
```
Returns flights under $500.

### Combined Parameter Examples
```
GET /api/flights?from=NYC&to=LAX&maxPrice=350
```
Returns NYC to LAX flights under $350 (3 flights).

```
GET /api/flights?from=NYC&carrier=AA
```
Returns American Airlines flights from NYC.

```
GET /api/flights?to=DXB&maxPrice=600&carrier=EK
```
Returns Emirates flights to Dubai under $600.

```
GET /api/flights?from=LAX&to=DXB&carrier=QR&maxPrice=700
```
Returns Qatar Airways flights from LAX to DXB under $700.

### Empty Result Examples
```
GET /api/flights?from=INVALID
```
Returns "No flights found" message.

```
GET /api/flights?maxPrice=100
```
Returns "No flights found" (no flights under $100).

```
GET /api/flights?carrier=XX
```
Returns "No flights found" (invalid carrier code).

## Available Airports
- **NYC** - New York
- **LAX** - Los Angeles  
- **DXB** - Dubai
- **ADD** - Addis Ababa

## Available Carriers
- **AA** - American Airlines
- **DL** - Delta Air Lines
- **UA** - United Airlines
- **ET** - Ethiopian Airlines
- **EK** - Emirates
- **B6** - JetBlue Airways
- **AS** - Alaska Airlines
- **QR** - Qatar Airways
- **TK** - Turkish Airlines
- **FZ** - flydubai
- **G9** - Air Arabia

## Parameter Notes
- All parameters are case-insensitive
- Parameters can be combined in any order
- Invalid parameters are ignored
- Empty parameters return all flights
- Multiple flights available for same route with different times and prices

## Mobile App Integration Tips
1. **Caching**: Cache flight data locally for better performance
2. **Error Handling**: Always handle empty results and network errors
3. **Loading States**: Show loading indicators during API calls
4. **Offline Mode**: Consider storing recent searches offline
5. **Image Assets**: Use `logoCode` to display airline logos in your app