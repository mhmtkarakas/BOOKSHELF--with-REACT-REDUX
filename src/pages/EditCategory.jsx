import React, { useState } from "react";

import Header from "../components/Header";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

const EditCategory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categoryId } = useParams();
  const { categoriesState } = useSelector((state) => state);

  const myCategory = categoriesState.categories.find(
    (item) => item.id === categoryId
  );
  const [form, setForm] = useState(myCategory);
  console.log(myCategory);
  const handleSubmit = (e) => {
    e.preventDefault();
    /*Validation*/
    if (form.name === "") {
      alert("Kategori alanı boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === form.name.toLowerCase()
    );
    // console.log(hasCategory);
    if (hasCategory !== undefined) {
      alert("Böyle bir kategori mevcut");
      return;
    }
    api.put(`${urls.categories}/${categoryId}`,form)
    .then(res=>{
      dispatch({ type: actionTypes.categoryActions.EDIT_CATEGORY,payload:form})
      navigate("/list-categories")
    })
    .catch(err=>{})
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategori Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Yeni kategoriyi giriniz.."
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button
              disabled={
                form.name.toLowerCase() === myCategory.name.toLowerCase()
                  ? true
                  : false
              }
              className="btn btn-primary w-50"
              type="submit"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
