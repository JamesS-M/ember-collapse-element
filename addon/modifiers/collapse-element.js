import Modifier from 'ember-modifier'

export default class CollapseElementModifier extends Modifier {
  originalHeight = 0

  didInstall() {
    this.originalHeight = this.element.clientHeight
    let duration = this.args.named.duration || 0.25
    this.element.style.transition = `max-height ${duration}s ease-in-out, margin ${duration}s ease-in-out, padding ${duration}s ease-in-out, opacity ${duration}s ease-in-out`
    this.element.style.maxHeight = `${this.originalHeight}px`
  }

  didUpdateArguments() {
    let collapsed = this.args.positional[0]
    if (collapsed) {
      this.element.style.maxHeight = '0px'
      this.element.style.margin = '0px'
      this.element.style.padding = '0px'
      this.element.style.overflow = 'hidden'
      this.element.style.opacity = 0
    } else {
      this.element.style.maxHeight = `${this.originalHeight}px`
      this.element.style.margin = null
      this.element.style.padding = null
      this.element.style.overflow = null
      this.element.style.opacity = 1
    }
  }
}

