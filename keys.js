require("dotenv").config();

const mongoUri = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default mongoUri;
