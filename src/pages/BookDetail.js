import React, {useEffect,useState} from 'react';
import Header from '../components/Header'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import api from '../api/api'
import urls from '../api/urls';
import { Link } from 'react-router-dom';

const BookDetail =()=>{
    const [myBook,setMyBook]=useState(null)
    const [bookCategory,setBookCategory]=useState(null)
    const params=useParams()
    useEffect(()=>{
        /* http://localhost:3004/books/2*/
        api.get(`${urls.books}/${params.bookId}`)
        .then((resBook)=>{
            setMyBook(resBook.data);
            api.get(`${urls.categories}/${resBook.data.categoryId}`)
            .then((resCategory)=>{
                setBookCategory(resCategory.data)
            })
            .catch(err=>{})
        })
        .catch(err=>{})
    },[])
    if(myBook===null || bookCategory=== null) return null
    return(
        <div>
            <Header />
            <div className='container my-5'>
            <h3>Kitap Adi:{myBook.name}</h3>
            <h3>Yazari:{myBook.author}</h3>
            <h3>Fiyati:{myBook.price}</h3>
            <h3>Yayinevi:{myBook.publisher}</h3>
            <h3>ISBN:{myBook.isbn}</h3>
            <h3>Kategori İsmi:{bookCategory.name}</h3>
            <Link to={"/"}>Geri</Link>
            </div>
            
        </div>
    )
}

export default BookDetail;