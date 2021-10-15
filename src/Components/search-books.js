import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import BooksComponent from './books-component';
import * as booksAPI from './../BooksAPI';

import PropTypes from 'prop-types';

function SearchBooks(props) {

    const [books, setBooks] = useState([])
    const [query, setQuery] = useState('')
    const [searchError, setSearchError] = useState(false)

    function searchBooksHandler(event) {
        let queryString = event.target.value;
        setQuery(queryString)
        searchBooksUpdateHandler(queryString);
    };

    function searchBooksUpdateHandler(searchQuery) {
        if (searchQuery) {
            booksAPI.search(searchQuery).then((searchedBooks) => {
                if (searchedBooks.length > 0) {
                    let updatedSearchedBooks = shelfContentHandler(searchedBooks);
                    setBooks(updatedSearchedBooks)
                    setSearchError(false)
                } else {
                    setBooks([])
                    setSearchError(true)
                }
            });
        } else if (searchQuery === "") {
            setBooks([])
            setSearchError(false)
        }
    };

    function shelfContentHandler(shelfbooks) {
        let mybooks = props.mybooks;

        shelfbooks.forEach((book) => {
            book.shelf = 'none';
            mybooks.forEach((myShelfBook) => {
                if (myShelfBook.id === book.id) {
                    book.shelf = myShelfBook.shelf;
                }
            });
        });
        return shelfbooks;
    };

    return (
        <div className='search-books'>
            <div className='search-books-bar'>
                <Link to='/' className='close-search'>
                    Close
                </Link>
                <div className='search-books-input-wrapper'>
                    <input autoFocus type='text' placeholder='Search books by title or author' value={query}
                           onChange={searchBooksHandler}/>
                </div>
            </div>
            <div className='search-books-results'>
                {books.length > 0 && (
                    <div>
                        <ol className='books-grid'>
                            {books.map((book) => (
                                <BooksComponent key={book.id} book={book} shelfHandler={props.onChange}/>
                            ))}
                        </ol>
                    </div>
                )}
                {searchError && <div> No Books Available </div>}
            </div>
        </div>
    );
}

SearchBooks.propTypes = {
    mybooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SearchBooks;