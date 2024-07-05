# Medical Search BOT (Backend)

This Node.js server is used for retrieving specialty and doctor details via API. It connects to a PostgreSQL database to store information about specialties and doctors. Using the API, you can retrieve all doctor details based on their specialties.

## Tech Stack

Node.js, Express, Morgan, pg-pool

## Usage

1. Clone the repository

   ```
   git clone https://github.com/anas-mullappally/SearchBot_Backend
   ```

2. Install Dependencies:
   ```
      cd SearchBot_Backend
      npm install
   ```
3. Setup Environment Variables

   1. Create a .env.local file in the root directory of your project.
   2. Add the following environment variables to the .env.local file:

   ```
       PORT = 5000
       PGHOST=
       PGDATABASE=
       PGUSER=
       PGPASSWORD=
       PGPORT = 5432
   ```

   Replace the placeholder values (your_pg_host,pg_password, etc..) with the actual values from your [Neon.tech](https://neon.tech) project.

4. Run the project

   ```bash
       npm run dev
   ```

   The project will run in [http://localhost:3000](http://localhost:5000)

## Routes

#### 1. `GET` /api/doctors/

**Description:**
Retrieve all the details of doctors relevant to the specified specialty.

**Request:**

- Method: `GET`
- URL: `/api/doctors/:speciality `
- Headers: None

**Response:**

- Status Code: `200 OK`
  - Body:
    ```json
    { "success":true, "message": "success", "speciality":{ "details of the speciality" }, "doctors":["doctor1","doctor2","etc..."] }
    ```
- Status Code: `400 Bad Request`
  - Body:
    ```json
    { "message": "speciality is required" }
    ```
- Status Code: `500 Internal Server Error`
  - Body:
    ```json
    { "message": "Internal Server Error" }
    ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
