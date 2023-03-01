import React, {useEffect} from "react";
import { useDispatch,useSelector} from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import Error from "./pages/Error";
import EditBook from "./pages/EditBook";




function App() {
  const dispatch=useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);

  useEffect(()=>{
   dispatch({type:actionTypes.bookActions.GET_BOOKS_START})
   api.get(urls.books)
   .then((res)=>{
      dispatch({type:actionTypes.bookActions.GET_BOOKS_SUCCESS,payload:res.data})
   })
   .catch((error)=>{
      dispatch({type:actionTypes.bookActions.GET_BOOKS_ERROR,payload:"serverda bir hata oluştu."})
   })
   /* fetch categories */
   dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_START})
   api.get(urls.categories)
   .then((res)=>{
    dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,payload:res.data});
   })
   .catch((err)=>{
    dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_FAIL,payload:"serverda bir hata oluştu"})
   })
  },[])
   
  if (booksState.success === false || categoriesState.success === false)
  return null;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-detail/:bookId"  element={<BookDetail />} />
        <Route path='/add-book' element={<AddBook />} />
        <Route path='/edit-book/:bookId' element={<EditBook />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
