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
import { NewProductSchema, NewTransactionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "../page";
import { addTransaction } from "@/actions/transaction";

export default function AddTransactionForm({
  products,
}: {
  products: Product[];
}) {
  const form = useForm<z.infer<typeof NewTransactionSchema>>({
    resolver: zodResolver(NewTransactionSchema),
  });
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof NewTransactionSchema>) => {
    startTransition(async () => {
      const res = await addTransaction(values);

      if (res?.error) {
        toast.error(res.error);
      }

      if (res?.success) {
        toast.success("Transaction created successfully");
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
            name="products"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Products</FormLabel>
                  <FormControl>
                    <ProductsSelectorInput {...field} products={products} />
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

function ProductsSelectorInput({
  products,
  onChange,
}: {
  products: Product[];
  onChange: (value: { name: string; amount: number }[]) => void;
}) {
  const [currentProducts, setCurrentProducts] = useState<
    { name: string; amount: number }[]
  >([]);
  const [curr, setCurr] = useState("");
  const [currAmount, setCurrAmount] = useState(0);

  const handleAdd = () => {
    if (curr === "" || currAmount < 1 || isNaN(currAmount)) {
      return;
    }
    const newProduct = {
      name: curr,
      amount: currAmount,
    };
    if (currentProducts.find((product) => product.name === newProduct.name)) {
      return;
    }

    setCurrentProducts((currentProducts) => [...currentProducts, newProduct]);

    onChange([...currentProducts, newProduct]);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-row gap-8">
        <div className="w-full">
          <Select onValueChange={(value) => setCurr(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              {products &&
                products.map((product: Product) => {
                  return (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Quantity"
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
        <p className="font-bold">Current Products</p>
        {currentProducts.length === 0 && <div>No products added</div>}
        {currentProducts.length > 0 && (
          <div className="w-full flex flex-row justify-between">
            <p className="font-semibold">Product Name</p>
            <p className="font-semibold">Quantity</p>
          </div>
        )}
        {currentProducts.map((product) => (
          <div className="w-full flex flex-row justify-between">
            <p>{product.name}</p>
            <p>{product.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
