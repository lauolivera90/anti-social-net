import Image from 'react-bootstrap/Image';
import styles from './Logo.module.css'
import logo from '../../assets/logo/cams.png'

function Logo() {
  
  return (
    <div id="circulo" className={styles.circulo}>
      <div className={styles.espiral1}>
        <div className={styles.espiral2}>
          <Image src={logo} className={styles.logo} />
        </div>
      </div>
    </div>


  );
}

export default Logo;