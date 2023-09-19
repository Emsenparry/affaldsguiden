import React from 'react'
import logoWhite from '../../../Assets/Images/Layout/Logo-white.svg'
import arrowUp from '../../../Assets/Images/Layout/icon-arrow-up.svg'
import styles from './Footer.module.scss'
import { ContainerStyle } from '../../Styled/Container.style'

const Footer = () => {
  return (
    <footer className={styles.footerMain}>
        <ContainerStyle maxwidth="1400">
        <div className={styles.infoBoxOne}>
        <img src={logoWhite} alt="Logo" />
        <p>Vi arbejder for at informere om korrekt affaldssortering. Ved at sortere hjælper du os, men også klimaet.</p>
    </div>
    <div className={styles.backToTop}>
        <p>©2023 Affaldsguiden. </p>
        <span>
            <p>Back to top</p>
            <img id='top' src={arrowUp} alt="arrow-up" />
        </span>
    </div>
    </ContainerStyle>
    </footer>
  )
}

export default Footer