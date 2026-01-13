import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./LoaderPage";
import { Download } from "lucide-react";

const Cards = () => {
  const [data, setData] = useState([]);
  const [idx, setIdx] = useState(3);
  const [loading, setLoading] = useState(false);

  function Dec() {
    if (idx > 3) setIdx(idx - 1);
  }

  function Inc() {
    setIdx(idx + 1);
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${idx}&limit=20`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idx]);

  return (
    <div className="w-full px-4 py-10">

      {loading && (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {!loading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="relative shadow-custom border-2 border-white  overflow-hidden h-[250px]"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="w-full h-full object-cover"
              />

              <a
                href={item.download_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="absolute bottom-2 right-2 bg-black/50 
                           text-white w-10 h-10 flex items-center 
                           justify-center rounded-full hover:scale-95 
                           transition-transform"
                title="Download"
              >
                <Download size={20} />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div
        className="mt-10 flex flex-col sm:flex-row items-center 
                      justify-center gap-4"
      >
        <button
          className="active:scale-95 text-lg w-[180px] sm:w-[200px] 
                     shadow-btn rounded p-2 bg-white"
          onClick={Dec}
        >
          Prev
        </button>

        <h3 className="text-black text-lg sm:text-xl">Page {idx - 2}</h3>

        <button
          className="active:scale-95 text-lg w-[180px] sm:w-[200px] 
                     shadow-btn rounded p-2 bg-white"
          onClick={Inc}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;
