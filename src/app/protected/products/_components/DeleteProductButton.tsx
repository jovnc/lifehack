import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "./DataTable";
import { deleteProduct } from "@/actions/product";

export const DeleteProductButton = ({ product }: { product: Product }) => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="cursor-pointer text-sm p-2 hover:bg-gray-100">Delete</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            You cannot undo this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-red-500 hover:bg-red-500">
            <Button
              className="bg-red-500"
              variant="destructive"
              onClick={() => {
                startTransition(async () => {
                  const res = await deleteProduct(product.id);
                  if (res?.success) {
                    toast.success(res?.success);
                    router.refresh();
                  } else {
                    if (res?.error) {
                      toast.error(res.error);
                    } else {
                      toast.error("Something went wrong!");
                    }
                  }
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
