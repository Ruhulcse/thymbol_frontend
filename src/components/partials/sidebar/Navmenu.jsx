import Icon from '@/components/ui/Icon';
import useMobileMenu from '@/hooks/useMobileMenu';
import { selectCurrentUserRole } from '@/store/api/auth/authSlice';
import { getFilteredMenuItems } from '@/util/helpers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Submenu from './Submenu';
import { t } from 'i18next';

const Navmenu = ({ menus }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const userType = useSelector(selectCurrentUserRole);
    const toggleSubmenu = (i) => {
        if (activeSubmenu === i) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(i);
        }
    };

    const location = useLocation();
    const locationName = location.pathname.replace('/', '');
    const [mobileMenu, setMobileMenu] = useMobileMenu();
    const [activeMultiMenu, setMultiMenu] = useState(null);
    const dispatch = useDispatch();

    const toggleMultiMenu = (j) => {
        if (activeMultiMenu === j) {
            setMultiMenu(null);
        } else {
            setMultiMenu(j);
        }
    };

    const isLocationMatch = (targetLocation) => {
        return (
            locationName === targetLocation ||
            locationName.startsWith(`${targetLocation}/`)
        );
    };

    useEffect(() => {
        let submenuIndex = null;
        let multiMenuIndex = null;
        menus.forEach((item, i) => {
            if (isLocationMatch(item.link)) {
                submenuIndex = i;
            }

            if (item.child) {
                item.child.forEach((childItem, j) => {
                    if (isLocationMatch(childItem.childlink)) {
                        submenuIndex = i;
                    }

                    if (childItem.multi_menu) {
                        childItem.multi_menu.forEach((nestedItem) => {
                            if (isLocationMatch(nestedItem.multiLink)) {
                                submenuIndex = i;
                                multiMenuIndex = j;
                            }
                        });
                    }
                });
            }
        });
        document.title = `THYMBOL  | ${
            locationName?.charAt(0).toUpperCase() + locationName?.slice(1)
        }`;

        setActiveSubmenu(submenuIndex);
        setMultiMenu(multiMenuIndex);
        if (mobileMenu) {
            setMobileMenu(false);
        }
    }, [location]);

    const filteredMenuItems = getFilteredMenuItems(menus, userType);

    return (
        <>
            <ul>
                {filteredMenuItems?.map((item, i) => (
                    <li
                        key={i}
                        className={` single-sidebar-menu my-3 
              ${item.child ? 'item-has-children' : ''}
              ${activeSubmenu === i ? 'open' : ''}
              ${locationName.includes(item.link) ? 'menu-item-active' : ''}`}
                    >
                        {/* single menu with no childred*/}
                        {!item.child && !item.isHeadr && (
                            <NavLink className="menu-link" to={item.link}>
                                <span className="menu-icon flex-grow-0">
                                    <Icon icon={item.icon} />
                                </span>
                                <div className="text-box flex-grow">
                                    {t(item.title)}
                                </div>
                                {item.badge && (
                                    <span className="menu-badge">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        )}
                        {/* only for menulabel */}
                        {item.isHeadr && !item.child && (
                            <div className="menulabel">{t(item.title)}</div>
                        )}
                        {/*    !!sub menu parent   */}
                        {item.child && (
                            <div
                                className={`menu-link ${
                                    activeSubmenu === i
                                        ? 'parent_active not-collapsed'
                                        : 'collapsed'
                                }`}
                                onClick={() => toggleSubmenu(i)}
                            >
                                <div className="flex-1 flex items-start">
                                    <span className="menu-icon">
                                        <Icon icon={item.icon} />
                                    </span>
                                    <div className="text-box">{t(item.title)}</div>
                                </div>
                                <div className="flex-0">
                                    <div
                                        className={`menu-arrow transform transition-all duration-300 ${
                                            activeSubmenu === i
                                                ? ' rotate-90'
                                                : ''
                                        }`}
                                    >
                                        <Icon icon="heroicons-outline:chevron-right" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Submenu
                            activeSubmenu={activeSubmenu}
                            item={item}
                            i={i}
                            toggleMultiMenu={toggleMultiMenu}
                            activeMultiMenu={activeMultiMenu}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Navmenu;
