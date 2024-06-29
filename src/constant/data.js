export const menuItems = [
    {
        isHeadr: true,
        title: '',
    },
    {
        title: 'Packages',
        icon: 'heroicons-outline:gift',
        link: 'dashboard',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    {
        title: 'Stores',
        icon: 'heroicons-outline:building-storefront',
        link: 'stores',
        role: ['supperadmin', 'admin', 'consumer', 'merchant'],
    },
    {
        title: 'Vouchers',
        icon: 'heroicons-outline:ticket',
        link: 'vouchers',
        role: ['supperadmin', 'admin', 'consumer', 'merchant'],
    },
    {
        title: 'Analytics',
        icon: 'heroicons-outline:arrow-trending-up',
        link: 'analytics',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    {
        title: 'Notifications',
        icon: 'heroicons-outline:bell-alert',
        link: 'push-notifications',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    {
        title: 'Admins',
        icon: 'heroicons-outline:users',
        link: 'admins',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    {
        title: 'Scan QR Code',
        icon: 'heroicons-outline:qr-code',
        link: 'scan-qr',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    {
        title: 'Delete Account',
        icon: 'heroicons-outline:trash',
        link: 'delete-account',
        role: ['supperadmin', 'consumer', 'merchant'],
    },
    // {
    //   title: "Multi Level",
    //   icon: "heroicons:share",
    //   link: "#",
    //   child: [
    //     {
    //       childtitle: "Level 1.1",
    //       childlink: "icons",
    //     },
    //     {
    //       childtitle: "Level 1.2",
    //       childlink: "Level-1",
    //       multi_menu: [
    //         {
    //           multiTitle: "Level 2.1",
    //           multiLink: "Level-2",
    //         },
    //         {
    //           multiTitle: "Level 2.2",
    //           multiLink: "Level-2.3",
    //         },
    //       ],
    //     },
    //   ],
    // },
];

export const navLink = [
    {
        title:"Home",
        link:'/home'
    },
    {
        title:"Favourites",
        link:'/favourites'
    },
    {
        title:"Clipped Deals",
        link:'/clipped-deals'
    },
    {
        title:"Subscription",
        link:'/consumer-subscription'
    },
]



export const colors = {
    primary: '#4669FA',
    secondary: '#A0AEC0',
    danger: '#F1595C',
    black: '#111112',
    warning: '#FA916B',
    info: '#0CE7FA',
    light: '#425466',
    success: '#50C793',
    'gray-f7': '#F7F8FC',
    dark: '#1E293B',
    'dark-gray': '#0F172A',
    gray: '#68768A',
    gray2: '#EEF1F9',
    'dark-light': '#CBD5E1',
};

export const hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
};

 export const infoIcon = [
    {
        icon:'heroicons:map-pin'
    },
    {
        icon:'heroicons:phone'
    },
    {
        icon:'heroicons:share'
    },
]

