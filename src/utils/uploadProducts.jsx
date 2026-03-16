import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { productsData } from "../assets/assets_frontend/assets";

export const uploadProducts = async () => {

  for (const product of productsData) {

    await setDoc(doc(db, "products", product._id), {
      name: product.name,
      price: product.price,
      category: product.category,
      rating: product.rating,
      quantity: 10
    });

  }

  console.log("Products uploaded to Firestore");

};