import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import BooksComponent from './books-component';

function ListBooks(props) {

	const {books, onChange} = props;

	const filterCurrentBook = books.filter(book => book.shelf === 'currentlyReading');
	const filterToRead = books.filter(book => book.shelf === 'wantToRead');
	const filterPresentRead = books.filter(book => book.shelf === 'read');

	function booksHandler (books, head){
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{head}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{books.map(book => (
							<BooksComponent key={book.id} book={book} shelfHandler={onChange}/>
						))}
					</ol>
				</div>
			</div>
		);
	};

	return (
		<div className='list-books'>
			<div className='list-books-title'>
				<h1>MyReads</h1>
			</div>
			<div className='list-books-content'>
				<div>
					{booksHandler(filterCurrentBook, 'Currently Reading Books')}
					{booksHandler(filterToRead, 'Books To Be Read')}
					{booksHandler(filterPresentRead, 'Read Books')}
				</div>
			</div>

			<div className='open-search'>
				<Link to='/search'>Add Book</Link>
			</div>
		</div>
	)
}

export default ListBooks;
