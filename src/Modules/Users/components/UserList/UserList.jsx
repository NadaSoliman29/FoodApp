import React, { useContext, useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import NoRecipesImg from "../../../../assets/images/norecipes.jpg"
import { axiosInstance, baseImgURL, USERS_URLS } from '../../../../services/Urls'
import NoUserImage from "../../../../assets/images/noUserImage.png"
import { AuthContext } from '../../../../Context/AuthContext'


export default function UserList() {
     const [usersList, setUsersList] = useState([])
const [pageSize, setPageSize] = useState(4);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const GROUP_SIZE = 4;
const groupStart = Math.floor((currentPage - 1) / GROUP_SIZE) * GROUP_SIZE + 1;
const groupEnd   = Math.min(groupStart + GROUP_SIZE - 1, totalPages);
const visiblePages = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);

// helpers
// const gotoPage = (p) => {
//   if (p < 1 || p > totalPages || p === currentPage) return;
//   getAllUsers(pageSize, p);
// };
const gotoPage = (p) => {
  if (p < 1 || p > totalPages || p === currentPage) return;
  getAllUsers(pageSize, p, nameValue, emailValue);
};

const nextGroup = () => {
  const nextStart = groupStart + GROUP_SIZE;
  if (nextStart <= totalPages) gotoPage(nextStart);
};

const prevGroup = () => {
  const prevStart = groupStart - GROUP_SIZE;
  if (prevStart >= 1) gotoPage(prevStart);
};

     
   const [itemId, setItemId] = useState(0);
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm();
      const [nameValue, setNameValue] = useState("")
      const [emailValue, setEmailValue] = useState("")
      const [countryValue, setCountryValue] = useState("")
 let {loginData}= useContext(AuthContext)
   let navigate = useNavigate()

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
  
 let getAllUsers = async (ps = pageSize, pn = currentPage,  userName = nameValue,
  email = emailValue, country=countryValue) => {
  try {
    const response = await axiosInstance.get(`${USERS_URLS.GETUSERS}`, {
      params: { pageSize: ps, pageNumber: pn ,userName,email,country},
    });
    setUsersList(response.data?.data || []);
    setTotalPages(response.data?.totalNumberOfPages || 1);
    setPageSize(ps);
    setCurrentPage(pn);
  } catch (error) {
    console.log(error);
  }
};
  const getNameValue =(input)=>{
 setNameValue(input.target.value)
 getAllUsers(4,1,input.target.value,emailValue,countryValue)
  }
   const getEmailValue =(input)=>{
 setEmailValue(input.target.value)
 getAllUsers(4,1,nameValue, input.target.value,countryValue)
  }
   const getCountryValue =(input)=>{
 setCountryValue(input.target.value)
 getAllUsers(4,1,nameValue,emailValue,input.target.value)
  }
useEffect(() => { getAllUsers(4, 1)
  if(loginData?.userGroup!='SuperAdmin'){
 navigate("/login");
 }
 }, 

[]);
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
     <div className="row g-2 mb-3">
  <div className="col-12 col-md-4">
    <input type="text" className="form-control"  placeholder="Search by Name..."  value={nameValue} onChange={getNameValue} />
  </div>
  <div className="col-12 col-md-4">
    <input type="text" className="form-control" placeholder="Search by Email..."   value={emailValue} onChange={getEmailValue} />
  </div>
    <div className="col-12 col-md-4">
    <input type="text" className="form-control" placeholder="Search by Country..." onChange={getCountryValue} />
  </div>
</div>


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
            <td>{item.imagePath ? <img className='table-img r50 ' src={`${baseImgURL}${item.imagePath}`} alt=''/> : <img className='table-img' src={NoUserImage} alt=''/>}</td>
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
    <div className="d-flex justify-content-end pt-3">
     <nav aria-label="Users pagination ">
    <ul className="pagination mb-0 newdesign">
      <li className={`page-item ${groupStart === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={prevGroup} aria-label="Previous group">
          &laquo;
        </button>
      </li>

      {visiblePages.map((p) => (
        <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => gotoPage(p)}>
            {p}
          </button>
        </li>
      ))}

      <li className={`page-item ${groupEnd === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={nextGroup} aria-label="Next group">
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
    </div>

           </div>
    </>
  )
}
