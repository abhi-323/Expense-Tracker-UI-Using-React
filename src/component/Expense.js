import React from 'react';

const Expense = (props) => {
    
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
            props.onDelete(id);
            return response.text(); 
        });
    };
    

    return (
        <div key={props.id} className="bg-indigo-100 border-cyan-950 border-l-4 shadow-md rounded-lg p-6 m-5 relative hover:bg-indigo-300">
            <div className="mb-4">
                <h2 className="text-xl font-bold">{props.title}</h2>
            </div>
            <div className="text-black">
                <b>ID:</b> {props.id} <br />
                <b>Amount:</b> ₹{props.amount} <br />
                <b>Category:</b> {props.category} <br />
            </div>
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 absolute top-2 right-2 hover:bg-red-600"
                onClick={() => handleDelete(props.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default Expense;