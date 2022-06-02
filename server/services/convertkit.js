"use strict";

const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.convertkit.com/v3",
});

const getPluginStore = () => {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "strapi-newsletter",
  });
};

module.exports = () => ({
  async checkConnection() {
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      if (config.provider != "convertkit") {
        throw new Error("Provider is not convertkit");
      }

      const { data } = await axiosInstance.get("/account", {
        params: {
          api_secret: config.apiSecret,
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.toString());
    }
  },
  async subscribeNewUser(email) {
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      if (config.provider != "convertkit") {
        throw new Error("Provider is not convertkit");
      }

      const { data } = await axiosInstance.post(
        `/forms/${config.formId}/subscribe`,
        {
          api_key: config.apiKey,
          email: email,
        }
      );

      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  async sendNewsletter(body, _) {
    try {
      const pluginStore = getPluginStore();
      const config = await pluginStore.get({ key: "settings" });

      if (config.provider != "convertkit") {
        throw new Error("Provider is not convertkit");
      }

      const { data } = await axiosInstance.get("/broadcast", {
        api_secret: config.apiSecret,
        content: body.body,
        subject: body.subject,
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
});
