export default class DOMUtil {
  static scrollToTopDocument(useAnimationTime = false) {
    $('html,body').animate({
      scrollTop: 0,
    }, useAnimationTime ? 100 : 0, 'linear');
  }

  static scrollToElement($targetElement, offset = 0, time = 500) {
    $('html,body').animate({
      scrollTop: $targetElement.offset().top + offset
    }, time);
  }
}