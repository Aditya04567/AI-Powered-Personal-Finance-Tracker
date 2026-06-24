const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Get the first user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found. Please sign in first.");
    return;
  }

  console.log(`Seeding for user: ${user.email}`);

  // Create some goals
  const goalsData = [
    { name: "Buy New Car", targetAmount: 20000, currentAmount: 8500, userId: user.id },
    { name: "Dream Vacation", targetAmount: 5000, currentAmount: 2300, userId: user.id },
    { name: "Emergency Fund", targetAmount: 10000, currentAmount: 4250, userId: user.id },
    { name: "New House Down Payment", targetAmount: 50000, currentAmount: 15000, userId: user.id },
    { name: "Higher Education", targetAmount: 10000, currentAmount: 1150, userId: user.id },
    { name: "New Laptop", targetAmount: 1500, currentAmount: 650, userId: user.id },
    { name: "Retirement Fund", targetAmount: 100000, currentAmount: 12345.50, userId: user.id },
  ];

  for (const g of goalsData) {
    await prisma.goal.create({ data: g });
  }
  console.log("Goals seeded.");

  // Create an account if none exists
  let account = await prisma.account.findFirst({ where: { userId: user.id } });
  if (!account) {
    account = await prisma.account.create({
      data: {
        name: "Main Checking",
        type: "CURRENT",
        balance: 5000,
        isDefault: true,
        userId: user.id,
      }
    });
    console.log("Account created.");
  }

  // Create 50 historical transactions spanning 3 months
  const categories = ["Housing", "Food & Dining", "Transport", "Shopping", "Entertainment", "Utilities", "Others"];
  const types = ["INCOME", "EXPENSE", "EXPENSE", "EXPENSE", "EXPENSE"]; // 80% expense

  for (let i = 0; i < 50; i++) {
    const isExpense = types[Math.floor(Math.random() * types.length)] === "EXPENSE";
    const amount = isExpense ? Math.floor(Math.random() * 500) + 10 : Math.floor(Math.random() * 3000) + 500;
    
    // Random date within last 90 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));

    await prisma.transaction.create({
      data: {
        type: isExpense ? "EXPENSE" : "INCOME",
        amount,
        description: isExpense ? "Purchase" : "Salary / Deposit",
        date,
        category: isExpense ? categories[Math.floor(Math.random() * categories.length)] : "Salary",
        userId: user.id,
        accountId: account.id,
        status: "COMPLETED",
      }
    });
  }

  console.log("Transactions seeded.");
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
