import React from 'react';

const CommentsIndex = ({ username, commentsInfo, sortByScore }) => {
  if (commentsInfo.length === 0) {
    return <div className="no-info">No comments to show!</div>;
  } else {
    return(
      <div className="comments-posts">
        <div className="title">
          {`${username}'s Comments`}
        </div>
        {
          commentsInfo.sort(sortByScore).map((info, i) => {
            let displayedInfo = info.body;
            return(
              <div className="info-wrapper" key={info + i}>
                <div className="info">
                  <a href={info.postLink}
                     className="displayedInfo"
                     target="_blank"
                     className="url">{displayedInfo}</a>
                </div>
                <div className="score">{info.score}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CommentsIndex;
