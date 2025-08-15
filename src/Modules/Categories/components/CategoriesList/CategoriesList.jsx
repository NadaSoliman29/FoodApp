import React, { useEffect, useState } from 'react'
import headerImg from '../../../../assets/images/RecipesHeaderimg.png'
import Header from '../../../Shared/components/Header/Header'
import axios from 'axios'
import Nodata from '../../../Shared/components/NoData/Nodata'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodataImage from "../../../../assets/images/nodata.png"
import { toast } from 'react-toastify'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import { useForm } from 'react-hook-form'

export default function CategoriesList() {
   const [categoriesList, setCategoriesList] = useState([])
   const [itemId, setItemId] = useState(0);
       let {register,formState:{errors , isSubmitting},handleSubmit} = useForm();
   
   //  delete model data
   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setItemId(id)
    setShow(true);
  }

  //add model data 

   const [showadd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () =>{
    
    setShowAdd(true);
  }
   let deleteCategory = async()=>{
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${itemId}`, 
        {headers:{Authorization:localStorage.getItem("token")}})
    handleClose()
    setCategoriesList(response.data)
         toast.success("Deleted Successfully")
     getAllData()
    } catch (error) {
       toast.error(error.response?.data?.message || "Try Again");
    }
   }
  
  let getAllData = async()=>{
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1', 
        {headers:{Authorization:localStorage.getItem("token")}})
     
      setCategoriesList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

// add category
  let onSubmit= async(data)=>{
  try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',data,
        {headers:{Authorization:localStorage.getItem("token")}})
        console.log(response)
     handleCloseAdd()
    getAllData()   
    toast.success(response?.data?.message||" Recipe created successfully");
      
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
  useEffect(() => {
 getAllData()
  }, [])
 
    
   
  return (
   <>

  {/* Add model */}
  <Modal show={showadd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            Add Category
          </Modal.Header>
        <Modal.Body className=' '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' input-group my-2'>
            <input {...register("name", {required: "Name is Required"})} 
            type='text' className=' form-control' placeholder='Category Name'  />

          </div>
           {errors.name && <p className='text-danger mb-1 errormsg'>{errors.name.message}</p>}
          
        <div className='text-end'>
           <hr/>
             <button disabled={isSubmitting} type='submit'  className='btn btn-success savebtn ' variant='white' >
         Save
          </button>
        </div>
        </form>
        </Modal.Body>
        
      </Modal>

  {/* Add model */}

   {/* delte model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=' text-center'>
             <DeleteConfirmation deleteItem={'Category'} />
        </Modal.Body>
        <Modal.Footer>
          <Button  className='btn btn-outline-danger' variant='white' onClick={deleteCategory}>
          Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>
        {/* delte model */}
        <Header title={"Categories Item"} desc={'You can now add your items that any user can order it from the Application and you can edit'}
         imgPath={headerImg} />
     <div className="title d-flex justify-content-between p-3 align-items-center">
      <div className="description">
        <h4>Categories Table Details</h4>
        <p>You can check all details</p>
      </div>
      <button className='btn btn  text-white btncolor ' onClick={handleShowAdd}> Add New Category  </button>
     </div>
     <div className="data p-3">
      {categoriesList.length>0?   <div className="table-wrap rounded-4 ">
    <table className="table mb-0 align-middle ">
    <thead className="bg-light">
          <tr className=' text-center'>
            <th className="py-3 ps-4">Id</th>

            <th className="py-3 ps-4">Name</th>
            <th className="py-3 ps-4">Creation Date</th>
            <th className="py-3 ps-4">Modification Date</th>

            <th className="py-3 text-end pe-4">Actions</th>
          </tr>
        </thead>
  <tbody >
    {categoriesList.map((item)=>
    <tr className=' text-center' key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
     
      <td>{item.creationDate}</td>
      <td>{item.modificationDate}</td>

      
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
                      <button className="dropdown-item d-flex align-items-center gap-2" >
                        <i className="fa-regular fa-edit maincolor"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button onClick={()=>handleShow(item.id)} className="dropdown-item d-flex align-items-center gap-2 ">
                        <i  className="fa-regular fa-trash-can maincolor"></i> Delete
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
