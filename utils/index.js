import axios from "axios";

import { openai, replicate } from "@/configuration";
import { MAX_CHARACTERS, MAX_TOKENS, MODEL_OPEN_AI, MODEL_OPEN_JOURNEY } from "@/constants";

export const chatGPT = async ({prompt}) => {
  try {
    const response = await openai.createCompletion({
      max_tokens: MAX_TOKENS,
      model: MODEL_OPEN_AI,
      prompt: `${prompt} com até ${MAX_CHARACTERS} caracteres`,
      temperature: 0.6,
    });

    return {response: response.data.choices[0].text}
  } catch(error) {
    return {error: `Ocorreu um erro na sua requisição: ${error.message}`}
  }
}

export const openJourney = async ({prompt, seed}) => {
  /* try {
    const response = await replicate.run(
      MODEL_OPEN_JOURNEY,
      {
        input: {
          height: 768,
		      num_interference_steps: 1000000,
          prompt,
          seed: Math.floor(Math.random() * 9999999),
          width: 768,
        }
      }
    );

    console.log({response})
    return {response}
  } catch(error) {
    return {error: `Ocorreu um erro na sua requisição: ${error.message}`}
  } */

  /* try {
    const API_URL = "https://api-inference.huggingface.co/models/prompthero/openjourney-v4"
    const response = await axios.post(API_URL, {
      height: 768,
      num_interference_steps: 1000000,
      prompt,
      seed: Math.floor(Math.random() * 9999999),
      width: 768
    }, {
      headers: {
        "Authorization": "Bearer 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",
      }
    });

    console.log({response});
  } catch (error) {
    return {error: `Ocorreu um erro na sua requisição: ${error.message}`}
  } */
}