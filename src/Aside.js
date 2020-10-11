import React from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaList, FaGithub } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'

import { Link } from 'react-router-dom'

import sidebarBg from './assets/bg1.jpg';

import { useSelector } from 'react-redux'

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();
  const numberCart = useSelector(state => state.cart.length)
  const category = useSelector(state => state.category)

  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {intl.formatMessage({ id: 'sidebarTitle' })}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<AiOutlineHome />}
          // suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}
          >
            <Link to='/'>{intl.formatMessage({ id: 'dashboard' })}</Link>
          </MenuItem>
          <SubMenu
            suffix={<span className="badge yellow">{category.length}</span>}
            title={intl.formatMessage({ id: 'multiLevel' })}
            icon={<FaList />}
          >
            {category.map((d,key) => <MenuItem key={key}><Link to={'/category/'+d._id}>{d.name}</Link></MenuItem>)}
          </SubMenu>
          <MenuItem
            prefix={<span className="badge red">{numberCart}</span>}
            title={intl.formatMessage({ id: 'withPrefix' })}
            icon={<AiOutlineShoppingCart />}
          >
            <Link to='/cart'>
              {intl.formatMessage({ id: 'withPrefix' })}
            </Link>
          </MenuItem>
          {/* <SubMenu

            title={intl.formatMessage({ id: 'multiLevel' })}
            icon={<FaList />}
            prefix={<span className="badge yellow">3</span>}
          >
            <MenuItem> Đông Trùng Hạ Thảo</MenuItem>
            <MenuItem> Nhân Sâm Ngàn Năm </MenuItem>

            {/* <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3`}>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.2 </MenuItem>
              <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3.3`}>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.1 </MenuItem>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.2 </MenuItem>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu> */}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://webhiendai.net"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> {intl.formatMessage({ id: 'viewSource' })}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
