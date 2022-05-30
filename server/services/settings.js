"use strict";

const getPluginStore = () => {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "strapi-newsletter",
  });
};

module.exports = () => ({
  async getSettings() {
    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: "settings" });

    return config;
  },
  async setSettings(body) {
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: "settings", value: body });

    return body;
  },
});