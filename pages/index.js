import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>TaleTeller</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Image
            src="/taleteller_animals.png"
            alt="Dall-E generated image"
            fill
          />
        
        <div className={styles.grid}>
          <Link className={styles.card} href='prompt'>
            <h2 className={inter.className}>
              Criar uma história <span>-&gt;</span>
            </h2>
          </Link>
        </div>
      </main>
    </>
  )
}
