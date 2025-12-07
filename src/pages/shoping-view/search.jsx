
import ProductDetailsDialogue from '@/components/shoping-view-c/product-details'
import ShoppingProductTile from '@/components/shoping-view-c/product-tileShoping'
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductDetails } from '@/store/shop/product-slice'
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const SearchPage = () => {
  const [keyword, setKeyword] = useState('')
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch();
  const {searchResults} = useSelector((state)=>state.shopSearch)
  const {productDetails} = useSelector((state)=>state.shopProducts)
  const { user } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.shopCart);
    const handleAddtoCart = (getCurrentId) => {
    // console.log(getCurrentId);
    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));

        toast.success("Product added to cart successfully");
      }
    });
  };
  useEffect(()=>{
    if(keyword && keyword.trim() !== '' &&  keyword.length > 3){
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`) )
        dispatch(getSearchResults(keyword)).then((res)=>{
          // console.log(res);          
        })
      } , 1000);
    }else{
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`) )
      dispatch(resetSearchResults())
    }

  },[keyword])

  const handleGetProductDetails = (getCurrentProductId) => {
      console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId));
    };
  useEffect(() => {
      if (productDetails !== null) setopenDetailsDialog(true);
    }, [productDetails]);
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center items-center' >
       <div className='w-full flex items-center'>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} className='py-8'
    placeholder='Search for products...'        
        />
       </div>
      </div>
      {
        !searchResults.length ?  <h1 className='text-5xl font-extrabold' >No Result Found!</h1>
        : null
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
           searchResults.map(item=> <ShoppingProductTile handleAddtoCart={handleAddtoCart} handleGetProductDetails={handleGetProductDetails} product={item} />)
        }
      </div>
      <ProductDetailsDialogue
        open={openDetailsDialog}
        setOpen={setopenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default SearchPage
