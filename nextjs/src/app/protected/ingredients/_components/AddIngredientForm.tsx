import { FormSuccess } from "@/components/form-success";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NewIngredientSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { addIngredient } from "@/actions/ingredients";
import { toast } from "sonner";

export default function AddIngredientForm() {
  const form = useForm<z.infer<typeof NewIngredientSchema>>({
    resolver: zodResolver(NewIngredientSchema),
  });
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof NewIngredientSchema>) => {
    startTransition(async () => {
      const res = await addIngredient(values);
      if (res.success) {
        toast.success(res.success);
        form.reset();
        router.refresh();
      } else {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.error("Something went wrong!");
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Ingredient Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isPending}
                      placeholder="Dough"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Amount (in kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isPending}
                      placeholder="10kg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {/* <FormError message={"error"} />
        <FormSuccess message={"success"} /> */}
        <div className="w-full flex flex-row gap-8 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button type="submit" className="w-full" disabled={isPending}>
              Add
            </Button>
          </AlertDialogAction>
        </div>
      </form>
    </Form>
  );
}
