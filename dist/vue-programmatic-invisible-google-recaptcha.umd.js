(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.VueProgrammaticInvisibleGoogleRecaptcha = {})));
}(this, (function (exports) { 'use strict';

    (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".grecaptcha-badge { z-index: 1000; } .g-recaptcha--left .grecaptcha-badge { width: 70px !important; overflow: hidden; transition: all 0.2s ease !important; left: 0px; } .g-recaptcha--left .grecaptcha-badge:hover { width: 256px !important; } @media (max-width: 992px) { .g-recaptcha--mobile-hidden .grecaptcha-badge { display: none; } } @media (min-width: 992px) { .g-recaptcha--desktop-hidden .grecaptcha-badge { display: none; } } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();









    var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"g-recaptcha",class:_vm.styleClassObject,attrs:{"id":_vm.elementId,"data-sitekey":_vm.sitekey}})},staticRenderFns: [],
        name: 'vue-programmatic-invisible-google-recaptcha',
        props: {
            sitekey: {
                type: String,
                required: true
            },
            elementId: {
                type: String,
                required: true
            },
            showBadgeMobile: {
                type: Boolean,
                default: true
            },
            showBadgeDesktop: {
                type: Boolean,
                default: true
            },
            badgePosition: {
                type: String
            }
        },
        data: function data () {
            return {
                gAssignedId: null,
                captchaReady: false,
                checkInterval: null,
                checkIntervalRunCount: 0
            }
        },
        computed: {
            styleClassObject: function () {
                return {
                    'g-recaptcha--left': (this.badgePosition === 'left'),
                    'g-recaptcha--mobile-hidden': (!this.showBadgeMobile),
                    'g-recaptcha--desktop-hidden': (!this.showBadgeDesktop)
                }
            }
        },
        methods: {
            execute: function execute () {
                window.grecaptcha.execute(this.gAssignedId);
            },
            reset: function reset () {
                window.grecaptcha.reset(this.gAssignedId);
            },
            callback: function callback (recaptchaToken) {
                // Emit an event called recaptchaCallback with the recaptchaToken as payload
                this.$emit('recaptchaCallback', recaptchaToken);

                // Reset the recaptcha widget so you can execute it again
                this.reset();
            },
            render: function render () {
                var this$1 = this;

                this.gAssignedId = window.grecaptcha.render(this.elementId, {
                    sitekey: this.sitekey,
                    size: 'invisible',
                    // the callback executed when the user solve the recaptcha
                    'callback': function (recaptchaToken) {
                        this$1.callback(recaptchaToken);
                    },
                    'expired-callback': function () {
                        this$1.reset();
                    }
                });
            },
            init: function init() {
                var this$1 = this;

                // render the recaptcha widget when the component is mounted
                // we'll watch the captchaReady value in order to
                this.checkInterval = setInterval(function () {
                    this$1.checkIntervalRunCount++;
                    if (window.grecaptcha && window.grecaptcha.hasOwnProperty('render')){
                        this$1.captchaReady = true;
                    }
                }, 1000);
            }
        },
        watch: {
            captchaReady: function(data) {
                if (data) {
                    clearInterval(this.checkInterval);
                    this.render();
                }
            }
        },
        mounted: function mounted () {
            // Initialize the recaptcha
            this.init();
        }
    }

    // Import vue component

    // install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('VueProgrammaticInvisibleGoogleRecaptcha', component);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // To auto-install when vue is found
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    // It's possible to expose named exports when writing components that can
    // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
    // export const RollupDemoDirective = component;

    exports.install = install;
    exports.default = component;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
