import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin users" });
    }

    await user.deleteOne();

    res.json({ message: "User removed" });
  } catch (error) {
    next(error);
  }
};