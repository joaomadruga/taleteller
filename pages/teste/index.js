import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import * as utils from '@/utils/index.js';

export default function Prompt() {
  const [text, setText] = useState('');

  const testeChatGPT = async () => {
    const data = await utils.chatGPT({prompt: 'Qual a capital do Brasil?'});
    if (data.error) {
      return alert(data.error);
    }
    setText(data.response);
  }

  const testeOpenJourney = async () => {
    const data = await utils.openJourney({prompt: "mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece"});
    if (data.error) {
      return alert(data.error);
    }
    setText(data.response);
  }

  useEffect(() => {
    //testeChatGPT();
    //testeOpenJourney();
  }, []);

  return  (
    <>
      <main className={styles.main}>
        <Image
          src="/taleteller_animals_2.png"
          alt="Dall-E generated image"
          fill
        />

        <div className={styles.grid}>
          {text && (<p>{text}</p>)}
        </div>
      </main>  
    </>
  )
}