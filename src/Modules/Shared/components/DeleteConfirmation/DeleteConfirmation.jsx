import React from 'react'
import nodataImage from "../../../../assets/images/nodata.png"

export default function DeleteConfirmation({deleteItem}) {
  return (
    <>
     <div>
              <img  src={nodataImage} alt="No Data " />
          <h5 className='mt-2 fa-bold'> Delete This {deleteItem}?</h5>
          <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just<br/> click on delete it</p>
        </div>
    
    </>
  )
}
