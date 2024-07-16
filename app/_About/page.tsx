import styles from "./../Homepage.module.css"
import { list, del} from '@vercel/blob';

export default async function About() {

    return(
        <div className={`${styles.about_main}`}>
            <div className={`${styles.headerBox} `}> 
                <p className={`${styles.headerText} `}> 
                    About Us 
                </p>
            </div>
            <div className={`${styles.about_desc}`}>
                
                I play harp and am cool.
            </div>
        </div>
    )
}

