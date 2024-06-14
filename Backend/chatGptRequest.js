import { config } from "dotenv";
import OpenAI from "openai/index.mjs";
config();

const firstMsgToGPT = 'I have a website for my restaurant. in this website I want that you will suggest to the client dishes from the menu. this is the menu: israeli salad, arais, grilled pullet, hamburger, cola, beer. please give 1 question that by this question after the user will give answer, you suggest 2 dishes from the menu. give it short with no openning. after the user answer to you, give 2 dishes from menu!';

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
          console.log(completion.id);
          res.json({message: completion.choices[0].message.content});
    } catch(error) {
        res.json({message: error.message});
    }
}

const sendMsgGpt = async(req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: req.body.message }],
            model: "gpt-4o",
          });
          console.log(completion.id);
          res.json({message: completion.choices[0].message.content});
    } catch(error) {
        res.json({message: error.message});
    }
}

export {requestToGpt, getFirstMsgFromGpt, sendMsgGpt};