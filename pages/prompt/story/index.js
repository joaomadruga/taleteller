import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const Story = () => {
  const router = useRouter();
  const { responseChatGpt, responseOpenJourney } = router.query;
  
  const [page, setPage] = useState(0);
  const [currentImage, setCurrentImage] = useState(responseOpenJourney?.[0] );
  const [currentText, setCurrentText] = useState(responseChatGpt?.[0]);

  const changePage = (button) => {
    let newPage;

    if (button === '-') {
      newPage = page - 1;
    } else {
      newPage = page + 1;
    }

    if (newPage < 0) {
      newPage = 0;
    } else if (newPage > responseChatGpt.length - 1) {
      newPage = responseChatGpt.length - 1;
    }

    setPage(newPage);
    setCurrentText(responseChatGpt[newPage]);
    setCurrentImage(responseOpenJourney[newPage]);
  }

  return (
    <main style={{height: '100vh', display: "flex", flexDirection: "column"}}>
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <Image
          src={currentImage}
          alt="Imagem da história"
          style={{zIndex: 0, objectFit: "cover"}}
          quality={100}
          fill
        />
      </div>
      <div className={styles.storyDiv}>
        <p className={styles.promptText} style={{maxWidth: '70%', textAlign: 'left'}}>
          {currentText}
        </p>
        {page > 0 && (
          <button onClick={() => changePage('-')} className={styles.mainButton}>
            <h2 className={styles.mainButtonText}>
              Página anterior
            </h2>
            <Image
              src="/arrow-right-white.svg"
              alt="Arrow right image"
              width={20}
              height={20}
            />
          </button>
        )}

        {page < responseChatGpt.length - 1 && (
          <button onClick={() => changePage('+')} className={styles.mainButton}>
            <h2 className={styles.mainButtonText}>
              Página seguinte
            </h2>
            <Image
              src="/arrow-left-white.svg"
              alt="Arrow left image"
              width={20}
              height={20}
            />
          </button>
        )}

        <h2 className={styles.paginationText}>
          {page + 1}/{responseChatGpt.length}
        </h2>
      </div>
    </main>
  )
}

export default Story
