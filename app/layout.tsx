import type { Metadata } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from "./Homepage.module.css"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sudan Rebirth Ministry',
  description: 'Sudan Education Assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`${styles.notacontainer}`}>

          <div className={`${styles.imageCont}`}>
            <Image src="/logo.jpg" alt="SRM logo"  className={`${styles.logoImage}`}
            width={200} height= {200} priority = {true}></Image> 
          </div>

          <div className={`${styles.navBar}`}>
             <Link href="/About"  className={`${styles.button}`}>
              About
            </Link>
          </div>

          <div className={`${styles.body}`}>
            {children}
          </div>   
        </div>

        <div className={`${styles.footer}`}>
          <div>
            Call us: (717) 725-2813
          </div>   
        </div>
        </body>
    </html>
  )
}
