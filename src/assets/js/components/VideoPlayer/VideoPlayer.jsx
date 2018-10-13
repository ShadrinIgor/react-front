import React from 'react';
import PropTypes from 'prop-types';
import {DefaultPlayer as Video} from 'react-html5video';
import styles from './styles.sass';

const VideoPlayer = props => (
  <div className={styles.player}>
    <Video autoPlay={props.autoPlay} loop={props.loop} muted={props.muted}
      controls={props.controls}
      poster={props.poster}
      onCanPlayThrough={() => {
        // Do stuff
      }} className={styles.container}>
      <source src={props.src} type="video/webm"/>
      {/** <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default /> */}
    </Video>
  </div>
);

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  controls: PropTypes.array
};

VideoPlayer.defaultProps = {
  autoPlay: false,
  loop: false,
  muted: false,
  controls: ['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']
};

export default VideoPlayer;