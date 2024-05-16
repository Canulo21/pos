import { useEffect, useState } from "react";
import { ClipboardType } from "lucide-react";
import axios from "axios";

function ProductReStockReport() {
  const [isStock, setIstock] = useState(0);
  const fetchAllProducts = async () => {
    const res = await axios.get("/reStock");
    const get = res.data.length;
    setIstock(get);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="bg-slate-50 py-2 px-5 shadow-lg relative dashboard-icon text-center">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <ClipboardType size={50} color="#2463b3" />
          <p className="text-5xl font-semibold drop-shadow-sm">{isStock}</p>
        </div>
        <p className="text-sm text-slate-400 font-medium">
          Products Need to Re-stock
        </p>
      </div>
    </>
  );
}

export default ProductReStockReport;
