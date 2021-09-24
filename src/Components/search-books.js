import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBooksView from './list-books-view';
import * as BooksAPI from './../BooksAPI';

import PropTypes from 'prop-types';

export default class SearchBooks extends Component {
	static propTypes = {
		mybooks: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
		
	};

	state = {
		Books: [],
		query: '',
		searchError: false,
	};

	searchHandler = (e) => {
		let query = e.target.value;
		this.setState(() => {
			return { query: query };
		});
		this.searchUpdateHandler(query);
	};

	searchUpdateHandler = query => {
		if (query) {
			BooksAPI.search(query).then((Books) => {
				if (Books.length > 0) {
					Books = this.shelfChangeHandler(Books);
					this.setState(() => ({
						Books: Books,
						searchError: false,
					}));
				} else {
					this.setState(() => ({
						Books: [],
						searchError: true,
					}));
				}
			});
		} else {
			this.setState((currentState) => ({
				Books: currentState.Books,
				searchError: false,
			}));
		}
	};
	shelfChangeHandler = (Books) => {
		let mybooks = this.props.mybooks;

		Books.forEach((book) => {
			book.shelf = 'none';
			mybooks.forEach((myBook) => {
				if (myBook.id === book.id) {
					book.shelf = myBook.shelf;
				}
			});
		});
		return Books;
	};

	render() {
		const { Books, searchError } = this.state;
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link to='/' className='close-search'>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						<input autoFocus type='text' placeholder='Search books by title or author' value={this.state.query} onChange={this.searchHandler} />
					</div>
				</div>
				<div className='search-books-results'>
					{Books.length > 0 && (
						<div>
							<ol className='books-grid'>
								{Books.map((book) => (
									<ListBooksView key={book.id} book={book} shelfClickHandler={this.props.onChange} />
								))}
							</ol>
						</div>
					)}
					{searchError && <div> No Books Available </div>}
				</div>
			</div>
		);
	}
}
