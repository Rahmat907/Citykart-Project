import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionMap, categoryOptionMap } from "@/config";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <Card className="w-full max-w-sm max-auto ">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          { product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-gray-800 hover:bg-gray-900">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-600 hover:bg-yellow-700">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
          
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
          
          
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title} </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={` ${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary `}
            >
              {"\u20B9"} {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                {"\u20B9"}  {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddtoCart(product?._id)}
          className="w-full"
          disabled={product?.totalStock === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
