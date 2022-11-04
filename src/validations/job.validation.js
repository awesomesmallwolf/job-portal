const Joi = require('joi');

const getJobs = {
  query: Joi.object().keys({
    query: Joi.string().optional(),
    location: Joi.string().optional(),
    page_id: Joi.number().integer().default(1),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobLink: Joi.string(),
  }),
};

module.exports = {
  getJobs,
  getJob,
};
