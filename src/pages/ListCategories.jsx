import React from "react";

import Header from "../components/Header";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
 // console.log(categoriesState);

  return (
    <div>
      <Header /> 
      <div className="container my-5">
        <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" to={"/add-category"}>Kategori Ekle</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sıra No</th>
              <th scope="col">Kategori Adı</th>
              <th scope="col">Kayıtlı Kitap Sayısı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.length === 0 && (
              <tr>
                <td colSpan={4}>Kayıtlı Kategory Yok</td>
              </tr>
            )}
            {categoriesState.categories.length > 0 && (
              <>
                {categoriesState.categories.map((category, index) => {
                    const books=booksState.books.filter(item=>item.categoryId===category.id)
                    console.log(books)
                  return (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>{books.length}</td>
                      <td>@mdo</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategories;
