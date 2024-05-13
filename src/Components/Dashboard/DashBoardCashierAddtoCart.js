import { useEffect, useState } from "react";
import axios from "axios";
import { MinusIcon, PlusIcon, ShoppingBasketIcon } from "lucide-react";

function DashBoardCashierAddtoCart({ selectedProductIds }) {
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  const fetchProducts = async () => {
    try {
      if (selectedProductIds.length === 0) {
        setProducts([]); // Reset products if no product is selected
        return;
      }

      const productRequests = selectedProductIds.map((productId) =>
        axios.get(`http://localhost:8080/viewProduct/${productId}`)
      );

      const responses = await Promise.all(productRequests);

      const productsData = responses.map((res) => res.data);

      // Initialize product quantities with default value of 0
      const initialProductQuantities = selectedProductIds.reduce(
        (acc, productId) => {
          acc[productId] = 1;
          return acc;
        },
        {}
      );

      setProducts(productsData);
      setProductQuantities(initialProductQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedProductIds]);

  const handleInput = async (e, productId) => {
    const quantity = parseInt(e.target.value);
    setProductQuantities({ ...productQuantities, [productId]: quantity });
  };

  const handleMinus = (productId) => {
    const currentQuantity = productQuantities[productId];
    if (currentQuantity > 1) {
      setProductQuantities({
        ...productQuantities,
        [productId]: currentQuantity - 1,
      });
    }
  };

  const handlePlus = (productId) => {
    const currentQuantity = productQuantities[productId];
    setProductQuantities({
      ...productQuantities,
      [productId]: currentQuantity + 1,
    });
  };

  return (
    <>
      <div className="shadow-lg border-solid border-2 border-lime-700 pt-1 px-2 pb-5 h-fit mt-5">
        <h2 className="text-center">Add to Cart</h2>

        {products.length > 0 ? (
          <div>
            <table className="w-full add-cart">
              <thead>
                <tr>
                  <th className="text-center pb-3">Item</th>
                  <th className="text-center pb-3">Quantity</th>
                  <th className="text-center pb-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="text-center uppercase font-semibold">
                    <td>{product.prod_name}</td>
                    <td className="counter flex gap-2 justify-center">
                      <button
                        className="bg-red-500 hover:bg-[#a93737] text-white px-1"
                        onClick={() => handleMinus(product.prod_id)}>
                        <MinusIcon />
                      </button>
                      <input
                        className="w-10 border-2 border-solid border-slate-400 text-center"
                        value={productQuantities[product.prod_id]}
                        onChange={(e) =>
                          handleInput(e, product.prod_id)
                        }></input>
                      <button
                        className="bg-blue-500 hover:bg-[#2e5491]  text-white px-1"
                        onClick={() => handlePlus(product.prod_id)}>
                        <PlusIcon />
                      </button>
                    </td>
                    <td>
                      P{product.prod_price} x{" "}
                      {productQuantities[product.prod_id]}
                      <span className="px-2">=</span>
                      {(
                        product.prod_price * productQuantities[product.prod_id]
                      ).toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full uppercase flex justify-center gap-2">
                <ShoppingBasketIcon />
                Placed Order
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-3xl italic opacity-40">
              No Order Yet. . .
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default DashBoardCashierAddtoCart;
