const connectDB = require("../../db/dbConnect");

async function GetRituals(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("rituals");

    const rituals = await collection
      .find({ status: "Active" })
      .sort({ ritual_name: 1 })
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Rituals fetched successfully",
      data: rituals,
    });
  } catch (error) {
    console.error("GetRituals.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetRituals };
