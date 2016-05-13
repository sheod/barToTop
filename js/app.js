'use strict';

let props = {
    blockId: '',
    blockClass: 'ololo',
    topIndent: 20,
    footerId: '',
    footerClass: 'footer',
    bottomIndentFromFooter: 20,
}

class MovingBlock {
    constructor (props) {
        this.__render(props)
    }

    __render(props) {

        let blockClass = props.blockClass ? props.blockClass : '__emptyField__'
        let blockId = props.blockId ? props.blockId : '__emptyField__'
        let elem = document.body.querySelector(`#${blockId}`) || document.body.querySelector(`.${props.blockClass}`)

        let footerId = props.footerId ? props.footerId : '__emptyField__'
        let footerClass = props.footerClass ? props.footerClass : '__emptyField__'
        let footer = document.body.querySelector(`#${footerId}`) || document.body.querySelector(`.${props.footerClass}`)

        elem.style.position = 'static'
        elem.style.top = elem.style.top || 'auto'

        window.addEventListener('scroll', this.__moveBlock(elem, props, footer))
    }

    __moveBlock(elem, props, footer) {
        let elemY = elem.getBoundingClientRect().top + window.pageYOffset
        let footerY = footer.getBoundingClientRect().top + window.pageYOffset

        return ()=> {

            if (window.pageYOffset < elemY - props.topIndent) {
                elem.style.position = 'static'
                elem.style.top = 'auto'
                return
            }
            if (window.pageYOffset >= elemY - props.topIndent && window.pageYOffset < footerY - elem.offsetHeight - props.bottomIndentFromFooter  - props.topIndent) {
                elem.style.position = 'fixed'
                elem.style.top = props.topIndent + 'px'
                return
            }
            if (window.pageYOffset >= footerY - elem.offsetHeight - props.bottomIndentFromFooter - props.topIndent) {
                elem.style.position = 'absolute'
                elem.style.top = footerY - elem.offsetHeight - props.bottomIndentFromFooter  + 'px'
                return
                
            }
        }
    }
    /*
    __animationA(elem,props) {
        let elemTopInt = parseInt(elem.style.top)

        function animation() {
            if(elemTopInt < props.topIndent) {
                elemTopInt += 200*0.016
                elem.style.top = elemTopInt + 'px'
                requestAnimationFrame(animation)
            }
        }

        return animation()
    }
    */
}
function newMovingBlock() {
    new MovingBlock(props);
}

document.addEventListener("DOMContentLoaded", newMovingBlock);

