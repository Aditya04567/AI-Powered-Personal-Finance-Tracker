"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { createGoal } from "@/actions/goals";
import { goalSchema } from "@/app/lib/schema";

export function CreateGoalDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      targetAmount: "",
      currentAmount: "",
    },
  });

  const {
    loading: createGoalLoading,
    fn: createGoalFn,
    error,
    data: newGoal,
  } = useFetch(createGoal);

  const onSubmit = async (data) => {
    await createGoalFn(data);
  };

  useEffect(() => {
    if (newGoal) {
      toast.success("Goal created successfully");
      reset();
      setOpen(false);
    }
  }, [newGoal, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create goal");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Goal</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Goal Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Vacation Fund"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="targetAmount"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Target Amount
              </label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("targetAmount")}
              />
              {errors.targetAmount && (
                <p className="text-sm text-red-500">
                  {errors.targetAmount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="currentAmount"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Current Saved Amount (Optional)
              </label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("currentAmount")}
              />
              {errors.currentAmount && (
                <p className="text-sm text-red-500">
                  {errors.currentAmount.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={createGoalLoading}
              >
                {createGoalLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Goal"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
