import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {translate} from 'react-i18next';
import LanguageSwitcher from 'js/components/LanguageSwitcher';
import styles from './styles.sass';

class Footer extends Component {
  static toggleBodyClass(flag = true) {
    $('body').toggleClass(styles.body, flag);
  }

  componentWillMount() {
    Footer.toggleBodyClass(true);
  }

  componentDidMount() {
    $('body').find('footer [data-toggle="tooltip"]').tooltip({
      animation: true,
      html: true,
      template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner ${styles['tooltip-inner']}"></div></div>`,
      title: `<div class="${styles['qrcode-wechat']}"></div>`
    });
  }

  componentWillUnmount() {
    Footer.toggleBodyClass(false);
  }

  render() {
    const {t} = this.props;

    return (
      <footer className={[styles.footer, styles[this.props.style]].join(' ')}>

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">

              <div className="row">
                <div className="col-md-4 col-sm-12 text-muted">
                  <Link to="/" title="logo" className={styles.logo}/>
                  <p>{t('common:footer:intro')}</p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                  <h4>{t('common:footer:company')}</h4>
                  <ul className="list-unstyled">
                    <li><Link to="/pages/about-us">{t('common:footer:about_us')}</Link></li>
                    <li><Link to="/pages/vacancies">{t('common:footer:vacancies')}</Link></li>
                    {/** <li><Link to="/pages/contacts">{t('common:footer:contacts')}</Link></li>
                    <li><Link to="/pages/press">{t('common:footer:press')}</Link></li>
                    <li><Link to="/pages/privacy-policy">{t('common:footer:privacyPolicy')}</Link></li> */}
                    <li><Link to="/pages/terms-of-use">{t('common:footer:termsOfUse')}</Link></li>
                  </ul>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                  <h4>{t('common:footer:forWhom')}</h4>
                  <ul className="list-unstyled">
                    {/** <li><Link to="/pages/english-for-career">{t('common:footer:englishForCareer')}</Link></li>
                    <li><Link to="/pages/exams-perfectly">{t('common:footer:examsPerfectly')}</Link></li>
                    <li><Link to="/pages/newIdeas-for-startup">{t('common:footer:newIdeasForStartup')}</Link></li>
                    <li><Link to="/pages/employment">{t('common:footer:employment')}</Link></li> */}
                    <li><a href={`${CONFIG.serverURL}/suggestions`}>{t('common:footer.newIdeasForStartup')}</a></li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="row">
                <div className="col-xs-12">
                  <h4>{t('common:footer:followUs')}</h4>
                  <ul className={`list-unstyled list-inline ${styles.shares}`}>
                    <li><Link to="#" data-toggle="tooltip"><i
                      className={`${styles.icon} ${styles.wechat_white}`}/></Link>
                    </li>
                    <li><Link to="http://weibo.com/react" title="weibo" target="_blank"><i
                      className={`${styles.icon} ${styles.weibo_white}`}/></Link>
                    </li>
                    <li><Link to="http://.../react/" title="renren"
                      target="_blank"><i
                        className={`${styles.icon} ${styles.renren_white}`}/></Link>
                    </li>
                    <li><Link to="http://user.qzone.qq.com/1768698665/infocenter" title="qq"
                      target="_blank"><i
                        className={`${styles.icon} ${styles.qq_white}`}/></Link></li>
                    <li><Link to="http://rf.com/" title="blog" target="_blank"><i
                      className={`${styles.icon} ${styles.boke_white}`}/></Link></li>
                  </ul>

                  <h4>{t('common:footer:getInTouchTitle')}</h4>
                  <ul className={`list-unstyled ${styles.contacts}`}>
                    <li className="phone">
                      <Link to="tel:4006300330">
                        <i className={`${styles.icon} ${styles.phone_white}`}/>
                        400 630 0330
                      </Link>
                    </li>
                    <li className="email contact-us">
                      <Link to="get-in-touch">
                        <i className={`${styles.icon} ${styles.envelope_white}`}/>
                        {t('common:footer:getInTouch')}
                      </Link>
                    </li>

                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.copyright}>
          <div className="container">
            <div className="row">
              <div className={`col-xs-12 text-muted ${styles['text-muted']}`}>
                {`2013 - ${(new Date()).getFullYear()} © Digital Education Technology Limited `}
                <nobr>13086059-1</nobr>
                <LanguageSwitcher/>
              </div>
            </div>
          </div>
        </div>

      </footer>
    );
  }
}

Footer.propTypes = {
  style: PropTypes.string,
  t: PropTypes.func
};

export default translate(['common'], {wait: true})(Footer);