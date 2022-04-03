import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Layout className="layout">
      <Layout.Header>
        <div className="logo">
          {/* <img src='https://upload.wikimedia.org/wikipedia/commons/a/a3/To_Do.svg' height={10} width={10} /> */}
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item ><Link to={'/'}>Home</Link></Menu.Item>
          <Menu.Item > <Link to={'/charts'}>Charts</Link></Menu.Item>
        </Menu>
      </Layout.Header>
    </Layout>
  )
}

export default Navbar