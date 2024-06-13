import { config } from "dotenv";
import OpenAI from "openai/index.mjs";
config();


const apiKey = process.env.GPTAPI_KEY;

const openai = new OpenAI({
    apiKey: apiKey
});

const requestToGpt = async() => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "which day today in israel?" }],
        model: "gpt-4o",
      });
    
      console.log(completion.choices[0]);
}

export {requestToGpt};