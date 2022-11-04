const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config/config');

const parseFromUrl = async (resumeUrl) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      apikey: config.apiKey.apiLayerKey,
    },
  };

  const response = await axios.request(`https://api.apilayer.com/resume_parser/url?url=${resumeUrl}`, requestOptions);

  return response.data;
};

const parseFromFile = async (resumeFile) => {
  // eslint-disable-next-line
  const file = fs.readFileSync(`./uploads/${resumeFile.filename}`);

  const form = new FormData();

  form.append('file', file, resumeFile.originalname);

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      apikey: config.apiKey.apiLayerKey,
      'Content-Type': 'application/octet-stream',
    },
  };

  try {
    const response = await axios.post(`https://api.apilayer.com/resume_parser/upload`, form, requestOptions);

    return response;
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

module.exports = {
  parseFromUrl,
  parseFromFile,
};
