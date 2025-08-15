import React, { useEffect, useState } from "react";
import FillRecipes from "../../../Shared/components/FillRecipes/FillRecipes";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipesData() {
  const {id} = useParams()
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
    const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [userDetails, setUserDetails] = useState(null)
  let {register,formState:{errors} , handleSubmit,resetField } = useForm()
    let navigate = useNavigate()
  
    const appendToFormData=(data)=>{
        const logFormData = new FormData();

      const tagId = parseInt(data.tagId, 10);
    const categoriesIds = parseInt(
      Array.isArray(data.categoriesIds) ? data.categoriesIds[0] : data.categoriesIds,
      10
    );

    if (Number.isNaN(tagId)) { throw new Error("Please select a Tag"); }
    if (Number.isNaN(categoriesIds)) { throw new Error("Please select a Category"); }
     logFormData.append("name",data?.name);
     logFormData.append("tagId",data?.tagId );
     logFormData.append("price",data?.price );
     logFormData.append("categoriesIds",data?.categoriesIds);
     logFormData.append("description",data?.description);
     logFormData.append("recipeImage",data?.recipeImage[0]);
        return logFormData
   }

  //  AddItemApi
  let onSubmit =async(data)=>{
  let recipeData = appendToFormData(data);
   try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/",recipeData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response);
      
           toast.success(response?.data?.message||" Recipe created successfully");
                navigate('/dashboard/recipes')
    } catch (error) {
      console.log(error);
           toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
     //  GetUserDetails

  let getUserDetails =async(data)=>{
  let recipeData = appendToFormData(data);
   try {
      let {data} = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,recipeData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(data)
        setUserDetails(data)
      
           toast.success(response?.data?.message||" Recipe created successfully");
                navigate('/dashboard/recipes')
    } catch (error) {
      console.log(error);
           toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }

  let getAllCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getAllTags = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setTagsList(response.data);
      // toast.success("Added Successfully")
    } catch (error) {
      //  toast.error(error.response?.data?.message || "Try Again");
    }
  };
  useEffect(() => {
    getAllTags();
    getAllCategories();
    if(id)
    getUserDetails()
  }, []);
  return (
    <>
      <FillRecipes id={id} />
      <div>
        <h6  className="text-muted mb-3">  {id?'Update Item':'Add New Item'}</h6>
      </div>

      <div className="container my-4">
        <div className="row d-flex justify-content-center align-items-center">
           <form onSubmit={handleSubmit(onSubmit)} className="w-75" >
            <div>
              <input {...register('name',{ required:"Field is Required"})} className="form-control mb-3 form-soft"  placeholder="Recipe Name"  />
              {errors.name&& <span className="text-danger">{errors.name.message}</span>}
              <div className="mb-3">
                <select  {...register('tagId' , {required:"Field is Required"})}  className="form-select pe-5 form-soft" >

                  <option value="">Tag</option>
               {tagsList.map(tag => <option  key={tag.id} value={tag.id}>{tag.name}</option>)}  
                </select>
                {errors.tagId&& <span className="text-danger">{errors.tagId.message}</span>}

              </div>

              <div className="input-group mb-3 "> 
                <input {...register('price' , {required:"Field is Required"})} className="form-control form-soft"  placeholder="350.99" />
                     {errors.price&& <span className="text-danger">{errors.price.message}</span>}

                <span className="input-group-text  fw-semibold">
                  EGP
                </span>
              </div>

              <div className="">
                <select {...register('categoriesIds',{required:"Field is Required"})} className="form-select form-control pe-5 form-soft">
                
              {categoriesList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}


                </select>
               {errors.categoriesIds&& <span className="text-danger">{errors.categoriesIds.message}</span>}

              </div>

              <div>
                <label className="form-label small mb-3" htmlFor="desc">
                  {/* Description <span className="text-danger">*</span> */}
                </label>
                <textarea  {...register('description' , {required:"Field is Required"})} id="desc" placeholder="Description"className="form-control form-soft" rows="4" />
                 {errors.description && <span className="text-danger">{errors.description.message}</span>}

                </div>

              <div className="mt-3">
                <input     {...register("recipeImage", {
              onChange: (e) => {
            const file = e.target.files?.[0];
            // if (preview) URL.revokeObjectURL(preview);      // نظافة للذاكرة
            setFileName(file ? file.name : "");
            setPreview(file ? URL.createObjectURL(file) : "");
             },
             })}
            type="file" id="itemImage" className="d-none"
                   />
{errors.recipeImage && <span className="text-danger">{errors.recipeImage.message}</span>}


                <label
                  htmlFor="itemImage"
                  className="upload-box rounded-4 d-block"
                  tabIndex="0"
                >
                  <i className="fa-solid fa-arrow-up-from-bracket mb-2"></i>
                  <div>
                    <span className="text-muted">Drag &amp; Drop or </span>
                    <span className="link-success text-decoration-none">
                      Choose an Item Image to Upload
                    </span>
                  </div>
                   {fileName && (
                   <div className="mt-2 small text-truncate fw-semibold filename-pill">
                  {fileName}
                </div>
        )}

        
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="preview" className="img-preview" />
          </div>
        )}
                </label>

              </div>
              <hr className="m-3" />

              <div className="d-flex justify-content-end p-2 ">
                <button
                  type="button"
                  className="btn btn-outline-success px-4 me-5 cancelbtn fw-semibold"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success  savebtn fw-semibold"
                >
                  {id?'Update':"Save"}
                 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
