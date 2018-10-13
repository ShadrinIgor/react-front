import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import Panel from 'js/components/Panel';
import PlaceholderPanelNoDescription from 'js/components/PlaceholderPanelNoDescription';
import FeedbackListItem from 'js/components/FeedbackListItem';
import styles from './style.sass';

@translate(['courses'], {wait: true})
class FeedbackListItems extends PureComponent {
  render() {
    const {t, title, comments = []} = this.props;

    return (
      <div>
        {title && <h4>{title}</h4>}
        {!comments.length
          ?
          <PlaceholderPanelNoDescription
            title={t('common:feedback.empty.message')}
            buttonTitle={t('common:feedback.empty.button')}
            link={'#'}/>
          : (
            <Panel nobody>
              {comments.map((item, index) => (
                <div key={index} className={styles.item}>
                  <FeedbackListItem {...item}/>
                </div>
              ))}
            </Panel>
          )}
      </div>
    );
  }
}

FeedbackListItems.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    cover: PropTypes.string
  })).isRequired
};

export default FeedbackListItems;