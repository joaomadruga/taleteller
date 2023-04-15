import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const Story = () => {
  const router = useRouter()
  const { id, chatGPTText, imageSourceUrl } = router.query

  return (
        <main style={{height: '100vh', display: "flex", flexDirection: "column"}}>
            <div style={{width: '100%', height: '100%', position: 'relative'}}>
                <Image
                src={imageSourceUrl}
                alt="Dall-E generated image"
                style={{zIndex: 0, objectFit: "cover"}}
                quality={100}
                fill
                />
            </div>
            <div className={styles.storyDiv}>
                <p className={styles.promptText} style={{maxWidth: '70%', textAlign: 'left'}}>
                    {chatGPTText}
                </p>
                <Link href={`/prompt/story/${Number(id) + 1}`} className={styles.mainButton}>
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
