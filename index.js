require("dotenv").config();
const express = require("express");
const app = express();
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("web-streams-polyfill/ponyfill"); // استيراد web-streams-polyfill
const fetch = require("node-fetch"); // استيراد node-fetch

// إعداد خادم Express
app.get("/", function (req, res) {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.on("debug", console.log);
client.on("warn", console.warn);
client.on("error", console.error);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  console.log("token:", process.env.token);
  console.log("channel:", process.env.channel);
});

// هنا يمكن استخدام fetch لجلب البيانات
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("Error fetching data:", err));

client.on("ready", () => {
  setInterval(async () => {
    client.channels
      .fetch(process.env.channel)
      .then((channel) => {
        json;
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
