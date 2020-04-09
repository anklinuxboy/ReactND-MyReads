import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookComponent extends Component {
  
  render () {

    const { book, onShelfChange } = this.props;

    return (
        <div className="book">
          <div className="book-top">
            <div 
              className="book-cover"
              style={{ width: 128, height: 193,
              backgroundImage: `url("${book.image}")` }}>
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => onShelfChange(e.target.selectedIndex - 1, book.id)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    )
  }
}

BookComponent.propTypes = {
  book: PropTypes.object,
  onShelfChange: PropTypes.func
}

export default BookComponent;