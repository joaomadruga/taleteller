import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react';

export default function Prompt() {
    const primaryListOfStoryTypes = ["herói", "vilão", "fada", "espião", "príncipe", "guerreiro", "astronauta", "cientista", "sereia", "ninja"]
    const secondaryListOfStoryTypes = ["heróina", "vilã", "fada", "espiã", "princesa", "guerreira", "astronauta", "cientista", "sereia", "ninja"]
    const [listOfStoryTypes, setListOfStoryTypes] = useState(primaryListOfStoryTypes)
    const [storyType, setstoryType] = useState(listOfStoryTypes[0]);
    const [pronoum, setPronoum] = useState("um");
    function logValue() {
      console.log(value);
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
                        <select className={styles.mainSelect} value={pronoum} onChange={(e) => { setPronoum(e.target.value); setListOfStoryTypes(e.target.value === "um" ? primaryListOfStoryTypes : secondaryListOfStoryTypes)}}>
                            <option value="um">um</option>
                            <option value="uma">uma</option>
                        </select>
                        }
                        
                        <select className={styles.mainSelect} value={storyType} onChange={(e) => { setstoryType(e.target.value);}}>
                            {
                            listOfStoryTypes.map(type => {
                                return (
                                    <>
                                        <option value={type}>{type}</option>
                                    </>
                                )
                            })}
                            
                        </select>
                        
                        {pronoum === "um" ? "chamado" : "chamada"}
                        <input className={styles.mainInput} placeholder='nome do protagonista'></input>
                        que tinha
                        <input className={styles.mainInput} type="number" placeholder='idade do protagonista'></input>
                        anos.
                        Certa vez, {pronoum === "um" ? "esse" : "essa"} {storyType} que tinha
                        <input className={styles.mainInput} placeholder='descreva o protagonista'></input>
                        e vivia numa região 
                        <input className={styles.mainInput} placeholder='descreva a região'></input> 
                        decidiu contar a todos sobre a sua história.”
                    </p>
                </div>
                <Link href="prompt" className={styles.mainButton}>
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