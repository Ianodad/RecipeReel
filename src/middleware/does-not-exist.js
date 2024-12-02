module.exports.doesNotExist = (req, res, next) => {
  res.status(404).send("url does not exist");
  //   next(new NotFound("url does not exist"));
};
