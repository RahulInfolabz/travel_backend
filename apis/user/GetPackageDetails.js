const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetPackageDetails(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    const db = await connectDB();
    const collection = db.collection("travel_packages");

    const packageDetails = await collection
      .aggregate([
        { $match: { _id: new ObjectId(id), status: "Active" } },
        {
          $lookup: {
            from: "travel_categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "rituals",
            localField: "ritual_id",
            foreignField: "_id",
            as: "ritual",
          },
        },
        { $unwind: { path: "$ritual", preserveNullAndEmptyArrays: true } },
      ])
      .toArray();

    if (!packageDetails.length) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Package details fetched successfully",
      data: packageDetails[0],
    });
  } catch (error) {
    console.error("GetPackageDetails.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetPackageDetails };
