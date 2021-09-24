import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ListBooksView from './list-books-view';

function ListBooks(props) {

	const {books, onChange} = props;

	const filterCurrentBook = books.filter(book => book.shelf === 'currentlyReading');
	const filterToRead = books.filter(book => book.shelf === 'wantToRead');
	const filterPresentRead = books.filter(book => book.shelf === 'read');

	const booksHandler = (books, head) => {
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{head}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{books.map(book => (
							<ListBooksView key={book.id} book={book} shelfClickHandler={onChange}/>
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
					{booksHandler(filterToRead, 'Want to Read Books')}
					{booksHandler(filterPresentRead, 'Read Books')}
				</div>
			</div>

			<div className='open-search'>
				<Link to='/search'>Add a book</Link>
			</div>
		</div>
	)
}

export default ListBooks;
