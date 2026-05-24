export const summaryFallback = {
  monthly_expenses: 42850,
  budget_remaining: 17150,
  portfolio_value: 186400,
  savings_rate: 31,
  category_breakdown: [
    { category: "Food", amount: 12400 },
    { category: "Bills", amount: 9800 },
    { category: "Travel", amount: 7600 },
    { category: "Shopping", amount: 6900 },
    { category: "Education", amount: 4150 },
  ],
  monthly_spending: [
    { month: 1, amount: 28400 },
    { month: 2, amount: 31800 },
    { month: 3, amount: 29600 },
    { month: 4, amount: 36200 },
    { month: 5, amount: 42850 },
  ],
  insights: [
    "Food and bills account for more than half of this month's tracked spending.",
    "Your current savings rate is healthy. Keep discretionary categories under review.",
  ],
};

export const demoExpenses = [
  { id: 1, description: "Zomato dinner", category: "Food", amount: 820, date: "2026-05-23" },
  { id: 2, description: "Internet bill", category: "Bills", amount: 1299, date: "2026-05-22" },
  { id: 3, description: "Metro card recharge", category: "Travel", amount: 500, date: "2026-05-21" },
];

export const demoBudgets = [
  { id: 1, category: "Food", limit_amount: 15000, spent_amount: 12400, remaining_amount: 2600, usage_percent: 82.67 },
  { id: 2, category: "Travel", limit_amount: 9000, spent_amount: 7600, remaining_amount: 1400, usage_percent: 84.44 },
  { id: 3, category: "Shopping", limit_amount: 12000, spent_amount: 6900, remaining_amount: 5100, usage_percent: 57.5 },
];

export const demoPortfolio = [
  {
    id: 1,
    stock_symbol: "TCS",
    company_name: "Tata Consultancy Services",
    quantity: 8,
    buy_price: 3450,
    current_price: 3860,
    market_value: 30880,
    profit_loss: 3280,
    profit_loss_percent: 11.88,
  },
  {
    id: 2,
    stock_symbol: "INFY",
    company_name: "Infosys",
    quantity: 12,
    buy_price: 1420,
    current_price: 1515,
    market_value: 18180,
    profit_loss: 1140,
    profit_loss_percent: 6.69,
  },
];
