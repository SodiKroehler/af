import Image from 'next/image'
import styles from "./../Homepage.module.css"

export default async function Banner(){
    return(
    <Image src="/banner.jpg" alt="banner"  className={`${styles.logoImage}`}
            width={200} height= {200} priority = {true}></Image> 
    )
}