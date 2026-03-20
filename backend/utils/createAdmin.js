// backend/utils/createAdmin.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createAdminIfNotExists = async () => {
  try {
    const adminEmail = "admin@example.com"; // change if you want
    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("AdminPassword123", 10);
      await User.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};