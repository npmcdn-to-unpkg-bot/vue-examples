define([
    // Vue.js
    'vue',
    // system.js
    'app/js/system',
    // Layout templates
    'text!app/components/app/templates/navbar.html',
    'text!app/components/app/templates/header.html',
    'text!app/components/app/templates/msgbox.html',
    'text!app/components/app/templates/footer.menu.html',
    'text!app/components/app/templates/footer.privacy.html',
], function (Vue, System, navbar, header, msgbox, footer_menu, footer_privacy) {

    var App = Vue.extend({
        name: 'app',
        sys: null,
        created: function () {
            // Set system prop
            try {
                this.$options.sys = new System(this);
            }
            catch (ex) {
                if (ex instanceof Error) {
                    var message = ex.stack;
                    alert(message);
                }
            }
        },
        components: {
            'app-navbar': {
                name: 'app-navbar',
                template: navbar,
            },
            'app-header': {
                name: 'app-header',
                template: header
            },
            'app-msgbox': {
                name: 'app-msgbox',
                template: msgbox,
                data: function () {
                    return {
                        type: '',
                        title: '',
                        msg: ''
                    }
                },
                // methods
                methods: {
                    resetMsg: function () {
                        this.type = '';
                        this.title = '';
                        this.msg = '';
                    },
                }
            },
            'app-footer-menu': {
                name: 'app-footer-menu',
                template: footer_menu
            },
            'app-footer-privacy': {
                name: 'app-footer-privacy',
                template: footer_privacy
            },
        }
    })

    return App;
});
