import React, { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { selectItems } from "../slices/cartSlice";
import { useSelector } from "react-redux";

export const Header = ({ categories, products }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions] = useState([
    ...categories,
    ...products.map((product) => product.title),
  ]);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* primary nav */}
      <div className="flex items-center bg-blue p-1 flex-grow py-2">
        {/* logo */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src={"/assets/images/logo.png"}
            width={150}
            height={80}
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => router.push("/", undefined, { shallow: true })}
          />
        </div>

        {/* search bar */}
        <div className="relative hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointe">
          <input
            placeholder="Enter category or item title..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter")
                router.push(
                  `/?queryString=${searchInput.replaceAll(/[^a-zA-Z]/g, "")}`,
                  undefined,
                  { shallow: true }
                );
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <div className=" bg-green hover:bg-green-dark h-full rounded-r-md">
            <MagnifyingGlassIcon
              onClick={() =>
                router.push(
                  `/?queryString=${searchInput.replaceAll(/[^a-zA-Z]/g, "")}`,
                  undefined,
                  { shallow: true }
                )
              }
              className="h-full p-2"
            />
          </div>
          {/* Suggestions... */}
          {searchFocused && searchInput.length > 0 && (
            <div className="absolute left-1 top-10 z-50 rounded-b-md w-1/2 max-h-60 overflow-hidden overflow-y-scroll scrollbar-hide">
              {suggestions.map((suggestion) => {
                if (
                  suggestion
                    .replaceAll(/[^a-zA-Z]/g, "")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  return (
                    <div className="cursor-pointer bg-blue p-3 hover:bg-blue-light">
                      <p
                        onMouseDown={() =>
                          router.push(
                            `/?queryString=${suggestion.replaceAll(
                              /[^a-zA-Z]/g,
                              ""
                            )}`,
                            undefined,
                            { shallow: true }
                          )
                        }
                        className="link text-green"
                      >
                        {suggestion}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* Auth */}
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign in"}</p>
            <p className="font-extrabold md:text-sm">Account</p>
          </div>
          {/* Orders */}
          <div
            onClick={() =>
              session
                ? router.push("/orders", undefined, { shallow: true })
                : alert("Please login to see your orders")
            }
            className="link"
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          {/* Cart */}
          <div
            className="relative link flex items-center"
            onClick={() =>
              router.push("/checkout", undefined, { shallow: true })
            }
          >
            <span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-green text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* secondary nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-light text-white text-sm">
        <Bars3Icon className="h-6 mr-1 link" />
        {categories?.map((category) => (
          <p
            onClick={() =>
              router.push(
                `/?queryString=${category.replaceAll(/[^a-zA-Z]/g, "")}`,
                undefined,
                { shallow: true }
              )
            }
            className="link"
          >
            {category}
          </p>
        ))}
      </div>
    </header>
  );
};
