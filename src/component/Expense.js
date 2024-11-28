import React from 'react';

const Expense = (props) => {
    console.log("prop",props);
    
    const handleDelete = (id) => {
        console.log(`Delete item with id: ${id}`);
        
        fetch("http://localhost:8080/api/v1/expensedeletebyid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Use response.text() if the server sends plain text
        })
        .then(data => {
            console.log("Success:", data);
            props.onDelete(id); // Update UI after successful deletion
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };
    

    return (
        <div key={props.id} className="bg-white shadow-md rounded-lg p-6 m-5 relative">
            <div className="mb-4">
                <h2 className="text-xl font-bold">{props.title}</h2>
            </div>
            <div className="text-gray-600">
                <p>ID: {props.id}</p>
                <p>Amount: ${props.amount}</p>
                <p>Category: {props.category}</p>
            </div>
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 absolute top-2 right-2"
                onClick={() => handleDelete(props.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default Expense;