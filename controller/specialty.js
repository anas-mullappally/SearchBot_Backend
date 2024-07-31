import pool from "../config/db.js";
// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// export const getSpecialityAndDoctors = async (req, res) => {
//   try {
//     const { speciality } = req.params;

//     if (!speciality) {
//       return res
//         .status(400)
//         .json({ success: false, message: "speciality is required" });
//     }

//     const specialties = [
//       "Cardiology",
//       "Neurology",
//       "Orthopedics",
//       "Pediatric",
//       "ENT",
//     ];

//     if (!specialties.includes(speciality)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Specialty must be one of Cardiology, Neurology, Orthopedics, Pediatric, ENT",
//       });
//     }

//     const queryForSpeciality =
//       "SELECT ID, Name, imageURL FROM Speciality WHERE Name = $1";
//     const specialityDetails = await pool.query(queryForSpeciality, [
//       speciality,
//     ]);

//     if (specialityDetails.rows.length === 0) {
//       return res.status(404).json({ message: "Speciality not found" });
//     }

//     const queryForDoctors = "SELECT * FROM Doctors WHERE speciality = $1";
//     const result = await pool.query(queryForDoctors, [speciality]);

//     return ers.status(200).json({
//       success: true,
//       message: "success",
//       speciality: specialityDetails.rows[0],
//       doctors: result.rows,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// async function getCompletion(prompt) {
//   try {
//     const response = await client.completions.create({
//       model: "ft:davinci-002:personal:searchbot:9qXm4wn7",
//       prompt: prompt,
//       max_tokens: 100,
//     });

//     console.log(response, "response");
//     console.log(11111111111111111111);
//     console.log(JSON.stringify(response, null, 2));
//     console.log(11111111111111111111);
//     // return JSON.stringify(response, null, 2);
//     return { success: true, message: response.choices[0].text.trim() };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }

// export const getOpenAIresp = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log(prompt,"prompt");
//     if (!prompt){
//       return res
//         .status(400)
//         .json({ success: false, message: "prompt is required" });

//     }
//     // let prompt = "I'm suffering headache";
//     const { success, message } = await getCompletion(prompt);
//     if (!success) return res.status(400).json({ success, message });
//     console.log(message, "result");
//     return res.status(200).json({ success: true, message: "success", message });
//   } catch (error) {
//     console.log(404, error);
//     console.error(405, error.message);
//     res.status(500).send("Server Error");
//   }
// };

export const getDoctors = async (req, res) => {
  try {
    const data = req.query;
    const decodedData = JSON.parse(decodeURIComponent(data.specialities));

    const specialities = decodedData.map((item) => item.toLowerCase());
    const placeholders = specialities.map((_, i) => `$${i + 1}`).join(",");

    const queryForDoctors = `
    SELECT d.ID, d.Name, s.Name AS Speciality, d.imageURL
    FROM Doctors d
    JOIN Speciality s ON d.Speciality = s.ID
    WHERE s.Name IN (${placeholders});
  `;

    const result = await pool.query(queryForDoctors, specialities);

    return res
      .status(200)
      .json({ success: true, message: "success", doctors: result.rows });
  } catch (err) {
    console.error("Error executing query:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error " });
  }
};
