import React, { useState } from "react";

import Header from "../components/Header";
import { useSelector } from "react-redux";

import api from "../api/api"
import urls from "../api/urls"

const AddCategory = () => {
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    /*Validation*/
    if (form.name === "") {
      alert("Kategori alanı boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase === form.name.toLowerCase
    );
    console.log(hasCategory);
    if (hasCategory !== undefined) {
      alert("Böyle bir kategori mevcut");
      return;
    }
    api.post(urls.categories,form)
    .then(res=>{})
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
              placeholder="Kategory ismi giriniz.."
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
