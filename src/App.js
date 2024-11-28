import "./App.css";
import NavBar from "./component/NavBar";
import Expense from "./component/Expense";
import { useEffect, useState } from "react";

function App() {
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/expense")
      .then((response) => response.json())
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data); // Calculate total amount after fetching data
      })
      // .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log("expense length**************", expense.length);

  const handleDeleteFromState = (id) => {
    const updatedExpenses = expense.filter((e) => e.id !== id);
    setExpense(updatedExpenses);
    calculateTotalAmount(updatedExpenses); // Recalculate total amount after deletion
  };

  const calculateTotalAmount = (expenses) => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    setTotalAmount(total);
  };

  const handleAddExpense = () => {
    const title = prompt("Enter expense title:");
    const amount = parseFloat(prompt("Enter expense amount:"));
    const category = prompt("Enter expense category:");

    if (title && !isNaN(amount) && category) {
      const newExpense = { title, amount, category };

      fetch("http://localhost:8080/api/v1/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      })
        .then((response) => response.json())
        .then((data) => {
          setExpense((prevExpenses) => {
            const updatedExpenses = [...prevExpenses, data]; // Append new expense to the array
            calculateTotalAmount(updatedExpenses); // Recalculate total
            return updatedExpenses; // Update state
          });
        })
        .catch((error) => console.error("Error adding expense:", error));
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => handleAddExpense()} >
          ADD
        </button>
        <h2 className="text-xl font-bold mt-2">Total Amount: ₹ <span className="text-green-600">{totalAmount}</span></h2> {/* Display total amount */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {expense.map((e) => (
          <Expense
            key={e.id}
            id={e.id}
            title={e.title}
            category={e.category}
            amount={e.amount}
            onDelete={handleDeleteFromState}
          />
        ))}
      </div>
    </>
  );
}

export default App;
