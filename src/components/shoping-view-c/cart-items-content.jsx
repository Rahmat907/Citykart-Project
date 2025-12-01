import React, { use } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

const UserCartItemsContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleCartItemDelete = (getCartitem) => {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartitem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart Item deleted successfully");
      }
    });
  };

  const handleUpdateQuantity = (getCartitem, typeofAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartitem?.productId,
        quantity:
          typeofAction === "plus"
            ? getCartitem?.quantity + 1
            : getCartitem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart Item updated successfully");
      }
    });
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems.image}
        alt={cartItems.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4" />

            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div>
        <p className="font-semibold">
          $
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
