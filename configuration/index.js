import { Configuration, OpenAIApi } from "openai";
import Replicate from "replicate";

import { API_KEY_OPEN_AI, API_KEY_OPEN_JOURNEY } from "@/constants";

const configuration = new Configuration({
  apiKey: API_KEY_OPEN_AI,
});

export const openai = new OpenAIApi(configuration);

export const replicate = new Replicate({
  auth: API_KEY_OPEN_JOURNEY,
});