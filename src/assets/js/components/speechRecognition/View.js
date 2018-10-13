/*eslint-disable */

import _ from 'underscore';
import DefaultView from '../../views/DefaultView';
import styles from './styles/styles.sass';

export default class SpeechRecognitionView extends DefaultView {
  constructor(options = {}) {
    options.templateData = {...options, ...{styles}};
    options.append = true;
    options.tpl = require('./template.pug')(options.templateData);
    options.events = Object.assign(options.events || {},
      {
        'submit form': 'submitForm',
        'click .btn-close': 'remove'
      }
    );
    super(options);
    this.timeoutNotRecognize = null;
    this.timeoutCheckSettings = null;
    this.recognition = null;
    $(window).resize(_.debounce(_.bind(this.resizeContent, this), 300));
    this.channelSpeechRecognition.reply('show', this.render, this);
  }

  static available() {
    return $('html').hasClass('speechrecognition');
  }

  submitForm(e) {
    e.preventDefault();
    this.speechRecognition();
  }

  render(options = {}) {
    options.callback = () => {
      this.resizeContent();
    };
    this.$input = options.$input;
    super.render(options);
    this.$el.hide();
    this.$el.fadeIn(250, 'linear', () => {
      this.speechRecognition();
    });
  }

  resizeContent() {
    this.$('.container-table').css({
      height: $(window).height()
    });
  }

  speechRecognitionError(event) {
    // this.setMessage(event)
    console.log('speechRecognitionError', event);
  }

  speechRecognition() {
    this.$('button').addClass('hidden');
    this.setMessage('Говорите');
    if (SpeechRecognitionView.available()) {
      /*eslint-disable */
      this.recognition = new webkitSpeechRecognition();
      /* eslint-enable */

      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = 'ru';
      this.recognition.onspeechstart = _.bind(this.onspeechstart, this);
      this.recognition.onspeechend = _.bind(this.onspeechend, this);
      this.recognition.onresult = _.bind(this.onresult, this);
      this.recognition.onresume = _.bind(this.onresume, this);
      this.recognition.onnomatch = _.bind(this.onnomatch, this);
      this.recognition.onerror = _.bind(this.onerror, this);
      this.recognition.start();
    } else {
      this.onerror({event: 'Error occurred in recognition: '});
    }
  }

  onspeechstart(event) {
    console.log('onspeechstart', event);
    this.setMessage('Слушаю...');
    this.$(`.${styles['mic-sound']}`).addClass(styles.animation);
  }

  onspeechend(event) {
    console.log('onspeechend', event);
    this.setMessage('Обработка...');
    this.$(`.${styles['mic-sound']}`).removeClass(styles.animation);
    // this.setMessage(event);
    event.currentTarget.stop();
    this.timeoutNotRecognize = _.delay(() => {
      this.onnomatch(event);
    }, 3000);
  }

  onresult(event) {
    const result = event.results[0][0].transcript;
    console.log('onresult', result);
    console.log('onresult', event.results);
    if (this.$input) this.$input.val(result);
    clearTimeout(this.timeoutNotRecognize);
    this.$('button').addClass('hidden');
    this.setMessage(result);
    this.remove();
  }

  onresume(event) {
    console.log(`Speech resumed after ${event.elapsedTime} milliseconds.`);
  }

  onnomatch(event) {
    console.log('onnomatch', event);
    this.setMessage('Неразборчиво');
    this.$('button').removeClass('hidden');
  }

  onerror(event) {
    event.currentTarget.stop();
    this.setMessage('Проверьте микрофон и уровень громкости.');
    this.$('button').removeClass('hidden');
  }

  setMessage(message) {
    console.log('message', message);
    this.$(`.${styles.message}`).text(message);
  }

  remove(e) {
    this.recognition.stop();
    clearTimeout(this.timeoutNotRecognize);
    _.delay(() => {
      this.$el.fadeOut(250, 'linear', () => {
        super.remove();
      });
    }, (e ? 0 : 450));
  }
}

/* eslint-enable */