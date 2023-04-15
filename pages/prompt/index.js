import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Prompt() {
    const primaryListOfStoryTypes = ["herói", "vilão", "fada", "espião", "príncipe", "guerreiro", "astronauta", "cientista", "tritão", "ninja"]
    const secondaryListOfStoryTypes = ["heróina", "vilã", "fada", "espiã", "princesa", "guerreira", "astronauta", "cientista", "sereia", "ninja"]
    const [listOfStoryTypes, setListOfStoryTypes] = useState(primaryListOfStoryTypes)
    const [storyType, setStoryType] = useState(listOfStoryTypes[0]);
    const [pronoun, setPronoun] = useState("um");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("menino");
    const [characteristics, setCharacteristics] = useState("");
    let prompt = "";
    const [imageSourceUrl, setImageSourceUrl] = useState("/arrow-right-green.svg");
    const [chatGPTText, setChatGPTText] = useState("")

    async function generateStory(prompt) {
        const response = await fetch('/api/generateStory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        console.log(prompt);
        console.log(response);
        if (response.ok) {
            const res = await response.json()
            console.log(res)
            setChatGPTText(res.responseChatGpt)
            setImageSourceUrl(res.responseOpenJourney[0]);
        } else {
            console.error('Error:', response.statusText);
        }
    }

    useEffect(() => {
        prompt = "Escreva uma história infantil sobre " + name + " que tem " + age + " anos. A história deverá ter o tema " + storyType + " e se passar em uma região " + region + ". " + name + " é " + gender + " e suas características físicas são " + characteristics
        console.log(prompt)
    }, [name, age, storyType, region, characteristics])

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
                        "Era uma vez
                        {
                        <select className={styles.mainSelect} value={pronoun} onChange={(e) => { setPronoun(e.target.value); setListOfStoryTypes(e.target.value === "um" ? primaryListOfStoryTypes : secondaryListOfStoryTypes); setGender(e.target.value === "um" ? "menino" : "menina");}}>
                            <option value="um">um</option>
                            <option value="uma">uma</option>
                        </select>
                        }
                        
                        <select className={styles.mainSelect} value={storyType} onChange={(e) => { setStoryType(e.target.value);}}>
                            {
                            listOfStoryTypes.map(type => {
                                return (
                                    <>
                                        <option value={type}>{type}</option>
                                    </>
                                )
                            })}
                        </select>

                        {pronoun === "um" ? "chamado" : "chamada"}{" "}
                        <input
                            className={styles.mainInput}
                            placeholder="nome do protagonista"
                            onChange={(e) => {setName(e.target.value);}}></input>
                        que tinha
                        <input
                            className={styles.mainInput}
                            type="number"
                            placeholder="idade do protagonista"
                            onChange={(e) => {setAge(e.target.value);}}></input>{" "}
                        anos.
                        Certa vez, {pronoun === "um" ? "esse" : "essa"} {storyType} que tinha
                        <input
                            className={styles.mainInput}
                            placeholder="descreva o protagonista"
                            onChange={(e) => {setCharacteristics(e.target.value);}}></input>{" "}
                        e vivia numa região 
                        <input
                            className={styles.mainInput}
                            placeholder="descreva a região"
                            onChange={(e) => {setRegion(e.target.value);}}></input>
                        decidiu contar a todos sobre a sua história."
                    </p>
                </div>

                <Link href={{ pathname: '/prompt/story/1', query: { chatGPTText, imageSourceUrl } }} className={styles.mainButton} onClick={() => generateStory(prompt)}>
                    <h2 className={styles.mainButtonText}>
                        descobrir aventura
                    </h2>
                    <Image
                        src="/arrow-right-white.svg"
                        alt="Arrow right image"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
      </main>
        </>

    )
}