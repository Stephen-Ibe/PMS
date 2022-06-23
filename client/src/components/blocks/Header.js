import React from 'react';
import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0 py-2'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          <div className='d-flex'>
            <img src={Logo} alt='logo' className='mr-2' />
            <div>My Manager</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
