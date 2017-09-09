import React from 'react';
import axios from 'axios';
import InfoIndex from './InfoIndex';
import CommentsIndex from './CommentsIndex';

class RedditUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userComments: [],
      userPosts: [],
      error: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.state.username;

    axios.get(`https://www.reddit.com/user/${username}/submitted.json`)
        .then( postsResponse => {
          let posts = [];

          postsResponse.data.data.children.forEach( postData => {
            let userPost = {};
            userPost.title = postData.data.title;
            userPost.score = postData.data.score;
            userPost.url = postData.data.url;
            posts.push(userPost);
          });

          this.setState({ userPosts: posts, error: '' })
        })
        .catch( error => {
          console.log(error);
          this.setState({
            error: 'Unable to fetch the data; please input a valid username.'
          })
        });

    axios.get(`https://www.reddit.com/user/${username}/comments.json`)
        .then( commentsResponse => {
          this.setState({
            error: ''
          })

          let comments = [];

          commentsResponse.data.data.children.forEach( commentsData => {
            let userComment = {};
            userComment.body = commentsData.data.body;
            userComment.score = commentsData.data.score;
            userComment.postLink = commentsData.data.link_url;
            comments.push(userComment);
          });

          this.setState({ userComments: comments, error: ''})
        })
        .catch( error => {
          console.log(error);
          this.setState({
            error: 'Unable to fetch the data; please input a valid username'
          })
        });
  }

  render() {
    return(
      <div className="info">
        <form className="username-form" onSubmit={this.handleSubmit}>
          <label>Enter Username:
            <input type="text"
                   name="username"
                   onChange={this.updateUsername}></input>
          </label>

          <input type="submit" value="Submit"></input>
        </form>
        <div className="data">
          <InfoIndex username={this.state.username} postsInfo={this.state.userPosts} />
          <CommentsIndex username={this.state.username} commentsInfo={this.state.userComments} />
        </div>
      </div>
    )
  }
}

export default RedditUserInfo;
