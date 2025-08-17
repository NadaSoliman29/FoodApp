import React from 'react'
import girlImg from '../../../../assets/images/headerImg.png'
import { useLocation } from 'react-router-dom'
export default function Header({title,desc,imgPath}) {
 const {pathname}= useLocation();

  return (
  <>
  <div className="container-fluid my-3">
    <div className="row bgheader borderall header ">
     <div className="col-md-8 d-flex align-items-center">
      <div className='m-3'>
        <h3 className=' text-white'>{title} </h3>
<p className="text-white p2line ">
  {(desc || '').replace(/\s*,\s*/g, ',\n')}
</p>      </div>
     </div>
  <div className="col-md-4 text-center">
  
    <img className='img-fluid' src={pathname==='/dashboard' ? girlImg :imgPath}/>

       </div>
    </div>
  </div>
  
  
  </>
  )
}
