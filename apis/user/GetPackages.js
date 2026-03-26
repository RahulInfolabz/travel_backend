const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetPackages(req, res) {
  try {
    const { category_id, ritual_id, min_price, max_price } = req.query;

    const db = await connectDB();
    const collection = db.collection("travel_packages");

    // Build match stage
    const matchStage = { status: "Active" };

    if (category_id && ObjectId.isValid(category_id)) {
      matchStage.category_id = new ObjectId(category_id);
    }

    if (ritual_id && ObjectId.isValid(ritual_id)) {
      matchStage.ritual_id = new ObjectId(ritual_id);
    }

    if (min_price || max_price) {
      matchStage.price = {};
      if (min_price) matchStage.price.$gte = parseFloat(min_price);
      if (max_price) matchStage.price.$lte = parseFloat(max_price);
    }

    const packages = await collection
      .aggregate([
        { $match: matchStage },
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
        { $sort: { created_at: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Packages fetched successfully",
      data: packages,
    });
  } catch (error) {
    console.error("GetPackages.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetPackages };
