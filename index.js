require("dotenv").config();
const express = require("express");
const app = express();

// إعداد خادم Express
app.get("/", function (req, res) {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.on("debug", console.log);
client.on("warn", console.warn);
client.on("error", console.error);

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
