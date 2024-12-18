const User = require("../../src/models/user.model");

const userDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User details retrieved successfully.",
      user: user,
    });
  } catch (error) {
    //throw new Error(error);
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

module.exports = { userDetailsById };
