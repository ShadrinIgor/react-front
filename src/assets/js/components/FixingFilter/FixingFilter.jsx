import React, {PureComponent} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import NewCoursesFilter from '../NewCoursesFilter';
import styles from './styles.sass';

class FixingFilter extends PureComponent {
  constructor() {
    super();
    this.state = {heightWindow: 0};
    this.refFilterBlock = null;
    this.options = {
      scrollOld: 0,
      scrollTopOffset: 203,
      scrollMarginTop: 16,
      scrollMarginBottom: 16,
      originalWidth: 0,
      filterBlock: {}
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      this.loadEvent();
    });
    if (window.addEventListener) {
      window.addEventListener('load', ::this.loadEvent);
      window.addEventListener('resize', ::this.resizeEvent);
      window.addEventListener('scroll', ::this.getFilterBlockPosition);
    } else if (window.attachEvent) {
      window.attachEvent('onload', ::this.loadEvent);
      window.attachEvent('resize', ::this.resizeEvent);
      window.attachEvent('onscroll', ::this.getFilterBlockPosition);
    }
  }

  getScrollBlockHeight() {
    const filterHeight = $('#filterBlock .panel').height();
    return (window.innerHeight > filterHeight ? filterHeight : window.innerHeight - this.options.scrollMarginTop);
  }

  resizeEvent() {
    this.setState({heightWindow: this.getScrollBlockHeight()});
    this.getFilterBlockPosition();
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('load', ::this.loadEvent);
      window.removeEventListener('resize', ::this.resizeEvent);
      window.removeEventListener('scroll', ::this.getFilterBlockPosition);
    } else if (window.attachEvent) {
      window.detachEvent('onload', ::this.loadEvent);
      window.detachEvent('resize', ::this.resizeEvent);
      window.detachEvent('onscroll', ::this.getFilterBlockPosition);
    }
  }

  loadEvent() {
    if (this.refFilterBlock) {
      this.setState({heightWindow: this.getScrollBlockHeight()});
      this.getFilterBlockPosition();
    }
  }

  getFilterBlockPosition() {
    const scroll = $(document).scrollTop();
    this.options.filterBlock = $('#filterBlock');
    this.options.footer = $('footer').eq(0);
    this.options.footerTop = this.options.footer.offset().top;
    this.options.bottomMax = this.options.footerTop - this.options.filterBlock.height() - this.options.scrollMarginBottom;

    if (scroll > this.options.scrollOld) {
      this.getFilterBlockPositionDown(scroll);
    } else {
      this.getFilterBlockPositionUp(scroll);
    }

    this.checkMaxAndMinScroll(scroll);
  }

  checkMaxAndMinScroll(scroll) {
    if (scroll < (this.options.scrollTopOffset - this.options.scrollMarginTop)) {
      this.options.filterBlock.removeClass(styles.panelFixed);
      this.options.filterBlock.css('top', 0);
    }

    if (scroll > (this.options.bottomMax - this.options.scrollMarginBottom)) {
      this.options.filterBlock.removeClass(styles.panelFixed);
      this.options.filterBlock.css('top', `${this.options.bottomMax - this.options.scrollTopOffset}px`);
    }

    this.options.filterBlock.css('width', `${this.options.filterBlock.parent().width()}px`);
    this.options.scrollOld = scroll;
  }

  getFilterBlockPositionUp(scroll) {
    if (scroll <= (this.options.bottomMax - this.options.scrollMarginBottom) && scroll > (this.options.scrollTopOffset - this.options.scrollMarginTop)) {
      this.options.filterBlock.addClass(styles.panelFixed);
      this.options.filterBlock.css('top', `${this.options.scrollMarginTop}px`);
    } else if (scroll < this.options.bottomMax) {
      this.options.filterBlock.removeClass(styles.panelFixed);
      this.options.filterBlock.css('top', 0);
    }
  }

  getFilterBlockPositionDown(scroll) {
    if ((scroll + this.options.scrollMarginTop) >= this.options.scrollTopOffset && scroll < (this.options.bottomMax - this.options.scrollMarginBottom)) {
      this.options.filterBlock.addClass(styles.panelFixed);
      this.options.filterBlock.css('top', `${this.options.scrollMarginTop}px`);
    }
  }

  render() {
    return (
      <div ref={(c) => {
        this.refFilterBlock = c;
      }} id="filterBlock" className={styles.panelRelative}>
        <Scrollbars style={{height: this.state.heightWindow || 'autoHeight'}}>
          <NewCoursesFilter {...this.props} onUpdateCB={::this.loadEvent}/>
        </Scrollbars>
      </div>
    );
  }
}

export default FixingFilter;