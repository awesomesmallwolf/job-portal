const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const ApiError = require('../utils/ApiError');

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['query', 'location', 'page_id']);
  const result = await jobService.searchIndeedJobs(filter);
  res.send(result.hits);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getIndeedJobDetail(req.params.jobLink);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const skills = await jobService.extractSkillsFromDescription(job.description);

  res.send({ ...job, skills });
});

module.exports = {
  getJobs,
  getJob,
};
