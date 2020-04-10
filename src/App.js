import React from 'react'
import { Route } from 'react-router-dom';
import HomeComponent from './HomeComponent'
import './App.css'
import SearchComponent from './SearchComponent';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ['currentlyReading', 'wantToRead', 'read']
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    BooksAPI.getAll()
    .then(books => books.map(book => {
      const b = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        shelf: book.shelf,
        image: book.imageLinks.thumbnail
        }

      return b;
    }))
    .then(books => this.setState({ books: books}));
  };

  onBackClick = () => {
    this.fetchData();
  };

  updateShelf = (shelfIndex, bookId) => {
    let shelf = 'none';
    if (shelfIndex <= 2) {
      shelf = this.state.shelves[shelfIndex];
    }
    BooksAPI.update({id: bookId}, shelf)
      .then(res => {
        this.setState((currentState) => {
          const updatedBooks = currentState.books;
          updatedBooks.forEach(book => {
            if (res.currentlyReading.includes(book.id)) {
              book.shelf = currentState.shelves[0];
            } else if (res.wantToRead.includes(book.id)) {
              book.shelf = currentState.shelves[1];
            } else if (res.read.includes(book.id)) {
              book.shelf = currentState.shelves[2];
            } else {
              book.shelf = 'none';
            }
          });

          return updatedBooks;
        });
      });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/' 
          component={() => <HomeComponent shelves={this.state.shelves} books={this.state.books} onUpdateShelf={this.updateShelf} />} 
        />
        <Route
          path='/search' 
          component={() => <SearchComponent shelves={this.state.shelves} books={this.state.books} onBackClick={this.onBackClick} />} />
      </div>
    )
  }
}

export default BooksApp
