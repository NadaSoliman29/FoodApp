
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext'
import { axiosInstance, FAVS_URLS, RECIPES_URLS } from '../../../../services/Urls';
import headerImg from '../../../../assets/images/RecipesHeaderimg.png'
import Header from '../../../Shared/components/Header/Header';
import favImg from '../../../../assets/images/favpic.jpg'
import Nodata from '../../../Shared/components/NoData/Nodata';
import NoRecipesImg from "../../../../assets/images/norecipes.jpg"



export default function FavList() {
      const [favList, setFavList] = useState([]);

       let getAllFavs = async()=>{
          try {
                 let response = await axiosInstance.get(`${FAVS_URLS.GET_ALL_FAVS}`, 
                  )
             
                 setFavList(response.data.data)
               } catch (error) {
                 console.log(error)
               }
        }
           
  
   let {loginData}= useContext(AuthContext)
   let navigate = useNavigate()
     useEffect(() => {
      getAllFavs()
 
    if(loginData?.userGroup=='SuperAdmin'){
    navigate("/login");
    }
     }, [])
  return (
    <>
     <Header title={"Favorite Items"} desc={'You can now add your items that any user can order it from the Application and you can edit'}
           imgPath={headerImg} />
           <div>
           <input type='text' className='form-control  my-2' placeholder='Search by Name...'/>

           </div>
    <div className=' containernp-5'>
      <div className="row">
        {favList.length>0? 
       favList.map(item=> <div className="col-md-4 p-4">
 <div className="card" style={{width: '18rem'}}>
  {item.recipe.imagePath ? <img className='card-img-top' src={`https://upskilling-egypt.com:3006/${item.recipe.imagePath}`} alt=''/> 
  : <img className='card-img-top' src={NoRecipesImg} alt=''/>}

  <div className="card-body">
       <p className="card-text">{item.recipe.name}</p>

    <p className="card-text">{item.recipe.description}</p>
  </div>
</div>
        </div>)
       : <Nodata/>}
       
     
      </div>
    </div>
  

    
    </>
  )
}
