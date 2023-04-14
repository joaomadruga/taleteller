import { Configuration, OpenAIApi } from "openai";
import Replicate from "replicate";

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPEN_AI,
});

export const openai = new OpenAIApi(configuration);

export const replicate = new Replicate({
  auth: process.env.API_KEY_OPEN_JOURNEY,
});
