"use client";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  query,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [items, setitem] = useState([
    // { name: "Coffe", price: 800 },
    // { name: "movie", price: 1800 },
    // { name: "sweets", price: 600 },
  ]);

  const [newitem, setnewitem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);
  const additem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newitem.name !== "" && newitem.price !== "") {
      // setitem([...items, newitem]);
      await addDoc(collection(db, "items"), {
        name: newitem.name.trim(),
        price: newitem.price,
      });
      setnewitem({ name: "", price: "" });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsuscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsarr = [];

      QuerySnapshot.forEach((doc) => {
        itemsarr.push({ ...doc.data(), id: doc.id });
      });
      setitem(itemsarr);
      //read total from the items array as we already readed the db

      const caltotal = () => {
        const totalprice = itemsarr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );

        setTotal(totalprice);
      };
      caltotal();
      return () => unsuscribe();
    });
  }, []);
  //delete item

  const deleteitem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <div>
      <div className=" bg-slate-800 w-full p-4 rounded-lg ">
        <div className=" flex items-center gap-10">
          <input
            value={newitem.name}
            onChange={(e) => setnewitem({ ...newitem, name: e.target.value })}
            className=" bg-white p-3 text-black rounded-lg w-[580px]"
            placeholder="Enter the name"
            type="text"
          />
          <input
            value={newitem.price}
            onChange={(e) => setnewitem({ ...newitem, price: e.target.value })}
            className=" bg-white p-3 text-black rounded-lg w-96"
            placeholder="Enter the price in ₹"
            type="number"
          />
          <button
            type="submit"
            onClick={additem}
            className=" bg-slate-900 hover:bg-slate-950 transition w-28 p-3 rounded-lg"
          >
            +
          </button>
        </div>

        <div>
          {items.map((item, id) => (
            <div
              key={id}
              className=" my-4 w-full bg-slate-950 flex justify-between rounded-lg"
            >
              <div className=" flex justify-between w-full p-4 font-serif">
                <span className=" capitalize">{item.name}</span>
                <span>₹{item.price}</span>
              </div>
              <button
                onClick={() => deleteitem(item.id)}
                className=" p-4 hover:bg-slate-900 hover:rounded-lg 
                border-l-2 border-slate-900 hover:scale-110 transition"
              >
                -
              </button>
            </div>
          ))}
        </div>
        {items.length < 1 ? (
          ""
        ) : (
          <div className=" p-4 flex justify-between font-serif">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}
      </div>
    </div>
  );
}
