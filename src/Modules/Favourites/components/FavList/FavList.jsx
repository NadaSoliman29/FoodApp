import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import {
  axiosInstance,
  FAVS_URLS,
  RECIPES_URLS,
} from "../../../../services/Urls";
import headerImg from "../../../../assets/images/RecipesHeaderimg.png";
import Header from "../../../Shared/components/Header/Header";
import favImg from "../../../../assets/images/favpic.jpg";
import Nodata from "../../../Shared/components/NoData/Nodata";
import NoRecipesImg from "../../../../assets/images/norecipes.jpg";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";

export default function FavList() {
  const [itemId, setItemId] = useState(0);
  //  delete model data
 const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) =>{
      setItemId(id)
      setShow(true);
    }

  const closeForm = () => setShowForm(false);
  const [favList, setFavList] = useState([]);

  let getAllFavs = async () => {
    try {
      let response = await axiosInstance.get(`${FAVS_URLS.GET_ALL_FAVS}`);

      setFavList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteFav = async (id) => {
    try {
      let response = await axiosInstance.delete(`${FAVS_URLS.DELETE_FAVS(id)}`);
   handleClose()
      getAllFavs();
      toast.success(response?.data?.message || " Removing from List");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  let { loginData } = useContext(AuthContext);
  let navigate = useNavigate();
  useEffect(() => {
    getAllFavs();

    if (loginData?.userGroup == "SuperAdmin") {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {/* delete model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" text-center">
          <DeleteConfirmation deleteItem={"Favorite "} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-outline-danger"
            variant="white"
            onClick={() => deleteFav(itemId)}
          >
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete model */}
      <Header
        title={"Favorite Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgPath={headerImg}
      />
      <div>
        <input
          type="text"
          className="form-control  my-2"
          placeholder="Search by Name..."
        />
      </div>
      <div className=" containern p-5">
 <div className="row g-4 align-items-stretch">
          {favList.length > 0 ? (
            favList.map((item) => (
      <div className="col-md-4 d-flex mb-4" key={item.id}>
        <div className="card card-fixed favimg h-100">
                  {item.recipe.imagePath ? (
                    <img
                      className="img-fluid"
                      src={`https://upskilling-egypt.com:3006/${item.recipe.imagePath}`}
                      alt=""
                    />
                  ) : (
                    <img className=" img-fluid" src={NoRecipesImg} alt="" />
                  )}

          <div className="card-body d-flex flex-column">
                    <p className="card-text">{item.recipe.name}</p>
                    <p className="card-text">{item.recipe.description}</p>
                      <div className="mt-auto d-flex justify-content-end">
              <i
                onClick={() => handleShow(item.id)}
                className="fa fa-heart text-danger cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Nodata />
          )}
        </div>
      </div>
    </>
  );
}
