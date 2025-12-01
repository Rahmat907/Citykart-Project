import ProductFilter from "@/components/shoping-view-c/filter";
import ProductDetailsDialogue from "@/components/shoping-view-c/product-details";
import ShoppingProductTile from "@/components/shoping-view-c/product-tileShoping";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";

import { ArrowUpDownIcon } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  console.log("The query", queryParams);

  return queryParams.join("&");
};

const ShopingListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [SearchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setopenDetailsDialog] = useState(false);
  // const {toast} =  useToast

  const handleSort = (value) => {
    console.log(value);
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexofCurrentSelction =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexofCurrentSelction === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexofCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexofCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexofCurrentOption, 1);
    }
    // console.log(copyFilters);
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddtoCart = (getCurrentId) => {
    // console.log(getCurrentId);
    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success){
        dispatch(fetchCartItems({ userId: user?.id }));
        
        toast.success("Product added to cart successfully");
      }
        
    });
  };

  useEffect(() => {
    setSort("priceLowToHigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // fetch of list of product
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  // console.log("The Product", productList);
  // console.log(
  //   "The filter",
  //   filters,
  //   "The param will be",
  //   SearchParams,
  //   "ths sort also",
  //   sort
  // );
  // console.log("Details", productDetails);
  // console.log('cartItems',cartItems);

  useEffect(() => {
    if (productDetails !== null) setopenDetailsDialog(true);
  }, [productDetails]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg  shadow-sm">
        <div className="p-4 border-b  flex items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Product</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground ">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItems) => (
                    <DropdownMenuRadioItem
                      value={sortItems.id}
                      key={sortItems.id}
                    >
                      {sortItems.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItems) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItems}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialogue
        open={openDetailsDialog}
        setOpen={setopenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShopingListing;
