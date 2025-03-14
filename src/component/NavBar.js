import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-teal-950 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Expense Tracker APP</div>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-white hover:text-gray-200">Home</a></li>
                    <li><a href="/" className="text-white hover:text-gray-200">About</a></li>
                    <li><a href="/" className="text-white hover:text-gray-200">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;