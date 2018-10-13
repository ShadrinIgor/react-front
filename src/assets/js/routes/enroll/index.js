import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import * as _modalActions from 'js/actions/modal';
import * as _publicationsActions from 'js/actions/publications';
import Spinner from 'js/components/Spinner';
import PaymentChooseType from 'js/components/PaymentChooseType/PaymentChooseType';

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(_modalActions, dispatch),
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = state => ({
  publications: state.publications.publications,
  courseGroups: state.publications.courseGroups
});

@translate(['common', 'courses'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class Enroll extends PureComponent {
  componentWillMount() {
    const {
      location: {state: {courseId} = {}} = {}, publicationsActions: {getPublication, getCourseGroups}
    } = this.props;

    if (courseId) {
      getPublication(courseId);
      getCourseGroups(courseId);
    }
  }

  componentWillUnmount() {
    this.props.modalActions.close();
  }

  render() {
    const {
      t, location: {state: {courseId, groupId} = {}} = {}, publications = {}, courseGroups = {}, modalActions
    } = this.props;
    if (courseId && groupId) {
      if (publications.items && courseGroups.items && publications.items[courseId] && courseGroups.items[groupId]) {
        modalActions.open({
          title: t('common:enroll.title', {title: publications.items[courseId].title}),
          subtitle: `${t('common:choosePaymentMethod')}:`,
          content: <PaymentChooseType contentId={groupId} title={t('common:payment.fullCourse')} price={courseGroups.items[groupId].price}/>,
          actions: {
            onClose: () => window.history.back()
          }
        });
      } else {
        modalActions.open({
          content: <Spinner style={Spinner.style.WHITE} size={Spinner.size.LG}/>,
          actions: {
            onClose: () => window.history.back()
          }
        });
      }
    } else {
      return <Redirect to={'/'}/>;
    }

    return null;
  }
}

Enroll.propTypes = {
  t: PropTypes.func,
  location: PropTypes.object,
  publications: PropTypes.object,
  courseGroups: PropTypes.object,
  modalActions: PropTypes.object,
  publicationsActions: PropTypes.object,
};

export default Enroll;