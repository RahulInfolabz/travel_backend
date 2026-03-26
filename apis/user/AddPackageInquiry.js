const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddPackageInquiry(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { package_id, inquiry_message } = req.body;

    if (!package_id || !inquiry_message) {
      return res.status(400).json({
        success: false,
        message: "Package ID and inquiry message are required",
      });
    }

    if (!ObjectId.isValid(package_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    const db = await connectDB();
    const packageCollection = db.collection("travel_packages");
    const inquiryCollection = db.collection("package_inquiries");

    // Verify package exists
    const packageExists = await packageCollection.findOne({
      _id: new ObjectId(package_id),
    });

    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    await inquiryCollection.insertOne({
      user_id: new ObjectId(user.session._id),
      package_id: new ObjectId(package_id),
      inquiry_message,
      inquiry_status: "Pending",
      inquiry_date: new Date(),
      response_message: "",
      response_date: null,
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("AddPackageInquiry.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { AddPackageInquiry };
