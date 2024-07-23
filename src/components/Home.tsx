import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { ISliderImage, ISliders } from '../dataTypes/interfaces/sliders';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { getSlider, nextSlider, setError } from '../apps/services/SliderSlice';
import { IRootState, AppDispatch } from '../apps/store';
import { Img } from './styled-components/styledComponent1';
// ___________________________________________________________

// // Exercise1--Making_slider_with_redux
// const Home = () => {

//   const stateSlider = useSelector<IRootState, ISliders>(state => state.SliderSlice);
//   const dispatch = useDispatch();


//   useEffect(() => {
//     axios.get("http://localhost:3030/sliders")
//       .then(response => dispatch(getSlider(response.data)))
//       .catch(error => dispatch(setError(error)));

//     const sliderInterval = setInterval(() => {
//       dispatch(nextSlider())
//     }, 2000);

//     return () => clearInterval(sliderInterval);
//   }, []);




//   // -----------------------------------------------------------

//   if (stateSlider.errorMessage) {
//     return <h2 className='error-message'>سرور با خطا مواجه شد</h2>
//   }

//   return (
//     <div>
//       <div className='slider-box'>
//         {
//           stateSlider.imageList.map((image: ISliderImage) => (
//             <Img src={image.src} alt="" key={image.id} keyId={image.id} count={stateSlider.count} />
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Home


// ===========================================================

// Exercise2--Gallery_photos
const Home = () => {

  return (
    <div>
      <p style={{textAlign:"center",fontSize:"1.5rem"}}>تمرین 2 - در بخش گالری عکس ها_Photo Gallery</p>
    </div>
  )

}

export default Home