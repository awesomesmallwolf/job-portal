const intersection = require('lodash/intersection');
const difference = require('lodash/difference');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { parseFromUrl } = require('../services/profile.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const uploadResume = catchAsync(async (req, res) => {
  const resume = req.file;

  if (!resume) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file is selected');
  }

  const parsedInfo = await parseFromUrl(`${req.protocol}://${req.get('host')}/uploads/${resume.filename}`);

  res.send({
    resumeLink: resume.filename,
    ...parsedInfo,
  });
});

const matchSkills = catchAsync(async (req, res) => {
  const options = pick(req.query, ['resumeSkills', 'jobSkills']);

  res.send({
    matchedSkills: intersection(options.resumeSkills, options.jobSkills),
    missedSkills: difference(options.jobSkills, options.resumeSkills),
  });
});

module.exports = {
  uploadResume,
  matchSkills,
};
