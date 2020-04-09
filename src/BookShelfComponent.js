import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookComponent from './BookComponent'

class BookShelfComponent extends Component {

  render() {
    const { title, books, onShelfChange } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map(book => 
                <li key={book.id}>
                  <BookComponent book={book} onShelfChange={onShelfChange} />
                </li>
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

BookShelfComponent.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  onShelfChange: PropTypes.func
}

export default BookShelfComponent;
