import React from "react";

import PropTypes from "prop-types";

function ListBooksView(props) {
	const {shelfClickHandler, book} = props

	const shelfUpdateHandler = e => {
		shelfClickHandler(book, e.target.value);
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
							<select onChange={shelfUpdateHandler} value={props.book.shelf}>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
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

ListBooksView.propTypes = {
	shelfClickHandler: PropTypes.func.isRequired,
};

export default ListBooksView;
