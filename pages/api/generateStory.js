import { Configuration, OpenAIApi } from "openai";
import Replicate from 'replicate';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const seed = Math.floor(Math.random() * 9999999) + 1;
    console.log(req.body.prompt)
    const storyScript = await generateStoryScript(req.body.prompt);
    
    const listOfImages = await storyScript.map(async (paragraph) => {
      if (paragraph) {
        let responseImageDescription = await generateImageDescription(paragraph, req.body.age, req.body.name, req.body.characteristics);
        let responseOpenJourney = await generateImageLink("mdjrny-v4 style. " + responseImageDescription + ". Cute pixar style illustration, children's book, illustration, disney, soft colors, no characters, no letters, no phrases, no words --ar 3:2", seed);
        console.log(responseOpenJourney);
        return responseOpenJourney
      }
    });
    
    res.status(200).json({responseChatGpt: storyScript, responseOpenJourney: listOfImages})
  } else {
    throw Error
  }
}

const generateStoryScript = async (prompt) => {
  let responseChatGpt = await generateChatGPT(`Gere uma história, divididas no máximo em 10 paragrafos, com até ${process.env.MAX_CHARACTERS} separados por uma linha, com esse inicializador: ${prompt}`)
  console.log(responseChatGpt)
  return responseChatGpt.split('\n').filter((paragraph) => {
    if (paragraph.length > 5) {      
      return true;
    }
    return false;
  })
}

const generateImageDescription = async (prompt, age, name, characteristics) => {
  let responseChatGpt = await generateChatGPT(`Descreva, em inglês, como seria uma imagem para representar o seguinte cenário, onde ${name} tem ${age} anos e possua as características físicas ${characteristics}: ${prompt}`)
  console.log(responseChatGpt)
  return responseChatGpt
}

const generateChatGPT = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.API_KEY_OPEN_AI,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      max_tokens: Number(process.env.MAX_TOKENS),
      model: process.env.MODEL_OPEN_AI,
      prompt: prompt,
      temperature: 0.6,
    });
    console.log(response.data.choices)
    return response.data.choices[0].text
  } catch(error) {
    return {error: `Ocorreu um erro na sua requisição: ${error.message}`}
  }
}

const generateImageLink = async (prompt, seed) => {
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
          seed: seed 
        },
      },
    );
    
    return output;
  } catch (error) {
    console.error(error);
    throw Error;
  }
}