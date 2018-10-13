import {debounce, delay} from 'underscore';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DOMUtils from 'js/utils/DOMUtil';

class Content extends PureComponent {
  refContainer = null;

  componentDidMount() {
    this.$window = $(window);
    this.resizeContentDebounce = debounce(() => {
      this.resizeContent();
    }, 250);

    this.$window.on('resize', this.resizeContentDebounce);
    this.resizeContent();
    DOMUtils.scrollToTopDocument();
    delay(() => {
      this.resizeContent();
    }, 150);
  }

  componentWillUnmount() {
    this.$window.off('resize', this.resizeContentDebounce);
  }

  resizeContent() {
    const $container = $(this.refContainer);
    const {useMinHeight} = this.props;

    $container.parent().css({minHeight: ''});
    $container.css(useMinHeight ? {minHeight: ''} : {height: ''});

    const headerHeight = parseInt($('#container-header').outerHeight(true), 10) || 0;
    const subHeaderHeight = parseInt($('#container-subheader').outerHeight(true), 10) || 0;
    const height = Math.max(parseInt(this.$window.height(), 10) - headerHeight - subHeaderHeight, 640);

    const fixedHeight = Math.max($container.outerHeight(true), height);
    $container.parent().css({minHeight: fixedHeight});
    $container.css(useMinHeight ? {minHeight: fixedHeight} : {height: fixedHeight});
  }

  render() {
    return (
      <div className="container-content-page">
        <div className={this.props.className} ref={(c) => { this.refContainer = c; }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  className: PropTypes.string,
  useMinHeight: PropTypes.bool,
  children: PropTypes.element
};

Content.defaultProps = {
  className: null,
  useMinHeight: true
};

export default Content;