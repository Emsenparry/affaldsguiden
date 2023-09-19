import React from 'react'
import ImgData from './ImgData'
import Carousel from 'react-material-ui-carousel';
import styles from './Carousel.module.scss'

const Item = (props) => {
    // Retunere images fra ImgData.js
    return (
        <img
        src={props.item.images}
        alt={props.item.alt}
        className={styles.sliderImages}
      />
    );
  };


const HeroSlider = () => {
  return (
    <>
    <section className={styles.sliderContainer}>
        <Carousel 
        animation="slide"
        interval={5000}
        navButtonsAlwaysInvisible={true} // Remove arrows
        indicators={false}
        >
            {ImgData.map((item, index) => {
                return(
                    <Item key={index} item={item} />
                )
            })}
        </Carousel>
    </section>
    </>
  )
}

export default HeroSlider