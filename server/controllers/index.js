"use strict";

const settings = require("./settings");
const mailchimp = require("./mailchimp");
const newsletter = require("./newsletter");
const convertkit = require("./convertkit");

module.exports = {
  settings,
  mailchimp,
  newsletter,
  convertkit,
};
