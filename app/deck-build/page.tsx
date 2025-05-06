"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const cards = [
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png",
    "https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png"
  ].map((ele, i) => {
    return (
      <CardContainer key={i} className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
        <CardItem translateZ="100" className="w-full">
          <Image
              src={ele}
              height="300"
              width="300"
              className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    )
  })

  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input + " submitted");
  };

  return (
    <div className="flex flex-col justify-center mt-[24px]">
      <div className="flex justify-between items-center w-7/10 pl-[24px] pr-6">
        <PlaceholdersAndVanishInput
          placeholders={["Search for any card!"]}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <Image
          className="invert cursor-pointer"
          src={"https://cdn-icons-png.flaticon.com/512/107/107799.png"}
          width="20" 
          height="20" 
          alt="logo"
        />
      </div>
      <div className="h-[85vh] flex justify-center items-center mt-[10px] mr-[24px] pb-[24px]">
        <div className="grid grid-cols-5 h-full w-7/10 mr-5 ml-[24px] px-[10px] pt-1 border border-white overflow-y-auto">
          {cards}
        </div>
        <div className="flex flex-col justify-between h-full w-[30%] border border-white">
          <div className="max-h-[20%] p-1">
            <div className="flex justify-between items-center">
              <div className="w-[88%] text-left">
                <button
                  onClick={() => setDropDownStatus(!dropDownStatus)}
                  className="flex justify-between items-center bg-white text-black w-full px-4 py-2 hover:cursor-pointer rounded-md"
                >
                  <p>Name of Deck</p>
                  {
                    dropDownStatus ? 
                      <Image className="rotate-180" src="/up-arrow.png" height="20" width="20" alt="up-arrow logo" />
                    :
                      <Image src="/up-arrow.png" height="20" width="20" alt="up-arrow logo" />
                  }
                </button>
                {dropDownStatus && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                    <ul className="py-1 text-gray-700">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
                    </ul>
                  </div>
                )}
              </div>
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer mx-1" src="/editing.png" height="0" width="0" alt="edit logo" />
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer" src="/plus.png" height="0" width="0" alt="create logo" />
            </div>
            <div>
              <Image
                src="https://i.imgur.com/vJmy5qL.png"
                height="70"
                width="70"
                alt="deck logo"
              />
            </div>
          </div>
          <div className="flex flex-col min-h-[80%] max-h-[80%] p-1">
            <div className="flex">
              <h2
                className={`${activeTab === "main" ? "border-b-transparent border-white bg-cyan-200 text-black" : "hover:bg-slate-800"} border py-1 px-3 z-10 hover:cursor-pointer transition-colors ease-in-out rounded-tl-lg`}
                onClick={() => setActiveTab("main")}
              >
                Main Deck
              </h2>
              <h2
                className={`${activeTab === "extra" ? "border-b-transparent border-white bg-cyan-200 text-black" : "hover:bg-slate-800"} border border-l-0 py-1 px-3 hover:cursor-pointer transition-colors ease-in-out rounded-tr-lg`}
                onClick={() => setActiveTab("extra")}
              >
                Extra Deck
              </h2>
            </div>
            <div className="-mt-px grid grid-cols-3 h-full w-full pt-1 border border-white overflow-y-auto overflow-x-hidden">
              {
                activeTab === "main" ? 
                  cards
                :
                  (<>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_sec05.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_sec05.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_sec05.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_sec05.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
