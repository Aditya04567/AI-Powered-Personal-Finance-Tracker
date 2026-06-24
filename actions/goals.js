"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getUserGoals() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const goals = await db.goal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return goals;
}

export async function createGoal(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const goal = await db.goal.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    revalidatePath("/goals");
    return { success: true, data: goal };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateGoal(id, data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const goal = await db.goal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== user.id) {
      throw new Error("Goal not found or unauthorized");
    }

    const updatedGoal = await db.goal.update({
      where: { id },
      data,
    });

    revalidatePath("/goals");
    return { success: true, data: updatedGoal };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteGoal(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const goal = await db.goal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== user.id) {
      throw new Error("Goal not found or unauthorized");
    }

    await db.goal.delete({
      where: { id },
    });

    revalidatePath("/goals");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
