import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';

class Bundle extends PureComponent {
  state = {
    mod: null,
    isMounted: false
  };

  componentDidMount() {
    this.setState({isMounted: true});
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    const {progress} = this.props;
    if (progress) NProgress.start();
    props.load((mod) => {
      if (this.state.isMounted) {
        this.setState({mod: mod.default || mod});
        if (this.state.mod && progress) NProgress.done();
      }
    });
    this.setState({mod: null});
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.element,
  progress: PropTypes.bool
};

const BundleLoader = (loadedModule, progress = false, progressComponent = null) => props => ( // eslint-disable-line react/display-name
  <Bundle load={loadedModule} {...props} progress={progress}>
    {Comp => (Comp ? <Comp/> : progressComponent)}
  </Bundle>
);

export {Bundle, BundleLoader};