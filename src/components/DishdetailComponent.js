import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,
		 BreadcrumbItem, Button, Row, Col, Modal, ModalHeader, 
		 ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;

const maxLength = (len) => (val) => !(val) || (val.length <= len);

const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

    handleSubmit(values) {
    	this.toggleModal();
    	this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

	render() {
		return(
			<React.Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
		        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
		        	<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
		        	<ModalBody>
		        		<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
		        			<div className="container">
		        			<Row className="form-group">
		        				<Label htmlFor="rating">Rating</Label>
		                        <Control.select 
		                            model=".rating" 
		                            name="rating" 
		                            className="form-control"
		                            >
			                        <option>1</option>
			                        <option>2</option>
			                        <option>3</option>
			                        <option>4</option>
			                        <option>5</option>	                        	                        
		                        </Control.select>
		        			</Row>
		        			<Row className="form-group">
			        			<Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                       model=".author" 
                                       name="author" 
                                       className="form-control"
                                       placeholder="Your Name" 
                                       validators={{
                                             required, 
                                             minLength: minLength(3), 
                                             maxLength: maxLength(15)
                                       }}                                        
                                       />
                                <Errors
                                    className="text-danger"
                                    model=".author"  
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />
		        			</Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                                <Col className="col-12">
                                    <Control.textarea 
                                        model=".comment" 
                                        name="comment" 
                                        rows="8" 
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
		        			<Button type="submit" value="submit" color="primary">Submit</Button>
		        			</div>
		        		</LocalForm>
		        	</ModalBody>
		        </Modal>
	        </React.Fragment>
		);
	}
}

function RenderDish({dish}) {
	if (dish != null) {
		return (
			<Card>
				<CardImg width="100%" object src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	} else {
		return (
			<div></div>
		);
	}
}

function RenderComments({comments, addComment, dishId}) {

	const commentsList = comments.map((comment) => {
		return(
			<li key={comment.id}>
			<p>{comment.comment}</p>
			<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
			</li>
		);
	});

	if (comments != null) {
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{commentsList}
				</ul>
				<CommentForm dishId={dishId} addComment={addComment}/>
			</div>
		);
	} else {
		return (
			<div>
				<CommentForm dishId={dishId} addComment={addComment}/>
			</div>
		);
	}
}

const  DishDetail = (props) => {
	if(props.dish != null) {
		return (
			<div className="container">
            	<div className="row">
	                <Breadcrumb>
	                	<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
	                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
	                </Breadcrumb>
	                <div className="col-12">
	                    <h3>{props.dish.name}</h3>
	                    <hr />
	                </div>
	            </div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments= {props.comments} 
										addComment={props.addComment}
										dishId={props.dish.id}
										/>
					</div>
					<div>
						
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div></div>
		);
	}

}


export default DishDetail;