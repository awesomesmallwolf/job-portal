const uniq = require('lodash/uniq');
const https = require('https');
const axios = require('axios');
const config = require('../config/config');

const client = axios.create({
  timeout: 300000,
  maxContentLength: 500 * 1000 * 1000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const searchIndeedJobs = async (params) => {
  const response = await client.request({
    method: 'GET',
    url: 'https://indeed12.p.rapidapi.com/jobs/search',
    params,
    headers: {
      'X-RapidAPI-Key': config.apiKey.rapidApiKey,
      'X-RapidAPI-Host': 'indeed12.p.rapidapi.com',
    },
  });

  return response.data;
};

const getIndeedJobDetail = async (jobLink) => {
  const response = await client.request({
    method: 'GET',
    url: `https://indeed12.p.rapidapi.com/${jobLink}`,
    headers: {
      'X-RapidAPI-Key': config.apiKey.rapidApiKey,
      'X-RapidAPI-Host': 'indeed12.p.rapidapi.com',
    },
  });

  return response.data;
};

const extractSkillsFromDescription = async (description) => {
  const options = {
    method: 'POST',
    url: 'https://skill-extraction.p.rapidapi.com/skill_extraction',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': config.apiKey.rapidApiKey,
      'X-RapidAPI-Host': 'skill-extraction.p.rapidapi.com',
    },
    data: JSON.stringify({ operation: 'text_extraction', text: description }),
  };

  const response = await client.request(options);

  const { result } = response.data;

  return uniq(result);
};

module.exports = {
  searchIndeedJobs,
  getIndeedJobDetail,
  extractSkillsFromDescription,
};
