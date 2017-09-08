import React from 'react';

const sortByScore = (a, b) => {
  if (a.score > b.score) {
    return -1;
  } else if (a.score > b.score) {
    return 1;
  } else {
    return 0;
  }
}

const InfoIndex = ({ username, postsInfo }) => {
  if (postsInfo.length === 0) {
    return <div className="no-info">No data to show!</div>;
  } else {
    return(
      <div>
        <div className="title">
          {`${username}'s Posts'`}
        </div>
        {
          postsInfo.sort(sortByScore).map((info, i) => {
            let displayedInfo = info.body || info.title;

            return(
              <div className="info-wrapper" key={info + i}>
                <div className="score">{info.score}</div>
                <div className="info">
                  <div className="displayed-info">{displayedInfo}</div>
                  <a href={info.url}
                     target="_blank"
                     className="url"
                     value={info.url}></a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default InfoIndex;
