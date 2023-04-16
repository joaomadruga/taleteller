import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'

const Story = () => {
    const route = useRouter();
    console.log(route.query)
    const { responseChatGpt, responseOpenJourney } = route.query
    console.log(responseChatGpt)
    console.log(responseOpenJourney)
    const [currentImage, setCurrentImage] = useState("");
    const [currentText, setCurrentText] = useState("");

    return (
            <main style={{height: '100vh', display: "flex", flexDirection: "column"}}>
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <Image
                    src="/test.png"
                    alt="Dall-E generated image"
                    style={{zIndex: 0, objectFit: "cover"}}
                    quality={100}
                    fill
                    />
                </div>
                <div className={styles.storyDiv}>
                    <p className={styles.promptText} style={{maxWidth: '70%', textAlign: 'left'}}>
                    ”Era uma vez um menino curioso chamado Max. Max adorava explorar e descobrir coisas novas no mundo ao seu redor. Ele morava em uma pequena cidade cercada por florestas e montanhas, e amava nada mais do que se aventurar no deserto para ver o que podia encontrar.”
                    </p>
                    <Link href={`/prompt/story/`} className={styles.mainButton}>
                        <h2 className={styles.mainButtonText}>
                            próxima página
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
    )
}

export default Story
