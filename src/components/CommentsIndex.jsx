import React from 'react';

const sortByScore = (a, b) => {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    return 0;
  }
}

const CommentsIndex = ({ username, commentsInfo }) => {
  if (commentsInfo.length === 0) {
    return <div className="no-info">No comments to show!</div>;
  } else {
    return(
      <div>
        <div className="title">
          {`${username}'s Comments`}
        </div>
        {
          commentsInfo.sort(sortByScore).map((info, i) => {
            let displayedInfo = info.body;
            return(
              <div className="info-wrapper" key={info + i}>
                <div className="score">{info.score}</div>
                <div className="info">
                  <div className="displayed-info">{displayedInfo}</div>
                  <a href={info.postLink}
                     target="_blank"
                     className="url"
                     value={info.postLink}></a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CommentsIndex;
