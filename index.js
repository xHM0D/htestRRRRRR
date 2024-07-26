require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);

const { Client } = require("discord.js-selfbot-v13");
const client = new Client({ checkUpdate: false });

setInterval(() => {
  if (!client || !client.user) {
    console.log("Client not login");
    console.log("Restart project");
    process.exit(1);
  }
}, 1000);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  console.log("Token:", process.env.token);
  console.log("Channel:", process.env.channel);
});

const { joinVoiceChannel } = require("@discordjs/voice");
client.on("ready", () => {
  setInterval(async () => {
    client.channels
      .fetch(process.env.channel)
      .then((channel) => {
        const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      })
      .catch((error) => {
        console.error("Error joining voice channel:", error);
      });
  }, 1000);
});

client.login(process.env.token).catch((error) => {
  console.error("Error logging in:", error);
  process.exit(1);
});
require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);

const { Client } = require("discord.js-selfbot-v13");
const client = new Client({ checkUpdate: false });

setInterval(() => {
  if (!client || !client.user) {
    console.log("Client not login");
    console.log("Restart project");
    process.exit(1);
  }
}, 1000);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  console.log("token:", process.env.token);
  console.log("channel:", process.env.channel);
});

const { joinVoiceChannel } = require("@discordjs/voice");
client.on("ready", () => {
  setInterval(async () => {
    client.channels
      .fetch(process.env.channel)
      .then((channel) => {
        const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      })
      .catch((error) => {
        console.error("Error joining voice channel:", error);
      });
  }, 1000);
});

client.login(process.env.token).catch((error) => {
  console.error("Error logging in:", error);
  process.exit(1);
});
