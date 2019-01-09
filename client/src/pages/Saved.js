import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";

class Saved extends Component {
    state = {
        book: [],
        search: [],
        title: "",
        author: "",
        description: ""
    }


componentDidMount() {
    this.loadBooks();
}

loadBooks = () => {
    API.getBooks()
        .then(res =>
            this.setState({book: res.data, title:"", author: "", description: ""})
            )
            .catch(err => console.log(err));

};

saveBooks = (title, author, description, image, link) => {
    API.saveBook({
        title: title,
        author: author,
        description: description,
        image: image,
        link: link
    })
    .then(res => this.loadBooks())
    .catch(err => console.log(err))
};

deleteBook = id => {
    API.deleteBook(id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err))
};

handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
        [name]: value
    })
};

handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
        API.search(this.state.title)
        .then(res => this.setState({search: res.data.items}))
        .catch(err => console.log(err))
    }
};

render() {
    return(
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1> Saved Books</h1>
                    </Jumbotron>
                    {this.state.book.length ? (
                        <List> 
                            {this.state.book.map(book => (
                                <ListItem key={book._id}>
                                    <Link to={"/books/" + book._id}>
                                        {book.title} by {book.author}
                                        <br></br>
                                        {/* Synopsis: {book.description} */}
                                        <br></br>
                                        <img src={book.image} alt="Book art"/>
                                    </Link>
                                    <DeleteBtn onClick={()=> this.deleteBook(book._id)}/>
                                </ListItem>
                            ))}
                        </List>) : (<strong>No books saved.</strong>)}
                        </Col>
                        </Row>
                        </Container>
                        
                    )}}
                    

export default Saved;