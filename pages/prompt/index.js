import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Prompt() {
    const route = useRouter();
    const primaryListOfStoryTypes = ["herói", "vilão", "fada", "espião", "príncipe", "guerreiro", "astronauta", "cientista", "tritão", "ninja"];
    const secondaryListOfStoryTypes = ["heróina", "vilã", "fada", "espiã", "princesa", "guerreira", "astronauta", "cientista", "sereia", "ninja"];
    const [listOfStoryTypes, setListOfStoryTypes] = useState(primaryListOfStoryTypes);
    const [listOfStoryParameters, setListOfStoryParameters] = useState({
        pronoum: "um",
        storyType: listOfStoryTypes[0],
        name: "",
        characteristics: "",
        background: "",
        age: ""
    });

    const handleChange = (value, type) => {
        setListOfStoryParameters(prev => ({...prev, [type]: value}))
    };

    const sendInputInfo = async () => {
        console.log('rodei')
        let {pronoum, storyType, name, characteristics, background, age} = listOfStoryParameters;
        let scriptInitializer = `Era uma vez ${pronoum} ${storyType} ${pronoum === "um" ? "chamado" : "chamada"} ${name} que tinha ${age} anos. Certa vez, ${pronoum === "um" ? "esse" : "essa"} que tinha ${characteristics} e vivia numa região ${background} decidiu contar a todos sobre sua história`;
        const storyGenerated = await generateStory(scriptInitializer);
        console.log(storyGenerated);
        const storyRoute = {
            pathname: "/prompt/story/",
            query: storyGenerated
        }
        route.push(storyRoute);
    }

    async function generateStory(prompt) {
        let { name, characteristics, age } = listOfStoryParameters;
        const response = await fetch('/api/generateStory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt,  name: name, characteristics: characteristics, age: age}),
          });
    
          if (response.ok) {
            const res = await response.json()
          } else {
            console.error('Error:', response.statusText);
          }
      }
    return  (
        <>
        <main className={styles.promptMain}>
            <Image
            src="/promptBackground.png"
            alt="Dall-E generated image"
            style={{zIndex: -1, position: "absolute", objectFit: "fill"}}
            fill
            />
            <div className={styles.centeredDiv}>
                <div className={styles.promptTextDiv}>
                    <p className={styles.promptText}>
                        ”Era uma vez
                        {
                        <select className={styles.mainSelect} value={listOfStoryParameters.pronoum} onChange={(e) => { handleChange(e.target.value, "pronoum"); setListOfStoryTypes(e.target.value === "um" ? primaryListOfStoryTypes : secondaryListOfStoryTypes)}}>
                            <option value="um">um</option>
                            <option value="uma">uma</option>
                        </select>
                        }
                        
                        <select className={styles.mainSelect} value={listOfStoryParameters.storyType} onChange={(e) => { handleChange(e.target.value, "storyType");}}>
                            {
                            listOfStoryTypes.map(type => {
                                return (
                                    <>
                                        <option value={type}>{type}</option>
                                    </>
                                )
                            })}
                            
                        </select>
                        
                        {listOfStoryParameters.pronoum === "um" ? "chamado" : "chamada"}
                        <input className={styles.mainInput} placeholder='nome do protagonista' onChange={(e) => {handleChange(e.target.value, 'name')}}  value={listOfStoryParameters.name}></input>
                        que tinha
                        <input className={styles.mainInput} type="number" placeholder='idade do protagonista' onChange={(e) => {handleChange(e.target.value, 'age')}}  value={listOfStoryParameters.age}></input>
                        anos.
                        Certa vez, {listOfStoryParameters.pronoum === "um" ? "esse" : "essa"} {listOfStoryParameters.storyType} que tinha
                        <input className={styles.mainInput} placeholder='descreva o protagonista' onChange={(e) => {handleChange(e.target.value, 'characteristics')}}  value={listOfStoryParameters.characteristics}></input>
                        e vivia numa região 
                        <input className={styles.mainInput} placeholder='descreva a região' onChange={(e) => {handleChange(e.target.value, 'background')}}  value={listOfStoryParameters.background}></input> 
                        decidiu contar a todos sobre a sua história.”
                    </p>
                </div>
                <button onClick={async () => { await sendInputInfo()}} className={styles.mainButton}>
                    <h2 className={styles.mainButtonText}>
                        descobrir aventura
                    </h2>
                    <Image
                        src="/arrow-right-white.svg"
                        alt="Arrow right image"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
      </main>
        </>
        
    )
}