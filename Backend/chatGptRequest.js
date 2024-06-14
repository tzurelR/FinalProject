import { config } from "dotenv";
import OpenAI from "openai/index.mjs";
config();

const firstMsgToGPT = 'Hello, I have a restaurant. I will say you what my dishes and then you will ask my user 3 short questions and suggest 2 dishes. this are dishes: Israeli, Salad Arais, Grilled Pullet, Hamburger, Cola, Beer. Just give the questions with no openning or suggest yet';

const apiKey = process.env.GPTAPI_KEY;

const openai = new OpenAI({
    apiKey: apiKey
});

const requestToGpt = async(req, res) => {
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: firstMsgToGPT }],
        model: "gpt-4o",
      });
      console.log('GPT:', completion.choices[0].message.content);
}

const getFirstMsgFromGpt = async(req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: firstMsgToGPT }],
            model: "gpt-4o",
          });
          res.json({message: completion.choices[0].message.content});
    } catch(error) {
        res.json({message: error.message});
    }
}

export {requestToGpt, getFirstMsgFromGpt};