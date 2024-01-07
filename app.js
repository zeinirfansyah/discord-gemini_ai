// import discord.js & google generative ai
import { Client, GatewayIntentBits } from "discord.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// client discord dari intent yang dipakai
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const genAi = new GoogleGenerativeAI("MASUKAN API KEY GEMINI");

// cek apakah bot udah konek atau belum
client.once("ready", () => {
  console.log("Bot sudah konek cuy!");
  console.log("created by zeinirfanyah | flippynyps | zeemarimo");
  // create by zeinirfansyah | zeemarimo | flippynyps
});

client.on("messageCreate", async (message) => {
  // abaiakan pesan dari bot
  if (message.author.bot) return;

  //   bikin command !helo
  if (message.content.toLowerCase().startsWith("!helo")) {
    try {
      const prompt = message.content.slice("!helo".length).trim();

      // harus ada prompt
      if (!prompt) {
        message.reply(
          "kasih prompt dong, pertanyaan, atau perintah, apa kek..."
        );
        return;
        // create by zeinirfansyah | zeemarimo | flippynyps
      }

      const model = genAi.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.length > 2000) {
        message.reply(
          "Jawaban yang diberikan bot kosong atau terlalu panjang."
        );
        return;
      }
      // create by zeinirfansyah | zeemarimo | flippynyps
      message.reply(text);
    } catch (error) {
      console.log(error);
    }
  }
});

client.login("MASUKAN DISCORD BOT TOKEN");

// create by zeinirfansyah | zeemarimo | flippynyps
