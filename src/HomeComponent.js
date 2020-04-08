import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelfComponent from './BookShelfComponent';

class HomeComponent extends Component {
  state = {
    books: [
      {
        id: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        shelf: 'Currently Reading',
        image: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
      },
      {
        id: 2,
        title: 'Ender\'s Game',
        author: 'Orson Scott Card',
        shelf: 'Currently Reading',
        image: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api'
      },
      {
        id: 3,
        title: '1776',
        author: 'David McCullough',
        shelf: 'Want to Read',
        image: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api'
      },
      {
        id: 4,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        shelf: 'Read',
        image: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
      }
    ],
    shelves: ['Currently Reading', 'Want to Read', 'Read']
  }

  updateShelf = (book, newShelf) => {

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