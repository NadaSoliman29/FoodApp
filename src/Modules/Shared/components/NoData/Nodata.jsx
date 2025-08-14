import React from 'react'
import nodataImage from "../../../../assets/images/nodata.png"
export default function Nodata() {
  return (
    <>
<div className=' text-center '>
    <img  src={nodataImage} alt="No Data " />
    <h5 className=' fw-bold mt-3'>No Data !</h5>
    <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>
</div>

    </>
  )
}
