import React from 'react';

const PostsIndex = ({ username, postsInfo, sortByScore }) => {
  if (postsInfo.length === 0) {
    return <div className="no-info">No posts to show!</div>;
  } else {
    return(
      <div className="comments-posts">
        <div className="title">
          {`${username}'s Posts`}
        </div>
        {
          postsInfo.sort(sortByScore).map((info, i) => {
            let displayedInfo = info.body || info.title;

            return(
              <div className="info-wrapper" key={info + i}>
                <div className="score">{info.score}</div>
                <div className="info">
                  <a href={info.url}
                     target="_blank"
                     className="url">{displayedInfo}</a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default PostsIndex;
