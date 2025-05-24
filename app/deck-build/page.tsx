"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Cards } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<Cards>();
  const [showPopup, setShowPopup] = useState(false);
  const [PopupPos, setPopupPos] = useState({ top: 0, left: 0});
  const popupRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (card: Cards) => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCard(card);
      setShowPopup(true);
    }, 750); // 0.75 second delay
  };

  const handleMouseLeave = () => {
    if(timeoutRef.current) clearTimeout(timeoutRef.current); // cancel delay if mouse leaves early
    setShowPopup(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const offsetX = 5; // distance between mouse and popup
    const offsetY = 5;
    const vw = window.innerWidth; // width, height of screen
    const vh = window.innerHeight;
    const popupEl = popupRef.current;
    const popupHeight = popupEl?.offsetHeight ?? 0; // dynamic width, height value of popup
    const popupWidth = popupEl?.offsetWidth ?? 0;
    let left = e.clientX + offsetX;
    let top = e.clientY + offsetY;

    if (left + popupWidth > vw) left = e.clientX - popupWidth - offsetX; // stops clipping
    if (top + popupHeight > vh) top = e.clientY - popupHeight - offsetY;

    setPopupPos({ top, left });
  }

  const [searchResult, setSearchResult] = useState("");
  const [input, setInput] = useState("");
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [cards, setCards] = useState<Cards[]>();
  const [currentDeck, setCurrentDeck] = useState("");
  const [activeTab, setActiveTab] = useState("main");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input + " submitted");
    if(input !== ""){
      setSearchResult(input);
    }
  };

  const handleCancelSearch = () => {
    setSearchResult("");
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    }

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchSearchCards = async () => {
      try {
        const res = await fetch(`/api/cards/${searchResult}`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    }

    fetchSearchCards();
  }, [searchResult]);

  return (
    <div className="flex flex-col justify-center mt-[24px] w-full">
      {showPopup && (
        <div
          ref={popupRef}
          className="fixed w-[30%] z-50 p-2 bg-gray-800 text-white rounded shadow-lg text-sm pointer-events-none"
          style={{ top: PopupPos.top + 10, left: PopupPos.left + 10 }}
        >
          {
            hoveredCard ? 
              (
                <>
                  <h2 className="text-center font-bold mb-1">{hoveredCard.name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: hoveredCard.effect }} />
                  <p>{hoveredCard.power}</p>
                  <p>{hoveredCard.grade}</p>
                  <p>{hoveredCard.nation}</p>
                </>
              )
            :
              null
          }
        </div>
      )}
      <div className="flex justify-between items-center w-7/10 pl-[24px] pr-6">
        <div className="flex items-center w-[97%] ml-8">
          <PlaceholdersAndVanishInput
            placeholders={["Search for any card!"]}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          {
            searchResult !== "" ? 
              <div className="flex items-center justify-between w-full">
                <p className="text-white whitespace-nowrap overflow-hidden">
                  Current search: {searchResult}
                </p>
                <p 
                  className="px-1 mr-2 text-lg text-zinc-400 cursor-pointer hover:text-white transition-colors duration-300"
                  onClick={handleCancelSearch}
                >
                  x
                </p>
              </div>
              : 
              <></>
          }
        </div>
        <Image
          src={"https://cdn-icons-png.flaticon.com/512/107/107799.png"}
          className="invert cursor-pointer"
          width="20"
          height="20"
          alt="filter logo"
        />
      </div>
      <div className="h-[85vh] flex justify-center items-center mt-[10px] mr-[24px] pb-[24px]">
        <div className="grid grid-cols-5 h-full w-7/10 mr-5 ml-[24px] px-[10px] pt-1 overflow-y-auto">
          { 
            cards ?
              cards.map((ele, i) => {
                return (
                  <CardContainer key={i} className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                    <CardItem translateZ="100" className="w-full">
                      <Image
                          src={ele.image_url[0]}
                          height="300"
                          width="300"
                          className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                          onMouseEnter={() => handleMouseEnter(ele)}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                )
              })
            :
              null
          }
        </div>
        <div className="flex flex-col justify-between h-full w-[30%] border border-white rounded-lg">
          <div className="flex flex-col min-h-[25%] p-1">
            <div className="flex justify-between items-center">
              <div className="flex w-[84%] text-left">
                <button
                  onClick={() => setDropDownStatus(!dropDownStatus)}
                  className={`${dropDownStatus && "rounded-b-none"} flex justify-between items-center bg-white text-black w-full px-4 py-2 hover:cursor-pointer rounded-md`}
                >
                  <p>Name of Deck</p>
                  {
                    dropDownStatus ? 
                      <Image className="rotate-180" src="/up-arrow.png" height="15" width="15" alt="up-arrow logo" />
                    :
                      <Image src="/up-arrow.png" height="15" width="15" alt="up-arrow logo" />
                  }
                </button>
                {dropDownStatus && (
                <div className="absolute mt-[40px] w-[24%] bg-white border border-t-slate-400 rounded-md rounded-t-none shadow-lg z-20">
                    <ul className="py-1 text-gray-700">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Deck 1</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Deck 2</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Deck 3</li>
                    </ul>
                  </div>
                )}
              </div>
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer mx-1" src="/editing.png" height="0" width="0" alt="edit logo" />
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer mr-1" src="/plus.png" height="0" width="0" alt="create logo" />
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer" src="/trash.png" height="0" width="0" alt="delete logo" />
            </div>
            <div className="flex justify-center items-center h-full">
              <Image
                src="https://i.pinimg.com/736x/08/ba/26/08ba262620529e7917d9fd9d3dfd3186.jpg"
                className="mr-5"
                height="100"
                width="60"
                alt="deck logo"
              />
              <div className="flex flex-col justify-center items-center">
                <div className="flex text-base">
                  <div className="flex mr-3">
                    <Image
                      src="https://i.imgur.com/vJmy5qL.png"
                      className="mr-1"
                      height="20"
                      width="20"
                      alt="deck size"
                    />
                    <p>10 / 50</p>
                  </div>
                  <div className="flex mr-5">
                    <Image
                      src="https://i.imgur.com/vJmy5qL.png"
                      className="mr-1"
                      height="20"
                      width="20"
                      alt="deck nation"
                    />
                    <p>(Nation)</p>
                  </div>
                  <div className="flex">
                    <Image
                      src="https://i.imgur.com/vJmy5qL.png"
                      className="mr-1"
                      height="20"
                      width="20"
                      alt="deck type"
                    />
                    <p>(Standard)</p>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <div className="mr-8">
                    <p>Grade 3: 0</p>
                    <p>Grade 2: 0</p>
                  </div>
                  <div>
                    <p>Grade 1: 0</p>
                    <p>Grade 0: 0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-[75%] max-h-[75%] p-">
            <div className="flex">
              <h2
                className={`${activeTab === "main" ? "border-b-transparent border-white bg-cyan-200 text-black" : "hover:bg-slate-800"} border border-l-0 py-1 px-3 z-10 hover:cursor-pointer transition-colors ease-in-out rounded-tl-lg`}
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
            <div className="-mt-px grid grid-cols-3 h-full w-full pt-1 border-t-1 border-white rounded-b-lg overflow-y-auto overflow-x-hidden">
              {
                activeTab === "main" ? 
                  (<>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_004.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_004.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                      <CardItem translateZ="100" className="w-full">
                        <Image
                            src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_004.png"
                            height="300"
                            width="300"
                            className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </>)
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
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
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
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
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
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
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
                            onMouseEnter={() => setShowPopup(true)}
                            onMouseLeave={() => setShowPopup(false)}
                            onMouseMove={handleMouseMove}
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
