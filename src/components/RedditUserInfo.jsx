import React from 'react';
import axios from 'axios';
import PostsIndex from './PostsIndex';
import CommentsIndex from './CommentsIndex';

const sortByScore = (a, b) => {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    return 0;
  }
}

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
      <div className="outer-info">
        <form className="username-form" onSubmit={this.handleSubmit}>
          <label>Enter Username:
            <input type="text"
                   name="username"
                   onChange={this.updateUsername}></input>
          </label>

          <input type="submit" value="Submit"></input>
        </form>
        <div className="data">
          <PostsIndex username={this.state.username}
                      postsInfo={this.state.userPosts}
                      sortByScore={sortByScore} />
          <CommentsIndex username={this.state.username}
                      commentsInfo={this.state.userComments}
                      sortByScore={sortByScore} />
        </div>
      </div>
    )
  }
}

export default RedditUserInfo;
