import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";

class Books extends Component {
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
            this.setState({books: res.data, title:"", author: "", description: ""})
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
                        <h1> Search for books!</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name="title"
                            placeholder="Enter title"
                            />
                            <FormBtn
                                onClick={this.handleFormSubmit}
                            >
                                Search!
                            </FormBtn>
                        </form>
                        </Col>
                        </Row>
            <Row>
                <Col size="md-12">
                <List>
                    {this.state.search.map(res => (
                        <ListItem key={res.id}>
                        <a href={res.volumeInfo.infoLink} alt ="book link">
                        {res.volumeInfo.title} by {res.volumeInfo.authors[0]}
                        </a>
                        <SaveBtn onClick={() => this.saveBook(res.VolumeInfo.title, res.volumeInfo.authors, res.volumeInfo.description, res.volumeInfo.imageLinks.thumbnail, res.volumeInfo.infoLink)} />
                        </ListItem>

                    ))}
                </List>
            </Col>
        </Row>
    </Container>
        

    )
}
}

export default Books;