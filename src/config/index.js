export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductElement = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter product title",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { label: "Men", id: "men" },
      { label: "Women", id: "women" },
      { label: "Kids", id: "kids" },
      { label: "Accessories", id: "accessories" },
      { label: "Footwear", id: "footwear" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    options: [
      { label: "Nike", id: "nike" },
      { label: "Adidas", id: "adidas" },
      { label: "Puma", id: "puma" },
      { label: "Levi's", id: "levis" },
      { label: "Zara", id: "zara" },
      { label: "H&M", id: "hm" },
    ],
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter original price",
    componentType: "input",
    type: "number",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter discounted price",
    componentType: "input",
    type: "number",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    placeholder: "Enter available stock",
    componentType: "input",
    type: "number",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};
export const brandOptionMap = {
  nike: "Nike",
  women: "Women",
  adidas: "Adidas",
  puma: "Puma",
  levis: "Levi's",
  zara: "Zara",
  hm: "H&M",
};

export const productFilterOptions = {
  category: [
    { label: "Men", id: "men" },
    { label: "Women", id: "women" },
    { label: "Kids", id: "kids" },
    { label: "Accessories", id: "accessories" },
    { label: "Footwear", id: "footwear" },
  ],

  brand: [
    { label: "Nike", id: "nike" },
    { label: "Adidas", id: "adidas" },
    { label: "Puma", id: "puma" },
    { label: "Levi's", id: "levis" },
    { label: "Zara", id: "zara" },
    { label: "H&M", id: "hm" },
  ],
};

export const sortOptions = [
  { id: "priceLowToHigh", label: "Price: Low to High" },
  { id: "priceHighToLow", label: "Price: High to Low" },
  { id: "titleAToZ", label: "Title: A to Z" },
  { id: "titleZToA", label: "Title: Z to A" },
];


export const addressForm = [
  {
    name: "address",
    label: "Address",
    placeholder: "House No, Street...",
    component: "input",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "City Name",
    component: "input",
    type: "text",
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "6-digit pincode",
    component: "input",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "9876543210",
    component: "input",
    type: "text",
  },
  {
    name: "notes",
    label: "Notes",
    placeholder: "Delivery instructions...",
    component: "textarea",
    type: "text",
  }
];
