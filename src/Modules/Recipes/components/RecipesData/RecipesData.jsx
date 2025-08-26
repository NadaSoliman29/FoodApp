import React, { useEffect, useState } from "react";
import FillRecipes from "../../../Shared/components/FillRecipes/FillRecipes";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function RecipesData() {
  const {id} = useParams()
    const location = useLocation();                              
  const searchParams = new URLSearchParams(location.search);    
  const isView = searchParams.get("mode") === "view";      
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
    const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [itemDetails, setItemDetails] = useState(null)
    let [isLoading, setIsLoading] = useState(true);
  let {register,formState:{errors} , handleSubmit,reset } = useForm()
    let navigate = useNavigate()
  
    const appendToFormData=(data)=>{
        const logFormData = new FormData();
     logFormData.append("name",data?.name);
     logFormData.append("tagId",data?.tagId );
     logFormData.append("price",data?.price );
     logFormData.append("categoriesIds",data?.categoriesIds);
     logFormData.append("description",data?.description);
    //  logFormData.append("recipeImage",data?.recipeImage[0]);
      if (data?.recipeImage && data.recipeImage[0]) {
      logFormData.append("recipeImage", data.recipeImage[0]);
    }
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
     //  GetitemDetails

  let getItemDetails =async()=>{
   try {
      let response= await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`, 
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response)
        setItemDetails(response.data)
         reset({
        name: data?.name ?? "",
        tagId: data?.tag?.id ?? "",
        price: data?.price ?? "",
        categoriesIds: data?.category?.[0]?.id ?? "",
        description: data?.description ?? "",
      });
    } catch (error) {
      console.log(error);
      
    }
         setIsLoading(false)

  }

  let getAllCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5000&pageNumber=1",
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
    getItemDetails()
  console.log(itemDetails)
  }, []);

    const existingImageUrl = itemDetails?.imagePath
    ? `https://upskilling-egypt.com:3006/${itemDetails.imagePath}`
    : "";
  return (
    <>
      <FillRecipes id={id} />
      
      <div>
        <h6  className="text-muted mb-3">  {isView ? "View Item" : id ? "Update Item" : "Add New Item"}</h6>
      </div>

      <div className="container my-4">
        <div className="row d-flex justify-content-center align-items-center">
          {isLoading&&id? <div className=" d-flex justify-content-center align-items-center"><span>  <i className="fa-solid fa-spinner fa-spin-pulse text-success fs-1 "></i></span></div> : <form onSubmit={handleSubmit(onSubmit)} className="w-75" >
            <div>
              <input   disabled={isView}     defaultValue={id?itemDetails?.name: ""}   {...register('name',{ required:"Field is Required"})} className="form-control mb-3 form-soft bg-white "  placeholder="Recipe Name"  />
             {/* henaa 3ndii moshkelaa f el ? lmaa bshelaa m4 byrg3 ay 7aga  */}
              {errors.name&& <span className="text-danger">{errors.name.message}</span>}
              <div className="mb-3">
                <select   disabled={isView}     defaultValue={id?itemDetails?.tag.id : ""}  {...register('tagId' , {required:"Field is Required"})}  className="form-select pe-5 form-soft" >

                  <option value="" disabled hidden>Select Tag</option>
               {tagsList.map(tag => <option  key={tag.id} value={tag.id}>{tag.name}</option>)}  
                </select>
                {errors.tagId&& <span className="text-danger">{errors.tagId.message}</span>}

              </div>

              <div className="input-group mb-3 "> 
                <input   disabled={isView}    defaultValue={id?itemDetails?.price : ""}  {...register('price' , {required:"Field is Required"})} className="form-control form-soft bg-white"  placeholder="price" />
                    

                <span className="input-group-text  fw-semibold">
                  EGP
                </span>
              </div>
                 {errors.price&& <span className="text-danger">{errors.price.message}</span>}

              <div className="">
                <select   disabled={isView}     defaultValue={id?itemDetails?.category[0]?.id : ""}  {...register('categoriesIds',{required:"Field is Required"})} className="form-select form-control pe-5 form-soft">
                  <option value="" disabled>Select Category</option>
                
              {categoriesList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}


                </select>
               {errors.categoriesIds&& <span className="text-danger">{errors.categoriesIds.message}</span>}

              </div>

              <div>
                <label className="form-label small mb-3" htmlFor="desc">
                  {/* Description <span className="text-danger">*</span> */}
                </label>
                <textarea   disabled={isView}     defaultValue={id?itemDetails?.description : "" } {...register('description' , {required:"Field is Required"})} id="desc" placeholder="Description"className="form-control form-soft" rows="4" />
                 {errors.description && <span className="text-danger">{errors.description.message}</span>}

                </div>

               <div className="mt-3">
                  <input
                    // ❗️ لا value ولا defaultValue
                    type="file"
                    id="itemImage"
                    className="d-none"
                    disabled={isView}
                    {...register("recipeImage")}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFileName(file ? file.name : "");
                      setPreview(file ? URL.createObjectURL(file) : "");
                    }}
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
              onClick={()=>navigate("/dashboard/recipes")}  >
                    {isView ? "Back" : "Cancel"}   
                </button>
               {!isView && (                                         
                    <button className="btn btn-success savebtn fw-semibold">
                      {id ? "Update" : "Save"}
                    </button>
                  )}
              </div>
            </div>
          </form> }
          
        </div>
      </div>
    </>
  );
}
