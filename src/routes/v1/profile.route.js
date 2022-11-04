const express = require('express');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
const profileController = require('../../controllers/profile.controller');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express.Router();

router.route('/cv').post(upload.single('file'), profileController.uploadResume);
router.route('/match').get(profileController.matchSkills);

module.exports = router;
