import React from 'react';
import YouTube from 'react-youtube';

const Trailer = ({ videoId, height, width }) => {
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
      mute: 1,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default Trailer;
