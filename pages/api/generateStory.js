import { Configuration, OpenAIApi } from "openai";
import Replicate from 'replicate';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log(req.body.prompt)
    // A resposda do chatgpt vem em string, obviamente vai dar erro na imagem
    let responseChatGpt = await generateChatGPT(req.body.prompt)
    let responseOpenJourney = await generateImageLink(req.body.prompt)

    res.status(200).json({responseChatGpt: responseChatGpt, responseOpenJourney: responseOpenJourney})
  } else {
    throw Error
  }
}

const generateChatGPT = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.API_KEY_OPEN_AI,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      //max_tokens: process.env.MAX_TOKENS,
      model: process.env.MODEL_OPEN_AI,
      prompt: `${prompt} com até ${process.env.MAX_CHARACTERS} caracteres`,
      temperature: 0.6,
    });

    return response.data.choices[0].text
  } catch(error) {
    return {error: `Ocorreu um erro na sua requisição: ${error.message}`}
  }
}

const generateImageLink = async (prompt) => {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_KEY,
    });

    const output = await replicate.run(
      process.env.MODEL_OPEN_JOURNEY,
      {
        input: {
          prompt: prompt,
          width: 512,
          height: 512,
          num_inference_steps: 50,
          num_outputs: 1,
          guideance_scale: 14,
        },
      },
    );

    return output;
  } catch (error) {
    console.error(error);
    throw Error;
  }
}