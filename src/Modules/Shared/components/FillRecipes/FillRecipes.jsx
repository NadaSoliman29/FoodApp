import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FillRecipes() {
    let navigate= useNavigate()
  return (
    <>
    
      <div className="container-fluid my-3">
        <div className="row borderall bgfillrecipes  ">
         <div className="col-md-8 d-flex align-items-center">
          <div className='m-3'>
            <h4 className=' '>Fill the<span className='maincolor'> Recipes</span>  ! </h4>
    <p className=""> you can now fill the meals easily using the table and form ,<br/> click here and sill it with the table !</p>   
       </div>
         </div>
      <div className="col-md-4 text-center d-flex align-items-center justify-content-end">
      
        <button className='btn btn btncolor w-50 text-white'    onClick={() => navigate('/dashboard/recipes')}> Fill Recipes <i className=' fa fa-arrow-right'></i></button>
    
           </div>
        </div>
      </div>
    
    
    
    </>
  )
}
