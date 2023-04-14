import * as utils from '@/utils/index.js';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log(req.body.prompt)
    //let response = await testeChatGPT(req.body.prompt)
    const response = await testeOpenJourney2({"inputs": "Astronaut riding a horse"}).then((response) => {
      // Use image
      console.log(response)
    });

    res.status(200).json({ response })
  } else {
    throw Error
  }
}

const testeChatGPT = async (prompt) => {
  const data = await utils.chatGPT({prompt});
  if (data.error) {
    return data.error;
  }
  return data.response;
}

const testeOpenJourney = async () => {
  const data = await utils.openJourney({prompt: "mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece"});
  if (data.error) {
    return alert(data.error);
  }
  setText(data.response);
}
const testeOpenJourney2 = async (data) => {
  const response = await fetch(
  "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
  {
    headers: { Authorization: `Bearer ${process.env.API_KEY_OPEN_JOURNEY}` },
    method: "POST",
    body: JSON.stringify(data),
  }
  );
  return response;
}