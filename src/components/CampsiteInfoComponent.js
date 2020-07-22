import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { render } from "react-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.CampsiteId, values.ratings, values.author, values.text);
   }

  render() {
    return (
      <>
        <Button type="submit" outline onClick={this.toggleModal}>
          <i className="fa fa-pencil" />
          Submit Comments
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Comments Form</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <Control.select
                  validators={{ required }}
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>Select a Number</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                <Errors
                  className="text-danger"
                  model=".rating"
                  show="touched"
                  component="div"
                  messages={{ required: "Required" }}
                />
              </div>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <Control.text
                  model=".name"
                  name="name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must less than 16 characters",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="comment">Comments</label>
                <Control.textarea
                  model=".comment"
                  name="comment"
                  className="form-control"
                ></Control.textarea>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, CampsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
                  <p>
                    {comment.text}
                    <br />
                    -- {comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm CampsiteId={CampsiteId} postComment={postComment} />
      </div>
    );
  }
  return <div></div>;
}

function CampsiteInfo(props) {
  if (props) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col>'>
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments} 
            CampsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default CampsiteInfo;
