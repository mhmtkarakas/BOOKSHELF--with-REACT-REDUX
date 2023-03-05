const actionTypes={
    bookActions:{
          GET_BOOKS_START:"GET_BOOKS_START",
          GET_BOOKS_SUCCESS:"GET_BOOKS_SUCCESS",
          GET_BOOKS_FAIL:"GET_BOOKS_FAIL",
          DELETE_BOOK_START:"DELETE_BOOK_START",
          DELETE_BOOK_SUCCESS:"DELETE_BOOK_SUCCESS",
          DELETE_BOOK_FAIL:"DELETE_BOOK_FAIL",
          ADD_BOOK:"ADD_BOOK",
          EDIT_BOOK:"EDIT_BOOK",
          DELETE_BOOK_AFTER_DELETE_CATEGORY:"DELETE_BOOK_AFTER_DELETE_CATEGORY"
    },
    categoryActions:{
        GET_CATEGORIES_START:"GET_CATEGORIES_START",
        GET_CATEGORIES_SUCCESS:"GET_CATEGORIES_SUCCESS",
        GET_CATEGORIES_FAIL:"GET_CATEGORIES_FAIL",
        ADD_CATEGORY:"ADD_CATEGORY",
        DELETE_CATEGORY:"DELETE_CATEGORY"
    }

}

export default actionTypes