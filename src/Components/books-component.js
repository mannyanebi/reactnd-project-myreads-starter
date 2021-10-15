import React from "react";

import PropTypes from "prop-types";

function BooksComponent(props) {
	const {shelfHandler, book} = props

	const shelfContentHandler = e => {
		shelfHandler(book, e.target.value);
	};

	const image = book.imageLinks ? book.imageLinks.thumbnail : null;

	return (
		<div>
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${image})`,
							}}
						></div>
						<div className="book-shelf-changer">
							<select onChange={shelfContentHandler} value={book.shelf}>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="toRead">To Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors}</div>
				</div>
			</li>
		</div>
	);
}

BooksComponent.propTypes = {
	shelfHandler: PropTypes.func.isRequired,
};

export default BooksComponent;
