import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Components/Login/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../../Components/Header';
import LoginModal from '../../Components/Login/LoginModal';
import SneakersAdmin from '../../Components/Sneakers/SneakersAdmin';
import AddFunction from './Add';

function AdminPage() {

    const { UserRole } = useAuth()
    const [activeMenu, setActiveMenu] = useState(0);
    const [activeContent, setActiveContent] = useState([]);

    //default to the first item in menuContent
    useEffect(() => {
        setActiveContent(menuContent[0])
    }, []);

    const handleSetActive = (index) => {
        setActiveMenu(index);
        setActiveContent(menuContent[index])
    };

    //dynamic styling
    const getMenuListItemStyle = (index) => ({
        paddingLeft: '8px',
        transition: 'border-left 160ms',
        cursor: 'pointer',
        borderLeft: `${activeMenu === index ? 'solid 8px #e6c300' : ''}`,
    });

    //mapping
    const menuItems = ['Products', 'Add Product'];
    const menuItemsMap = menuItems.map((item, index) => (
        <li key={index} onClick={() => handleSetActive(index)} style={getMenuListItemStyle(index)}>
            {item}
        </li>
    ))

    const adminPageContent =
        <div className='profilePageContainer'>
            <div className='profilePageMenu'>
                <ul className='profileMenuList'>
                    {menuItemsMap}
                </ul>
            </div>

            <div className='profileMenuContent'>
                {activeContent}
            </div>

        </div>

    //MENU LOGIC

    //the array of contents REMEMBER:(the order of the contents must match with the 'menuItems' ) tldr: the arrays must match each other
    const menuContent = [<SneakersAdmin/>, <AddFunction/>]

    //the actual content of the page
    const adminContent =
        <>
            <Header />
            <LoginModal />
            {adminPageContent}
        </>

    //check if user has the admin role    
    if (UserRole === 'admin') {
        return adminContent;
    } else {
        // go to the loading page
        return <Navigate to="/loading" />;
    }
}

export default AdminPage