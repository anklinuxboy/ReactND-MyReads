import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelfComponent from './BookShelfComponent';
import PropTypes from 'prop-types';

class HomeComponent extends Component {

  render() {

    const { shelves, books, onUpdateShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              shelves.map((shelf) => (
                <BookShelfComponent
                  key={shelf}
                  title={shelf} 
                  books={books.filter(book => book.shelf === shelf)}
                  onShelfChange={onUpdateShelf} />
              ))
            }
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'><button>Add a book</button></Link>
      </div>
    </div>
    )
  }
}

HomeComponent.propTypes = {
  shelves: PropTypes.array,
  books: PropTypes.array,
  onUpdateShelf: PropTypes.func
}

export default HomeComponent;