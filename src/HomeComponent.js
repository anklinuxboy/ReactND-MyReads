import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelfComponent from './BookShelfComponent';
import * as BooksAPI from './BooksAPI';

class HomeComponent extends Component {
  state = {
    books: [],
    shelves: ['currentlyReading', 'wantToRead', 'read']
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => books.map(book => {
        const b = {
          id: book.id,
          title: book.title,
          author: book.authors[0],
          shelf: book.shelf,
          image: book.imageLinks.thumbnail
        }

        return b;
      }))
      .then(books => this.setState({ books: books}));
  }

  updateShelf = (shelfIndex, bookId) => {
    BooksAPI.update({id: bookId}, this.state.shelves[shelfIndex])
      .then(res => {
        this.setState((currentState) => {
          const updatedBooks = currentState.books;

          for (const key in updatedBooks) {
            const book = updatedBooks[key];
            if (res.currentlyReading.includes(book.id)) {
              book.shelf = currentState.shelves[0];
            } else if (res.wantToRead.includes(book.id)) {
              book.shelf = currentState.shelves[1];
            } else if (res.read.includes(book.id)) {
              book.shelf = currentState.shelves[2];
            }
          }

          return updatedBooks;
        });
      });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              this.state.shelves.map((shelf) => (
                <BookShelfComponent
                  key={shelf}
                  title={shelf} 
                  books={this.state.books.filter(book => book.shelf === shelf)}
                  onShelfChange={this.updateShelf} />
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

export default HomeComponent;