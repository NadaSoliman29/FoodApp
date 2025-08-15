import React, { useEffect, useState } from 'react'

import headerImg from '../../../../assets/images/RecipesHeaderimg.png'
import Header from '../../../Shared/components/Header/Header'
import axios from 'axios'
import Nodata from '../../../Shared/components/NoData/Nodata'
import NoRecipesImg from "../../../../assets/images/norecipes.jpg"
import { Link, Links, useNavigate } from 'react-router-dom'

export default function Recipeslist() {
    const [respiesList, setRespiesList] = useState([])
  let getAllData = async()=>{
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1', 
        {headers:{Authorization:localStorage.getItem("token")}})
     
      setRespiesList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
 getAllData()
  }, [])


  let navigate = useNavigate()
  return (
   <>
   
      <Header title={"Recipes Items"} desc={'You can now add your items that any user can order it from the Application and you can edit'}
       imgPath={headerImg} />
     <div className="title d-flex justify-content-between p-3 align-items-center">
          <div className="description">
            <h4>Recipes Table Details</h4>
            <p>You can check all details</p>
          </div>
          <Link to={'/dashboard/recipes-data/Add-recipe'}  className='btn btn  text-white btncolor'> Add New Recipe  </Link>
         </div>
         <div className="data p-3">
          {respiesList.length>0?   <div className="table-wrap rounded-4 overflow-hidden ">
              <table className="table mb-0 align-middle">
        <thead className="bg-light">
             <tr className=' text-center'>
            <th className=' text-start'> Item Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Tag</th>
            <th>Category</th>
            <th className="text-end"></th>
          </tr>
            </thead>
      <tbody>
        {respiesList.map((item)=>
       <tr className=' text-center' key={item.id}>
              <td className="fw-medium text-start">{item.name}</td>
              <td>{item.imagePath ? <img className='table-img' src={`https://upskilling-egypt.com:3006/${item.imagePath}`} alt=''/> : <img className='table-img' src={NoRecipesImg} alt=''/>}</td>

              <td>{item.price}</td>
              <td className="cell-desc">{item.description} </td>
              <td>{item.tag.name}</td>
              <td>{item.category[0]?.name}</td>
              {/* <td>{item.category.name}</td> */}
            
              <td className="text-end">
                <div className="dropdown">
                  <button
                    className="btn btn-ellipsis"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Row actions"
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                 <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-3 py-2">
                    <li>
                      <button className="dropdown-item d-flex align-items-center gap-2" >
                        <i className="fa-regular fa-eye maincolor"></i> View
                      </button>
                    </li>
                     <li>
                      
                      <Link to={'/dashboard/recipes-data/${user.id}'} className="dropdown-item d-flex align-items-center gap-2" >
                        <i className="fa-regular fa-edit maincolor"></i> Edit
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item d-flex align-items-center gap-2 ">
                        <i className="fa-regular fa-trash-can maincolor"></i> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
        )}
       
      </tbody>
      </table>
    </div> : <Nodata/>}
       
         </div>
   
   </>
  )
}
