import pool from "../config/db.js";

export const getSpecialtyAndDoctors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Doctors");
    res.json(result.rows);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
