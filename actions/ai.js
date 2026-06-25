"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateFinancialInsights(transactions) {
  try {
    if (!transactions || transactions.length === 0) {
      return { success: false, error: "No transactions to analyze." };
    }

    // Prepare a simple summary of transactions for the AI to analyze, to save tokens
    const analysisData = transactions.map((t) => ({
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: t.date,
      description: t.description,
    }));

    const prompt = `
      You are an expert financial advisor. Analyze these recent transactions and provide exactly 3 concise, actionable financial insights or observations.
      Keep each insight to 1 or 2 short sentences. Format the response as a valid JSON array of strings. Do not include markdown code block formatting (like \`\`\`json). Just return the raw JSON array.
      
      Transactions:
      ${JSON.stringify(analysisData)}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean up any potential markdown formatting from the response
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    try {
      const insights = JSON.parse(text);
      if (Array.isArray(insights)) {
        return { success: true, data: insights };
      }
      return { success: false, error: "Failed to parse AI response." };
    } catch (parseError) {
      return { success: false, error: "Failed to parse AI response. Try again." };
    }
  } catch (error) {
    console.error("AI Insight Error:", error);
    return { success: false, error: "Failed to generate insights. Please try again later." };
  }
}

export async function generateReportInsights(transactions) {
  try {
    if (!transactions || transactions.length === 0) {
      return { success: false, error: "No transactions to analyze." };
    }

    const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
    const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
    const netSavings = totalIncome - totalExpenses;
    
    // Get top categories
    const categoryTotals = {};
    transactions.forEach(t => {
      if (t.type === 'EXPENSE') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
      }
    });
    
    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, amount]) => `${cat}: $${amount}`);

    const prompt = `
      You are an expert personal financial advisor reviewing a client's monthly financial report.
      Write a comprehensive, professional, yet encouraging summary of their financial health.
      
      Here is their data for this period:
      Total Income: $${totalIncome}
      Total Expenses: $${totalExpenses}
      Net Savings: $${netSavings}
      Top Spending Categories: ${topCategories.join(', ')}

      Please provide a 2-3 paragraph analysis. 
      Format your response in Markdown using bolding for emphasis where appropriate, but do NOT include a main heading.
      Provide observations on their savings rate, spending habits, and an actionable tip for the future.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    return { success: true, data: text.trim() };
  } catch (error) {
    console.error("AI Report Insight Error:", error);
    return { success: false, error: "Failed to generate report insights. Please try again later." };
  }
}
