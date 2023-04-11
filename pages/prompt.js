import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Prompt() {
    return  (
        <>
            <main className={styles.main}>
                <Image
                src="/taleteller_animals_2.png"
                alt="Dall-E generated image"
                fill
                />

                <div className={styles.grid}>
                    <p>
                        Era uma vez um herói que tinha nome do protagonista.
                        Certa vez, esse héroi, que caracteristicas do protagonista e vivia
                        numa região tipo de região, decidiu contar a todos a sua história...
                    </p>
                </div>
            </main>  
        </>
        
    )
}