import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

class SearchComponent extends Component {
  state = {
    query: '',
    books: []
  }

  onUpdateShelf = (shelfIndex, bookId) => {
    let shelf = 'none';
    if (shelfIndex <= 2) {
      shelf = this.props.shelves[shelfIndex];
    }
    BooksAPI.update({id: bookId}, shelf)
      .then(res => {
        this.setState((currentState) => {
          const updatedBooks = currentState.books;
          
          updatedBooks.forEach(book => {
            if (book.id === bookId) {
              book.shelf = shelf;
            }
          })
          
          return updatedBooks;
        });
      })
      .catch(error => this.setState( { books: [] }));
  };

  onChange = (text) => {
    this.setState({ query: text })

    if (text !== '') {
      BooksAPI.search(text.trim())
      .then(books => 
          books
          .filter(book => book.imageLinks !== undefined)
          .map(book => {
            const b = {
              id: book.id,
              title: book.title,
              authors: book.authors !== undefined && book.authors.length > 0 ? book.authors: [],
              image: book.imageLinks.thumbnail,
              shelf: book.shelf ? book.shelf : 'none'
            }
          return b;
      }))
      .then(books => {
        const userBooks = this.props.books;
        for (const key in userBooks) {
          const book = userBooks[key];
          books
            .filter(b => b.id === book.id)
            .map(b => {
              b.shelf = book.shelf;
              return b;
            });
        }
        this.setState({ books: books })
      })
      .catch(error => {
        this.setState({ books: [] });
        console.log(error);
      });
    } else {
      this.setState({ books: [] });
    }
  };

  render() {

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/'>
        <button onClick={this.props.onBackClick} className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input 
            type="text" 
            placeholder="Search by title or author" 
            value={this.state.query}
            onChange={(e) => this.onChange(e.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.state.query !== '' && this.state.books.map(book =>
              <li key={book.id}>
                <BookComponent book={book} onShelfChange={this.onUpdateShelf} />
              </li>
              )
          }
        </ol>
      </div>
    </div>
    )
  }
}

SearchComponent.propTypes = {
  shelves: PropTypes.array,
  books: PropTypes.array,
  onBackClick: PropTypes.func
}

export default SearchComponent;
