export const APINotFound = async (req, res, next) => {
  try {
    return res.status(404).json({ success: false, message: "API not found" });
  } catch (error) {
    next(error); // Pass the error to the next error-handling middleware
  }
};
