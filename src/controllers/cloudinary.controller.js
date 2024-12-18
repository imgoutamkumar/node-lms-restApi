const fs = require("fs/promises");

const {
  uploadMediaToCloudinary,
  deleteMediaToCloudinary,
} = require("../helpers/cloudinary");

const uploadMedia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "file not found",
    });
  }
  try {
    console.log("req.file", req.file);
    const result = await uploadMediaToCloudinary(req.file.path);
    console.log("result", result);

    // Delete the file after upload
    await fs.unlink(req.file.path);

    res.status(200).json({
      success: true,
      message: "file uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    try {
      await fs.unlink(req.file.path);
    } catch (unlinkError) {
      console.error(
        "Error deleting file after upload failure:",
        unlinkError.message
      );
    }
    res.status(500).json({
      success: false,
      message: "Error Uploading File",
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Asset ID is required",
      });
    }
    const result = await deleteMediaToCloudinary(id);
    res.status(200).json({
      success: true,
      message: "file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting File",
    });
  }
};

module.exports = { uploadMedia, deleteMedia };
