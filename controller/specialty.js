import pool from "../config/db.js";

export const getSpecialityAndDoctors = async (req, res) => {
  try {
    const { speciality } = req.params;

    if (!speciality) {
      return res
        .status(400)
        .json({ success: false, message: "speciality is required" });
    }

    const specialties = [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatric",
      "ENT",
    ];

    if (!specialties.includes(speciality)) {
      return res.status(400).json({
        success: false,
        message:
          "Specialty must be one of Cardiology, Neurology, Orthopedics, Pediatric, ENT",
      });
    }

    const queryForSpeciality =
      "SELECT ID, Name, imageURL FROM Speciality WHERE Name = $1";
    const specialityDetails = await pool.query(queryForSpeciality, [
      speciality,
    ]);

    if (specialityDetails.rows.length === 0) {
      return res.status(404).json({ message: "Speciality not found" });
    }

    const queryForDoctors = "SELECT * FROM Doctors WHERE speciality = $1";
    const result = await pool.query(queryForDoctors, [speciality]);

    return res.status(200).json({
      success: true,
      message: "success",
      speciality: specialityDetails.rows[0],
      doctors: result.rows,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
