const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "MongoDB Error ❌ MONGO_URI is missing from environment (.env)",
    );
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    // Hard crash avoid: backend should keep running so frontend can show meaningful errors
    console.error("MongoDB Error ❌", error.message);

    // Common Atlas cause hint
    console.error(
      "Atlas hint: If you recently changed IP, add your current IP to the Atlas Network Access -> IP Access List.",
    );

    // Do NOT process.exit(1)
  }
};

module.exports = connectDB;


