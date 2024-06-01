import { FormSuccess } from "@/components/form-success";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { NewProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Ingredient } from "./DataTable";

export default function AddProductForm({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
  });
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
    startTransition(async () => {
      const res = await addProduct(values);

      if (res?.error) {
        toast.error(res.error);
      }

      if (res?.success) {
        toast.success("Product created successfully");
        form.reset();
        router.refresh();
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
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isPending}
                      placeholder="Pizza"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isPending}
                      placeholder="$10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <IngredientsSelectorInput
                      {...field}
                      ingredients={ingredients}
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
          <AlertDialogTrigger asChild>
            <Button type="submit" className="w-full" disabled={isPending}>
              Add
            </Button>
          </AlertDialogTrigger>
        </div>
      </form>
    </Form>
  );
}

function IngredientsSelectorInput({
  ingredients,
  onChange,
}: {
  ingredients: Ingredient[];
  onChange: (value: { name: string; amount: number }[]) => void;
}) {
  const [currentIngredients, setCurrentIngredients] = useState<
    { name: string; amount: number }[]
  >([]);
  const [curr, setCurr] = useState("");
  const [currAmount, setCurrAmount] = useState(0);

  const handleAdd = () => {
    if (curr === "" || currAmount < 1 || isNaN(currAmount)) {
      return;
    }
    const newIngredient = {
      name: curr,
      amount: currAmount,
    };
    if (
      currentIngredients.find(
        (ingredient) => ingredient.name === newIngredient.name
      )
    ) {
      return;
    }

    setCurrentIngredients((currentIngredients) => [
      ...currentIngredients,
      newIngredient,
    ]);

    onChange([...currentIngredients, newIngredient]);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-row gap-8">
        <div className="w-full">
          <Select onValueChange={(value) => setCurr(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ingredient" />
            </SelectTrigger>
            <SelectContent>
              {ingredients &&
                ingredients.map((ingredient) => {
                  return (
                    <SelectItem key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Amount (in g)"
          className="w-[150px]"
          type="number"
          onChange={(e) => {
            if (parseInt(e.target.value) > 0)
              setCurrAmount(e.target.valueAsNumber);
          }}
        />
        <div
          className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-center p-2 rounded-lg"
          onClick={handleAdd}
        >
          Add
        </div>
      </div>
      <div className="w-full py-4 flex flex-col gap-3">
        <p className="font-bold">Current Ingredients</p>
        {currentIngredients.length === 0 && <div>No ingredients added</div>}
        {currentIngredients.length > 0 && (
          <div className="w-full flex flex-row justify-between">
            <p className="font-semibold">Ingredient Name</p>
            <p className="font-semibold">Amount (in g)</p>
          </div>
        )}
        {currentIngredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="w-full flex flex-row justify-between"
          >
            <p>{ingredient.name}</p>
            <p>{ingredient.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
