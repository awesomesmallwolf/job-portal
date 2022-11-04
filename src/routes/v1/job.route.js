const express = require('express');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

const router = express.Router();

router.route('/').get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/:jobLink').get(validate(jobValidation.getJob), jobController.getJob);

module.exports = router;
