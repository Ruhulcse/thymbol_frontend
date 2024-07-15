import { v4 as uuidv4 } from 'uuid';
const themeConfig = {
    app: {
        name: 'THYMBOL React',
    },
    // layout
    layout: {
        isRTL: false,
        language: 'en',
        darkMode: false,
        semiDarkMode: false,
        skin: 'default',
        contentWidth: 'full',
        type: 'vertical',
        navBarType: 'sticky',
        footerType: 'static',
        isMonochrome: false,
        menu: {
            isCollapsed: false,
            isHidden: false,
        },
        mobileMenu: false,
        customizer: false,
    },
};

export default themeConfig;
