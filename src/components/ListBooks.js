import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import "../assets/styles/buttons.css";
import actionTypes from "../redux/actions/actionTypes";
import CustomModal from "./CustomModal";
import {Link} from 'react-router-dom'

const ListBooks = () => {
  const { booksState, categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [willDeleteBook,setWillDeleteBook] = useState("")

  const dispatch = useDispatch();
  const deleteBook = (id) => {
    dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_FAIL,
          payload: "kitap silerken hata oluştu",
        });
      });
  };

  return (
    <div className="my-5">
      <div className="d-flex justify-content-end">
        <Link to={"/add-book"} className="btn btn-primary">Kitap Ekle</Link>
      </div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Category</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book, index) => {
            let myCategory = null;
            for (let i = 0; i < categoriesState.categories.length; i++) {
              if (categoriesState.categories[i].id === book.categoryId) {
                myCategory = categoriesState.categories[i];
              }
            }
            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                  <button
                    onClick={() =>{ 
                      setShowDeleteModal(true)
                      setWillDeleteBook(book.id)
                    }}
                    className="generalBtn deleteBtn"  
                  >
                    Sil
                  </button>
                  <button className="generalBtn editBtn">Guncelle</button>
                  <Link to={`/book-detail/${book.id}`} className="generalBtn detailBtn">Detay</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <CustomModal
          title="silme"
          message="silmek istediğinize emin misiniz?"
          onCancel={()=>setShowDeleteModal(false)}
          onConfirm=
          {()=>{deleteBook(willDeleteBook)
            setShowDeleteModal(false)
          }}
        />
      )}
    </div>
  );
};

export default ListBooks;
