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
import { Link } from 'react-router-dom'
import NoRecipesImg from "../../../../assets/images/norecipes.jpg"
import { axiosInstance, baseImgURL, USERS_URLS } from '../../../../services/Urls'


export default function UserList() {
     const [usersList, setUsersList] = useState([])
   const [itemId, setItemId] = useState(0);
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm();
   
   //  delete model data
   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setItemId(id)
    setShow(true);
  }

  //add model data 
 const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('add'); // 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);
   const [showadd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () =>{
    
    setShowAdd(true);
  }

  const closeForm = () => setShowForm(false);

   let deleteUser = async(id)=>{
      try {
      let response = await axiosInstance.delete(
        `${USERS_URLS.DELETE_USER(id)}`, 
      
      )
        handleClose()
      console.log(response)
    setUsersList(response.data)
         toast.success(response?.data?.message  || "Deleted Successfully")
    getAllUsers()
    } catch (error) {
       toast.error(error.response?.data?.message || "Try Again");
    }

   
   }
  
  let getAllUsers = async(pageSize,pageNumber)=>{
    try {
      let response = await axiosInstance.get(`${USERS_URLS.GETUSERS}`, 
        {
          params:
        {  pageSize,
          pageNumber}
        })
     console.log(response)
      setUsersList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
 getAllUsers(10,1)
  }, [])
  return (
    <>
     {/* delete model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=' text-center'>
             <DeleteConfirmation deleteItem={'User'} />
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-outline-danger" variant="white" onClick={() => deleteUser(itemId)}>
  Delete This Item
</Button>
        </Modal.Footer>
      </Modal>
        {/* delete model */}
        <Header title={"Users Item"} desc={'You can now add your items that any user can order it from the Application and you can edit'}
             imgPath={headerImg} />
    
     <div className="title d-flex justify-content-between p-3 align-items-center">
      <div className="description">
        <h4>Users Table Details</h4>
        <p>You can check all details</p>
      </div>
      </div>
        <div className="data p-3">
            {usersList.length>0?   <div className="table-wrap rounded-4 ">
          <table className="table mb-0 align-middle ">
          <thead className="bg-light">
                <tr className=' text-center'>
                  <th className="py-3 ps-4">UserName</th>
      
                  <th className="py-3 ps-4">Image</th>
                  <th className="py-3 ps-4">Email</th>
                  <th className="py-3 ps-4">PhoneNumber</th>
                  <th className="py-3 ps-4">Country</th>

                          <th className="text-end"></th>
                </tr>
              </thead>
        <tbody >
          {usersList.map((item)=>
          <tr className=' text-center' key={item.id}>
            <td>{item.userName}</td>
            <td>{item.imagePath ? <img className='table-img r50 ' src={`${baseImgURL}${item.imagePath}`} alt=''/> : <img className='table-img' src={NoRecipesImg} alt=''/>}</td>
               <td>{item.email}</td>
           
            <td>{item.phoneNumber}</td>
                 <td>{item.country}</td>
          
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
         
           </div>
    </>
  )
}
