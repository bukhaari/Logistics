const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (re, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    callback(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
    callback(null, true);
    } else {
      console.log("only png & jpg file required");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = upload;