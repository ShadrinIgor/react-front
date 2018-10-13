import {debounce, uniqueId} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import 'jquery-ui/ui/widgets/slider';
import styles from './styles.sass';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.refProgress = null;
    this.refJSlider = null;
    this.refTitle = null;
    this.onChange = debounce(props.onChange, 250);
  }

  componentDidMount() {
    const f = debounce(::this.updateProgress, 0);

    $(this.refJSlider).slider({
      slide: f,
      change: f
    });
    this.update(this.props);
  }

  updateProgress(e, ui) {
    const {
      min, max, onChange, colors, steps
    } = this.props;
    const progress = ((ui.value - min) / (max - min)) * 100 / 2;
    const colorIndex = colors ? (Math.floor(ui.value / (max / steps)) - 1) : -1;
    const color = colors ? colors[colorIndex] : null;

    $(this.refProgress).css({
      width: `${progress}%`,
      backgroundColor: color
    });

    $(this.refTitle).css({
      backgroundColor: color
    });

    if (onChange) {
      this.onChange(ui.value);
    }
  }

  componentWillUnmount() {
    $(this.refJSlider).slider('destroy');
  }

  update(nextProps) {
    $(this.refJSlider).slider({
      ...nextProps,
      step: Math.round(nextProps.max / nextProps.steps)
    });
  }

  render() {
    const {title, steps, message} = this.props;

    return (
      <div>
        <div className={styles.container}>
          <div>
            <div className={styles.title} ref={(c) => {
              this.refTitle = c;
            }}>{title}</div>
          </div>
          <div>
            <div className={styles.dots}>
              {[...Array(steps > 1 ? (steps - 1) : steps)].map(item => <div key={uniqueId(`slider-dot-${item}`)}>
                <div className={styles.dot}/>
              </div>)}
            </div>
            <div className={styles.progress} ref={(c) => {
              this.refProgress = c;
            }}/>
            <div className={styles.handle}>
              <div ref={(c) => {
                this.refJSlider = c;
              }}>
                <div className='ui-slider-handle'>
                  <div/>
                  <div/>
                  <div/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {message && <div className={cx('text-muted', styles.message)}>{message}</div>}
      </div>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  value: PropTypes.number,
  title: PropTypes.string,
  onChange: PropTypes.func,
  classes: PropTypes.object,
  message: PropTypes.string,
  colors: PropTypes.array
};

Slider.defaultProps = {
  value: 0,
  classes: {
    'ui-slider': styles['ui-slider'],
    'ui-slider-handle': styles['ui-slider-handle'],
    'ui-slider-range': styles['ui-slider-range']
  },
  steps: 1,
  color: []
};

export default Slider;