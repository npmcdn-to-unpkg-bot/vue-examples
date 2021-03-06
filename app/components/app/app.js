define([
    // Vue.js
    'vue',
    // system.js
    'app/js/system',
    // lang.js
    'app/js/lang',
    // Layout templates
    'text!app/components/app/templates/navbar.html',
    'text!app/components/app/templates/header.html',
    'text!app/components/app/templates/msgbox.html',
    'text!app/components/app/templates/footer.menu.html',
    'text!app/components/app/templates/footer.privacy.html',
], function (Vue, System, Lang, navbar, header, msgbox, footer_menu, footer_privacy) {

    var App = Vue.extend({
        name: 'app',
        sys: null,
        lang: null,
        router: null,
        data: function () {
            return {
                locale: 'en',
            }
        },
        created: function () {
            try {
                // Set props
                this.$options.sys = new System(this);
                this.$options.lang = new Lang(this);
                // Create filter
                Vue.filter('trans', this.$options.lang.trans);
            }
            catch (ex) {
                if (ex instanceof Error) {
                    var message = ex.stack;
                    alert(message);
                }
            }
        },
        watch: {
            'locale': function (val, oldVal) {
                this.$options.lang.getTransData(val);
                window.location.replace(this.$route.path);
//                this.$router.replace('/todo');// this.$route.path
//                this.$destroy();
//                this.$mount('body');
//                this.$options.router.go('http://vue-examples/#!/todo');
//                console.log('new: %s, old: %s', val, oldVal);
            },
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
                template: footer_menu,
                props: ['locale'],
                // methods
                methods: {
                    setLocale: function (locale) {
                        this.$root.$set('locale', locale);
                    },
                }
            },
            'app-footer-privacy': {
                name: 'app-footer-privacy',
                template: footer_privacy
            },
        }
    })

    return App;
});
