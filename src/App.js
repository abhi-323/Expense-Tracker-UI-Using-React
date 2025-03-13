import "./App.css";
import NavBar from "./component/NavBar";
import Expense from "./component/Expense";
import { useEffect, useState } from "react";
import AddExpense from "./component/AddExpense";

function App() {
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetch("http://13.61.141.250:8080/api/v1/expense")
      .then((response) => response.json())
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data);
      });
  }, []);

  const handleDeleteFromState = (id) => {
    const updatedExpenses = expense.filter((e) => e.id !== id);
    setExpense(updatedExpenses);
    calculateTotalAmount(updatedExpenses);
  };

  const calculateTotalAmount = (expenses) => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    setTotalAmount(total);
  };

  const handleAddExpense = (newExpenseData) => {
    fetch("http://13.61.141.250:8080/api/v1/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ADD", data);

        setExpense(data);
        calculateTotalAmount(data);
      });
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-600 h-screen w-full">
        <div className="flex flex-col items-center ">
          <AddExpense onAddExpense={handleAddExpense} />
          <h2 className="text-xl font-bold mt-2">
            Total Amount: ₹{" "}
            <span className="text-green-600 hover:text-green-100">
              {totalAmount}
            </span>
          </h2>
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
      </div>
    </>
  );
}

export default App;
