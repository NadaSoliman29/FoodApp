import React from "react";
import logo from "../../../../assets/images/logo (2).png";
import vector from "../../../../assets/images/Vector (1).png";
import notfound from "../../../../assets/images/notfound.png";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  return (
    <>
      <div className="nf">
        <header className="container py-3">
          <img src={logo} alt="Food Recipe" height={70} />
        </header>

        <section className="nf-hero">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-5">
                <h3 className="fw-bold mb-2">Ooops.</h3>
                <p className="nf-subtitle mb-2">Page not found</p>
                <p className="mb-4">
                  This Page doesn’t exist or was removed!
                  <br /> We suggest you back to home.
                </p>
                <button
                  className="btn btn-success w-75"
                  onClick={() => navigate("/dashboard")}
                >
                  <i className="fa fa-arrow-left me-2" /> Back To Home
                </button>
              </div>

              <div className="col-lg-7 text-center">
                <img src={notfound} alt="404" className="img-fluid nf-ill" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
