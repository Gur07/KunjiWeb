import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [income, setIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [expense, setExpense] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("groceries");
  const [expenses, setExpenses] = useState([]);
  const [expenseNote, setExpenseNote] = useState("");
  const [budgetGoals, setBudgetGoals] = useState({
    groceries: 0,
    utilities: 0,
    rent: 0,
    entertainment: 0,
    transportation: 0,
    healthcare: 0,
    others: 0,
  });

  const categories = [
    { value: "groceries", label: t("budget.categories.groceries") },
    { value: "utilities", label: t("budget.categories.utilities") },
    { value: "rent", label: t("budget.categories.rent") },
    { value: "entertainment", label: t("budget.categories.entertainment") },
    { value: "transportation", label: t("budget.categories.transportation") },
    { value: "healthcare", label: t("budget.categories.healthcare") },
    { value: "others", label: t("budget.categories.others") }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("budgetData");
      if (storedData) {
        const { totalIncome, expenses, budgetGoals, lastUpdated } = JSON.parse(storedData);
        
        // Check if the data is from the current month
        const currentMonth = new Date().getMonth();
        const storedMonth = new Date(lastUpdated).getMonth();
        
        if (currentMonth === storedMonth) {
          setTotalIncome(parseFloat(totalIncome) || 0);
          setExpenses(expenses || []);
          setBudgetGoals(budgetGoals || {
            groceries: 0,
            utilities: 0,
            rent: 0,
            entertainment: 0,
            transportation: 0,
            healthcare: 0,
            others: 0,
          });
        } else {
          // If it's a new month, archive the old data and start fresh
          const archiveKey = `budgetData_${format(new Date(lastUpdated), "yyyy_MM")}`;
          localStorage.setItem(archiveKey, storedData);
          resetBudget();
        }
      }
    } catch (error) {
      console.error("Error loading budget data:", error);
      resetBudget();
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      const budgetData = {
        totalIncome,
        expenses,
        budgetGoals,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem("budgetData", JSON.stringify(budgetData));
    } catch (error) {
      console.error("Error saving budget data:", error);
    }
  }, [totalIncome, expenses, budgetGoals]);

  const resetBudget = () => {
    setTotalIncome(0);
    setExpenses([]);
    setBudgetGoals({
      groceries: 0,
      utilities: 0,
      rent: 0,
      entertainment: 0,
      transportation: 0,
      healthcare: 0,
      others: 0,
    });
  };

  const addIncome = () => {
    if (income && !isNaN(income)) {
      setIncome("");
      setTotalIncome((prev) => prev + parseFloat(income));
    }
  };

  const addExpense = () => {
    if (expense && !isNaN(expense)) {
      const newExpense = {
        amount: parseFloat(expense),
        category: expenseCategory,
        date: new Date().toISOString(),
        note: expenseNote,
        id: Date.now(), // Add unique ID for each expense
      };
      setExpense("");
      setExpenseNote("");
      setExpenses((prev) => [...prev, newExpense]);
    }
  };

  const removeExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
  };

  const updateBudgetGoal = (category, amount) => {
    setBudgetGoals(prev => ({
      ...prev,
      [category]: parseFloat(amount) || 0
    }));
  };

  const getCategoryExpenses = (category) => {
    return expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getBudgetStatus = (category) => {
    const spent = getCategoryExpenses(category);
    const budget = budgetGoals[category];
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'normal';
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = totalIncome - totalExpenses;

  const chartData = {
    labels: expenses
      .slice(-7)
      .map((expense) => format(new Date(expense.date), "MMM dd")),
    datasets: [
      {
        label: t('budget.expenses'),
        data: expenses.slice(-7).map((expense) => expense.amount),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: categories.map(category => category.label),
    datasets: [
      {
        data: categories.map(
          (category) =>
            expenses
              .filter((expense) => expense.category === category.value)
              .reduce((acc, curr) => acc + curr.amount, 0)
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={t('direction', { defaultValue: 'ltr' })}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('budget.overview')}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Income Input */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">{t('budget.income.title')}</h2>
              <div className="flex items-center space-x-4">
                <IndianRupee className="text-gray-400" />
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
                  placeholder={t('budget.income.placeholder')}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
              <button
                onClick={addIncome}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>{t('budget.income.addIncome')}</span>
              </button>
              <div className="mt-4 text-lg font-medium">
                {t('budget.income.total')}: ₹{totalIncome.toLocaleString()}
              </div>
            </div>

            {/* Expense Input */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">{t('budget.expense.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <IndianRupee className="text-gray-400" />
                  <input
                    type="number"
                    value={expense}
                    onChange={(e) => setExpense(parseFloat(e.target.value) || 0)}
                    placeholder={t('budget.expense.placeholder.amount')}
                    className="flex-1 p-2 border rounded-md"
                  />
                </div>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={expenseNote}
                  onChange={(e) => setExpenseNote(e.target.value)}
                  placeholder={t('budget.expense.placeholder.note')}
                  className="w-full p-2 border rounded-md"
                />
                <button
                  onClick={addExpense}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>{t('budget.expense.add')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Budget Goals */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">{t('budget.goals.title')}</h2>
              <div className="space-y-4">
                {categories.map(({ value, label }) => {
                  const spent = getCategoryExpenses(value);
                  const budget = budgetGoals[value];
                  const status = getBudgetStatus(value);
                  const statusColors = {
                    normal: 'bg-green-100 text-green-800',
                    warning: 'bg-yellow-100 text-yellow-800',
                    exceeded: 'bg-red-100 text-red-800'
                  };

                  return (
                    <div key={value} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium truncate flex-1">{label}</div>
                        <div className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
                          {t(`budget.goals.status.${status}`)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          value={budget || ''}
                          onChange={(e) => updateBudgetGoal(value, e.target.value)}
                          placeholder={t('budget.goals.set')}
                          className="w-32 p-2 border rounded-md"
                        />
                        <div className="flex-1 truncate">
                          ₹{spent.toLocaleString()} / ₹{budget.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">{t('budget.charts.expenses')}</h2>
              <Line data={chartData} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">{t('budget.charts.distribution')}</h2>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
