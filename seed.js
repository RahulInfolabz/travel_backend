const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "travel_platform";

async function seed() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);

  console.log("🌱 Starting seed...");

  // ── Clear existing data ───────────────────────────────────────────────────
  await db.collection("users").deleteMany({});
  await db.collection("travel_categories").deleteMany({});
  await db.collection("rituals").deleteMany({});
  await db.collection("travel_packages").deleteMany({});
  await db.collection("package_inquiries").deleteMany({});
  await db.collection("general_inquiries").deleteMany({});
  await db.collection("feedbacks").deleteMany({});

  console.log("🗑️  Cleared existing collections");

  // ── Users ─────────────────────────────────────────────────────────────────
  const usersResult = await db.collection("users").insertMany([
    {
      full_name: "Admin User",
      email: "admin@travel.com",
      password: "Admin@123",
      mobile_no: "9900000001",
      city: "Mumbai",
      state: "Maharashtra",
      profile_image: "https://i.pravatar.cc/150?img=1",
      role: "Admin",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Rahul Sharma",
      email: "rahul@gmail.com",
      password: "Rahul@123",
      mobile_no: "9900000002",
      city: "Ahmedabad",
      state: "Gujarat",
      profile_image: "https://i.pravatar.cc/150?img=2",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Priya Patel",
      email: "priya@gmail.com",
      password: "Priya@123",
      mobile_no: "9900000003",
      city: "Surat",
      state: "Gujarat",
      profile_image: "https://i.pravatar.cc/150?img=3",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  console.log("✅ Users seeded");

  // ── Travel Categories ─────────────────────────────────────────────────────
  const categoriesResult = await db.collection("travel_categories").insertMany([
    {
      category_name: "Leisure",
      category_description:
        "Relaxing and enjoyable trips for individuals and families looking for a peaceful getaway.",
      category_image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Adventure",
      category_description:
        "Thrilling and exciting travel packages for those who love outdoor activities and challenges.",
      category_image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Pilgrimage",
      category_description:
        "Sacred journeys to holy places and religious sites across India and abroad.",
      category_image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Family",
      category_description:
        "Fun-filled packages designed for families with kids, offering memorable experiences for all ages.",
      category_image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Honeymoon",
      category_description:
        "Romantic getaways for couples with luxurious stay, scenic views, and special experiences.",
      category_image:
        "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const categoryIds = Object.values(categoriesResult.insertedIds);
  console.log("✅ Travel Categories seeded");

  // ── Rituals / Festivals ───────────────────────────────────────────────────
  const ritualsResult = await db.collection("rituals").insertMany([
    {
      ritual_name: "Navratri Special",
      ritual_description:
        "Travel packages designed around the festive Navratri season with cultural events and celebrations.",
      ritual_image:
        "https://images.unsplash.com/photo-1632503661048-01e77c0d5d90?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      ritual_name: "Diwali Getaway",
      ritual_description:
        "Celebrate the festival of lights with special travel experiences and scenic destinations.",
      ritual_image:
        "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      ritual_name: "Char Dham Yatra",
      ritual_description:
        "Sacred pilgrimage covering the four holy shrines — Badrinath, Kedarnath, Gangotri, and Yamunotri.",
      ritual_image:
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      ritual_name: "Kumbh Mela",
      ritual_description:
        "Join the world's largest religious gathering with guided tours and comfortable stay arrangements.",
      ritual_image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      ritual_name: "Holi Special",
      ritual_description:
        "Experience the vibrant festival of colors with curated travel packages to Mathura, Vrindavan, and more.",
      ritual_image:
        "https://images.unsplash.com/photo-1615811361523-1d8ec1cc4e2f?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const ritualIds = Object.values(ritualsResult.insertedIds);
  console.log("✅ Rituals seeded");

  // ── Travel Packages ───────────────────────────────────────────────────────
  const packagesResult = await db.collection("travel_packages").insertMany([
    {
      category_id: categoryIds[0], // Leisure
      ritual_id: ritualIds[1], // Diwali Getaway
      package_name: "Goa Beach Retreat",
      destination: "Goa, India",
      itinerary:
        "Day 1: Arrive in Goa, check-in at beachside resort. Day 2: North Goa sightseeing — Calangute, Baga, Fort Aguada. Day 3: South Goa — Palolem Beach, Colva. Day 4: Water sports and leisure. Day 5: Shopping at Anjuna Flea Market. Day 6: Departure.",
      duration_days: 6,
      price: 18500.0,
      package_image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Adventure
      ritual_id: ritualIds[0], // Navratri Special
      package_name: "Manali Adventure Expedition",
      destination: "Manali, Himachal Pradesh",
      itinerary:
        "Day 1: Arrive Manali, acclimatization. Day 2: Solang Valley — skiing and zorbing. Day 3: Rohtang Pass excursion. Day 4: River rafting on Beas. Day 5: Trekking to Jogini Waterfall. Day 6: Local sightseeing — Hadimba Temple, Manu Temple. Day 7: Departure.",
      duration_days: 7,
      price: 24999.0,
      package_image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Pilgrimage
      ritual_id: ritualIds[2], // Char Dham Yatra
      package_name: "Char Dham Yatra Package",
      destination: "Uttarakhand, India",
      itinerary:
        "Day 1-2: Haridwar & Rishikesh. Day 3-4: Yamunotri Dham. Day 5-6: Gangotri Dham. Day 7-9: Kedarnath Dham. Day 10-12: Badrinath Dham. Day 13: Return to Haridwar. Day 14: Departure.",
      duration_days: 14,
      price: 45000.0,
      package_image:
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Family
      ritual_id: ritualIds[4], // Holi Special
      package_name: "Rajasthan Royal Family Tour",
      destination: "Jaipur, Jodhpur, Udaipur — Rajasthan",
      itinerary:
        "Day 1: Arrive Jaipur — Amber Fort, Hawa Mahal. Day 2: City Palace, Jantar Mantar. Day 3: Travel to Jodhpur — Mehrangarh Fort. Day 4: Jodhpur local — Jaswant Thada. Day 5: Travel to Udaipur — City Palace. Day 6: Lake Pichola boat ride, Saheliyon ki Bari. Day 7: Departure.",
      duration_days: 7,
      price: 32000.0,
      package_image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[4], // Honeymoon
      ritual_id: ritualIds[1], // Diwali Getaway
      package_name: "Kerala Backwaters Honeymoon",
      destination: "Munnar, Alleppey, Kovalam — Kerala",
      itinerary:
        "Day 1: Arrive Munnar — tea gardens. Day 2: Eravikulam National Park. Day 3: Travel to Alleppey — houseboat stay. Day 4: Backwater cruise. Day 5: Travel to Kovalam Beach. Day 6: Beach leisure and spa. Day 7: Departure.",
      duration_days: 7,
      price: 38500.0,
      package_image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Adventure
      ritual_id: ritualIds[2], // Char Dham
      package_name: "Leh Ladakh Bike & Trek",
      destination: "Leh, Ladakh",
      itinerary:
        "Day 1: Arrive Leh — acclimatization. Day 2: Local sightseeing — Shanti Stupa, Leh Palace. Day 3: Khardung La Pass (world's highest motorable road). Day 4: Pangong Lake. Day 5: Nubra Valley — sand dunes. Day 6: Magnetic Hill, Gurudwara Pathar Sahib. Day 7: Departure.",
      duration_days: 7,
      price: 29999.0,
      package_image:
        "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0], // Leisure
      ritual_id: ritualIds[3], // Kumbh Mela
      package_name: "Andaman Island Escape",
      destination: "Port Blair, Havelock, Neil Island — Andaman",
      itinerary:
        "Day 1: Arrive Port Blair — Cellular Jail. Day 2: Ross Island, North Bay. Day 3: Travel to Havelock — Radhanagar Beach. Day 4: Scuba diving & snorkeling. Day 5: Neil Island — Natural Bridge. Day 6: Return Port Blair. Day 7: Departure.",
      duration_days: 7,
      price: 42000.0,
      package_image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Pilgrimage
      ritual_id: ritualIds[3], // Kumbh Mela
      package_name: "Kumbh Mela Prayagraj Package",
      destination: "Prayagraj, Uttar Pradesh",
      itinerary:
        "Day 1: Arrive Prayagraj — check-in. Day 2: Triveni Sangam holy dip — Ganga, Yamuna, Saraswati. Day 3: Kumbh Mela grounds tour. Day 4: Allahabad Fort, Anand Bhavan. Day 5: Departure.",
      duration_days: 5,
      price: 12500.0,
      package_image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const packageIds = Object.values(packagesResult.insertedIds);
  const userIds = Object.values(usersResult.insertedIds);

  console.log("✅ Travel Packages seeded");

  // ── Package Inquiries ─────────────────────────────────────────────────────
  await db.collection("package_inquiries").insertMany([
    {
      user_id: userIds[1], // Rahul
      package_id: packageIds[0], // Goa
      inquiry_message:
        "Is this package available for the month of December? We are a group of 4 friends.",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-11-10"),
      response_message:
        "Yes, the package is available in December. We can also customize it for a group of 4. Please call us to confirm.",
      response_date: new Date("2025-11-11"),
    },
    {
      user_id: userIds[2], // Priya
      package_id: packageIds[4], // Kerala Honeymoon
      inquiry_message:
        "We are looking for a honeymoon package in January. Does this include private houseboat stay?",
      inquiry_status: "Pending",
      inquiry_date: new Date(),
      response_message: "",
      response_date: null,
    },
    {
      user_id: userIds[1], // Rahul
      package_id: packageIds[2], // Char Dham
      inquiry_message:
        "What is the best time to book Char Dham Yatra? Are senior citizens allowed?",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-10-05"),
      response_message:
        "The best time is May-June. Senior citizens are welcome and we provide special assistance throughout the yatra.",
      response_date: new Date("2025-10-06"),
    },
  ]);

  console.log("✅ Package Inquiries seeded");

  // ── General Inquiries ─────────────────────────────────────────────────────
  await db.collection("general_inquiries").insertMany([
    {
      user_id: userIds[1], // Rahul
      inquiry_subject: "Custom Tour Package",
      inquiry_message:
        "I am looking for a custom 10-day North India tour. Can you help me plan one?",
      inquiry_date: new Date("2025-11-15"),
      status: "Pending",
    },
    {
      user_id: userIds[2], // Priya
      inquiry_subject: "Group Discount",
      inquiry_message:
        "We have a group of 20 people planning a Rajasthan trip. Do you offer group discounts?",
      inquiry_date: new Date("2025-11-20"),
      status: "Pending",
    },
  ]);

  console.log("✅ General Inquiries seeded");

  // ── Feedbacks ─────────────────────────────────────────────────────────────
  await db.collection("feedbacks").insertMany([
    {
      user_id: userIds[1], // Rahul
      feedback_message:
        "Absolutely loved the Goa package! Everything was perfectly organized. Will definitely book again.",
      rating: 5,
      feedback_date: new Date("2025-11-20"),
    },
    {
      user_id: userIds[2], // Priya
      feedback_message:
        "The platform is very easy to use. Found exactly what I was looking for. Great variety of packages!",
      rating: 4,
      feedback_date: new Date("2025-11-22"),
    },
    {
      user_id: userIds[1], // Rahul
      feedback_message:
        "Good experience overall. Response to inquiry was quick. Would appreciate more budget-friendly options.",
      rating: 4,
      feedback_date: new Date("2025-12-01"),
    },
  ]);

  console.log("✅ Feedbacks seeded");

  console.log("\n🎉 Seed completed successfully!");
  console.log("─────────────────────────────────────");
  console.log("👤 Admin   → admin@travel.com   / Admin@123");
  console.log("👤 User 1  → rahul@gmail.com    / Rahul@123");
  console.log("👤 User 2  → priya@gmail.com    / Priya@123");
  console.log("─────────────────────────────────────");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
