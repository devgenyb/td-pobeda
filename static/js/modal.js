class Modal {
    settings = {
        onOpen: () => {},
        onClose: () => {},
        animationClass: "modal-animation"
    };
    openClassName = 'modal--open';
    isOpen = false;

    constructor(modal, triggers=[], settings={}) {
        this.modal = modal;
        this.triggers = triggers;
        this.settings = {...this.settings, ...settings};
        this.overlay = this.modal.querySelector('.modal_overlay');
        this.closrBtn = this.modal.querySelector('.modal__close');
        this.init();
    }

    init() {
        this.closrBtn.addEventListener('click', (e) => {
            this.close();
        })


        document.addEventListener('click', function(e) {
            if(this.isOpen) {
                if(!e.target.closest('.modal__container') && !this.isTriggerEvent(e.target)) {
                    this.close();
                } 
            }
        }.bind(this))


        for (let i = 0; i < this.triggers.length; i++) {
            this.triggers[i].addEventListener('click', function(e) {
                this.open(e);
            }.bind(this));
        }
    }

    overlayHandler(e, open=true) {
        if (this.isOpen) {
            if(!e.target.closest('.modal__container') && !this.isTriggerEvent(e.target) && open) {
                this.close();
            }
        }
    }

    isTriggerEvent(target) {
        for (let i = 0; i < this.triggers.length; i++) {
            if (target === this.triggers[i]) return true;
        }
        return false;
    }

    enableScroll() {
        document.body.style.top = 'auto';
        this.unlockPadding();
        document.body.classList.remove('disable-scroll');
        window.scroll({
            top: this.pagePosition, left: 0, behavior: "instant"
        })
    }

    disableScroll() {
        this.pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('disable-scroll');
        document.body.style.top = -this.pagePosition + 'px';
    }

    unlockPadding() {
        body.style.paddingRight = (parseInt(body.style.paddingRight) - this.paddingOffset) + 'px';
    }

    lockPadding() {
        this.paddingOffset = window.innerWidth - document.body.offsetWidth;
        body.style.paddingRight = this.paddingOffset + 'px';
    }

    open(e=null) {
        if (this.isOpen) {
            return;
        }
        if (e) this.activeElement = e.target;
        
        this.modal.classList.add(this.openClassName);
        this.disableScroll();
        setTimeout(() => {
            this.isOpen = true;
            this.modal.classList.add(this.settings.animationClass);
            this.closrBtn.focus();
        }, 0)
    }

    close() {
        this.activeElement && this.activeElement.focus();
        this.isOpen = false;
        this.modal.classList.remove(this.settings.animationClass);
        this.enableScroll()
        setTimeout(() => {
            this.modal.classList.remove(this.openClassName);
        }, 300)
    }
}
