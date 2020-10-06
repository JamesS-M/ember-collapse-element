import Modifier from 'ember-modifier'

export default class CollapseElementModifier extends Modifier {
  originalStyle = {}
  didReceiveArguments() {
    const computedStyles = window.getComputedStyle(this.element)
    if (!this.originalStyle.maxHeight)
      this.originalStyle.maxHeight = this.element.clientHeight
    if (!this.originalStyle.margin)
      this.originalStyle.margin = computedStyles.margin
    if (!this.originalStyle.padding)
      this.originalStyle.margin = computedStyles.padding
    if (!this.originalStyle.overflow)
      this.originalStyle.overflow = computedStyles.overflow

    let collapsed = this.args.positional[0]
    let duration = this.args.named.duration || 0.25

    if (!this.element.style.transition)
      this.element.style.transition = `max-height ${duration}s ease-in-out, margin ${duration}s ease-in-out, padding ${duration}s ease-in-out`

    if (collapsed) {
      this.element.style.maxHeight = '0px'
      this.element.style.margin = '0px'
      this.element.style.padding = '0px'
      this.element.style.overflow = 'hidden'
    } else {
      this.element.style.maxHeight = `${this.originalStyle.maxHeight}px`
      this.element.style.margin = `${this.originalStyle.margin}px`
      this.element.style.padding = `${this.originalStyle.padding}px`
      this.element.style.overflow = `${this.originalStyle.overflow}px`
    }
  }
}

