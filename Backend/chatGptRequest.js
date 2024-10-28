import { config } from "dotenv";
import OpenAI from "openai/index.mjs";
config();

    const firstMsgToGPT = 'I have a website for my restaurant. in this website I want that you will suggest to the client dishes from the menu. this is the menu: israeli salad, arais, grilled pullet, hamburger, cola, beer. please give 1 question. give it short with no openning.';
    const secondMsgToGPT = 'give one more question.'
    const thirdMsgToGPT = 'Now, please suggest 2 dishes by the answers of the user.'


const msgHistory = [{role: 'user', content: firstMsgToGPT}];

const apiKey = process.env.GPTAPI_KEY;


const openai = new OpenAI({
    apiKey: apiKey
});

const requestToGpt = async(req, res) => {
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: 'firstMsgToGPT' },
            { role: "user", content: 'light' },
            { role: "assistant", content: 'GPT: Israeli Salad, Grilled Pullet' },
            { role: "user", content: 'maybe another food?' },
        ],
        model: "gpt-4o",
      });
}

const getFirstMsgFromGpt = async(req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [msgHistory[0]],
            model: "gpt-4o",
          });
          msgHistory.push({role: 'assistant', content: completion.choices[0].message.content})
          res.json({message: completion.choices[0].message.content});
    } catch(error) {
        res.json({message: error.message});
    }
}

const sendMsgGpt = async(req, res) => {
    try {
        const index = req.body.index;
        msgHistory.push({role: 'user', content: req.body.message})
        if(index === 1) msgHistory.push({role: 'assistant', content: secondMsgToGPT});
        if(index === 2) msgHistory.push({role: 'assistant', content: thirdMsgToGPT});
        const completion = await openai.chat.completions.create({
            messages: msgHistory,
            model: "gpt-4o",
          });
          res.json({message: completion.choices[0].message.content});
    } catch(error) {
        res.json({message: error.message});
    }
}


export {requestToGpt, getFirstMsgFromGpt, sendMsgGpt};