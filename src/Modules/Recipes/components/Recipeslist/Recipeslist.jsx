import React, { useEffect, useState } from 'react'

import headerImg from '../../../../assets/images/RecipesHeaderimg.png'
import Header from '../../../Shared/components/Header/Header'
import axios from 'axios'
import Nodata from '../../../Shared/components/NoData/Nodata'
import NoRecipesImg from "../../../../assets/images/norecipes.jpg"
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { axiosInstance, RECIPES_URLS } from '../../../../services/Urls'

export default function Recipeslist() {
    const [respiesList, setRespiesList] = useState([])
       const [categoriesList, setCategoriesList] = useState([])
       const [noOfPages, setNoOfPages] = useState([])
    
       const [itemId, setItemId] = useState(0);
  let getAllRecipes = async(pageSize,pageNumber)=>{
    try {
           let response = await axiosInstance.get(`${RECIPES_URLS.GET_ALL_Recipes}`, 
             {
               params:
             {  pageSize,
               pageNumber}
             })
        
           setRespiesList(response.data.data)
           setNoOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
         } catch (error) {
           console.log(error)
         }
  }
     
     //  delete model data
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) =>{
      setItemId(id)
      setShow(true);
    }


// Delete Recipes 

 let deleteCategory = async()=>{
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${itemId}`, 
        {headers:{Authorization:localStorage.getItem("token")}})
    handleClose()
    setCategoriesList(response.data)
       toast.success(response?.data?.message  || "Deleted Successfully")
    getAllRecipes()
    } catch (error) {
       toast.error(error.response?.data?.message || "Try Again");
    }
   }

  useEffect(() => {
 getAllRecipes(4,1)
  }, [])


  let navigate = useNavigate()
  return (
   <>
   
      <Header title={"Recipes Items"} desc={'You can now add your items that any user can order it from the Application and you can edit'}
       imgPath={headerImg} />
          {/* delete model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=' text-center'>
             <DeleteConfirmation deleteItem={'Recipe'} />
        </Modal.Body>
        <Modal.Footer>
          <Button  className='btn btn-outline-danger' variant='white' onClick={deleteCategory}>
          Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>
        {/* delete model */}
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
                      
                      <Link to={`/dashboard/recipes-data/${item.id}`} className="dropdown-item d-flex align-items-center gap-2" >
                        <i className="fa-regular fa-edit maincolor"></i> Edit
                      </Link>
                    </li>
                    <li>
                      <button  onClick={()=>handleShow(item.id)} className="dropdown-item d-flex align-items-center gap-2 ">
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
   <div className="d-flex justify-content-end pt-3">
     <nav aria-label="Users pagination ">
    <ul className="pagination mb-0 newdesign">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {noOfPages.map(pageNo=>
    <li onClick={()=>getAllRecipes(4,pageNo)} className="page-item cursor-pointer"><a className="page-link">{pageNo}</a></li>

    )}
   
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>
         </div>
   
   </>
  )
}
