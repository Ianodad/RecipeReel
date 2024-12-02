const testController = async (req, res) => {
  res.json({
    status: "success",
    message: "auth controller",
    timestamp: new Date(),
  });
};


module.exports = {
  testController,
};