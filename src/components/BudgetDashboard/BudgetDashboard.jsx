import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { format } from "date-fns";
import {
  PlusCircle,
  Trash2,
  IndianRupee,
  PieChart,
  TrendingUp,
  Receipt,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const BudgetDashboard = () => {
  const [income, setIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [expense, setExpense] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("groceries");
  const [expenses, setExpenses] = useState([]);
  const [expenseNote, setExpenseNote] = useState("");

  const categories = [
    "groceries",
    "utilities",
    "rent",
    "entertainment",
    "transportation",
    "healthcare",
    "others",
  ];

  const categoryColors = {
    groceries: "#FF6384",
    utilities: "#36A2EB",
    rent: "#FFCE56",
    entertainment: "#4BC0C0",
    transportation: "#9966FF",
    healthcare: "#FF9F40",
    others: "#C9CBCF",
  };

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedIncome = localStorage.getItem("totalIncome");
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));

    if (storedIncome) setTotalIncome(parseFloat(storedIncome));
    if (storedExpenses) setExpenses(storedExpenses);
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [totalIncome, expenses]);

  const addIncome = () => {
    if (income && !isNaN(income)) {
      setTotalIncome((prev) => prev + parseFloat(income));
      setIncome("");
    }
  };

  const addExpense = () => {
    if (expense && !isNaN(expense)) {
      const newExpense = {
        amount: parseFloat(expense),
        category: expenseCategory,
        date: new Date(),
        note: expenseNote,
      };
      setExpenses((prev) => [...prev, newExpense]);
      setExpense("");
      setExpenseNote("");
    }
  };

  const removeExpense = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = totalIncome - totalExpenses;

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((category) =>
          expenses
            .filter((exp) => exp.category === category)
            .reduce((sum, exp) => sum + exp.amount, 0)
        ),
        backgroundColor: Object.values(categoryColors),
      },
    ],
  };

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return format(date, "MMM yyyy");
  }).reverse();

  const lineData = {
    labels: last6Months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: last6Months.map((month) =>
          expenses
            .filter((exp) => format(new Date(exp.date), "MMM yyyy") === month)
            .reduce((sum, exp) => sum + exp.amount, 0)
        ),
        borderColor: "#36A2EB",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <IndianRupee className="w-8 h-8 text-blue-500" />
          Budget Dashboard
        </h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Income */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Income
              </h2>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500 mt-2">
              ₹{totalIncome.toFixed(2)}
            </p>
          </div>
          {/* Total Expenses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Expenses
              </h2>
              <Receipt className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-500 mt-2">
              ₹{totalExpenses.toFixed(2)}
            </p>
          </div>
          {/* Balance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
              <PieChart className="w-5 h-5 text-blue-500" />
            </div>
            <p
              className={`text-2xl font-bold mt-2 ${balance >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              ₹{balance.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Income and Expense Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Add Income
            </h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter income amount"
                className="flex-1 rounded-lg border-gray-300 border p-2"
              />
              <button
                onClick={addIncome}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Add Expense
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="number"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                  placeholder="Enter expense amount"
                  className="flex-1 rounded-lg border-gray-300 border p-2"
                />
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="rounded-lg border-gray-300 border p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={expenseNote}
                onChange={(e) => setExpenseNote(e.target.value)}
                placeholder="Add a note (optional)"
                className="w-full rounded-lg border-gray-300 border p-2"
              />
              <button
                onClick={addExpense}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Expense Distribution
            </h2>
            <Pie data={pieData} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Expenses
            </h2>
            <Line data={lineData} />
          </div>
        </div>
        {/* Expenses Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Expenses
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{format(new Date(exp.date), "MMM dd, yyyy")}</td>
                    <td>{exp.category}</td>
                    <td>₹{exp.amount.toFixed(2)}</td>
                    <td>{exp.note}</td>
                    <td>
                      <button
                        onClick={() => removeExpense(index)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 className="w-4 h-4 inline" /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No expenses recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
