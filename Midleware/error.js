module.exports = function (err, req, res, next) {
  //Logging 
  console.log(err)
  res.status(500).send("something failed or wrong.");
};
