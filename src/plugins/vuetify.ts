import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    theme: {
        themes: {
            light: {
                primary: colors.indigo.darken3, // #E53935
                secondary: colors.indigo.accent3, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
                disabled: colors.indigo.lighten4
            },
            dark: {
                primary: colors.indigo.lighten4, // #E53935
                secondary: colors.indigo.accent3, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
                disabled: colors.indigo.lighten4
            },
        },
    },
});