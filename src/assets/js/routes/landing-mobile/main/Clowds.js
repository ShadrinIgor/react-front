import _ from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Raphael from 'raphael/raphael';
import Utils from 'js/utils/Utils';

class Clowds extends Component {
  refContainer = null;

  static drawClowd(r, w, h) {
    const clouds = [
      'M52,16.8h-2.1c0.5-1.4,0.8-2.8,0.8-4.3C50.7,5.6,45.1,0,38.2,0h-11c-6.2,0-11.4,4.5-12.3,10.5H9.5c-5.2,0-9.5,4.2-9.5,9.5s4.2,9.5,9.5,9.5h10.1h0.3h32c3.5,0,6.3-2.8,6.3-6.3C58.3,19.6,55.4,16.8,52,16.8z',
      'M47.9,11.2h-1.4c0-0.1,0-0.3,0-0.4C46.5,5,41.8,0.3,36,0.3H25.3c-4.7,0-8.8,3.1-10.1,7.5C12.1,9,9.8,12,9.8,15.6c0,0.3,0,0.5,0,0.8h-2c-4.2,0-7.6,3.4-7.6,7.6c0,4.2,3.4,7.6,7.6,7.6h18.4c1.8,0,8.3,0,10.3,0h11.3c5.6,0,10.1-4.5,10.1-10.1C58,15.8,53.5,11.2,47.9,11.2z',
      'M98.4,13.4H87.7c-1.6-5-6.2-8.5-11.7-8.5h-4.7c-1.6-2.6-4.5-4.3-7.7-4.3h-1.9c-3.3,0-6.1,1.7-7.7,4.3h-9c-6.8,0-12.3,5.5-12.3,12.3c0,1.1,0.2,2.2,0.4,3.2H10.6c-5.7,0-10.4,4.7-10.4,10.4c0,5.7,4.7,10.4,10.4,10.4h65.6H77h21.3c7.7,0,13.9-6.2,13.9-13.9C112.2,19.6,106,13.4,98.4,13.4z',
      'M134.7,37.3h-14c-0.2,0-0.5,0.1-0.7,0.1c-1.3-5.4-6.2-9.5-12-9.5h-9.4v-6.5C98.6,9.5,89-0.1,77.2-0.1c-11.8,0-21.4,9.6-21.4,21.4l0,0H41.6C33,21.4,26,28.4,26,37c0,2.6,0.7,4.9,1.8,7.1h-23c-2.5,0-4.5,2-4.5,4.5c0,2.5,2,4.5,4.5,4.5h129.9c4.3,0,7.9-3.5,7.9-7.9C142.6,40.8,139,37.3,134.7,37.3z'
    ];
    // let x = Utils.randomFromRange(-w, w);
    const y = Utils.randomFromRange(h / 4, h);
    // let time = 5000;
    const cloud = r.path(clouds[Math.floor(Math.random() * clouds.length)]);
    if (cloud) cloud.transform('s3.0,3.0,0,0');
    if (cloud) cloud.transform(`t${Utils.randomFromRange(0, w)},${y}`);
    if (cloud) {
      cloud.attr({
        fill: '#3287ea',
        stroke: 'none'
      });
    }
  }

  draw() {
    $(this.refContainer).empty();
    /** const w = $(window).width();
     const h = $(window).height();
     const r = Raphael(this.refs.container, w, h);

     for (let i = 0; i < 50; i++) {
      Clowds.drawClowd(r, w, h);
    } */
  }

  componentDidMount() {
    $(window).resize(_.debounce(() => {
      this.draw();
    }, 300));
    this.draw();
  }

  render() {
    return (
      <div className={this.props.className} ref={(c) => {
        this.refContainer = c;
      }}/>
    );
  }
}

Clowds.propTypes = {
  className: PropTypes.string
};

export default Clowds;