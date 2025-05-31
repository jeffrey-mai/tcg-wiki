"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Cards, DeckInfo } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<Cards>();
  const [showPopup, setShowPopup] = useState(false);
  const [PopupPos, setPopupPos] = useState({ top: 0, left: 0});
  const popupRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session } = useSession();
  const [searchResult, setSearchResult] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [cards, setCards] = useState<Cards[]>();
  const [currentDeck, setCurrentDeck] = useState<{ name: string, list: Cards[], info: DeckInfo }>({ name: "", list: [], info: { version: "Standard", nation: "null", total_cards: 0, grade_4: 0, grade_3: 0, grade_2: 0, grade_1: 0, grade_0: 0, rideDeck: [], dupes: {} }});
  const [decks, setDecks] = useState<{ [key: string]: Cards[]}>({});
  const [newDeckName, setNewDeckName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("ride");
  const [refetch, setRefetch] = useState(false);

  const handleMouseEnter = (card: Cards) => {
    setHoveredCard(card);
    timeoutRef.current = setTimeout(() => {
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

    if(left + popupWidth > vw) left = e.clientX - popupWidth - offsetX; // stops clipping
    if(top + popupHeight > vh) top = e.clientY - popupHeight - offsetY;

    setPopupPos({ top, left });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input.trim() !== ""){
      setSearchResult(input);
    }
  };

  const handleCancelSearch = () => {
    setSearchResult("");
  };

  const handleAddCard = (card: Cards) => {
    setCurrentDeck((prev) => {
      if(prev.info.total_cards >= 50) return prev;
      const temp = { ...prev };

      if(activeTab === "ride"){
        if(temp.info.rideDeck.length < 4){
          temp.info.rideDeck = [...(temp.info.rideDeck || []), card];
          temp.info.total_cards += 1;
          switch (card.grade) {
          case 4: temp.info.grade_4 += 1; break;
          case 3: temp.info.grade_3 += 1; break;
          case 2: temp.info.grade_2 += 1; break;
          case 1: temp.info.grade_1 += 1; break;
          case 0: temp.info.grade_0 += 1; break;
          }
        }
        return temp;
      }

      if(prev.info.dupes[card.name] !== 4){
        temp.list = [...(temp.list || []), card];
        temp.info.total_cards += 1;
        switch (card.grade) {
        case 4: temp.info.grade_4 += 1; break;
        case 3: temp.info.grade_3 += 1; break;
        case 2: temp.info.grade_2 += 1; break;
        case 1: temp.info.grade_1 += 1; break;
        case 0: temp.info.grade_0 += 1; break;
        }
  
        if(temp.info.dupes[card.name]) temp.info.dupes[card.name] += 1;
        else temp.info.dupes[card.name] = 1;
        return temp;
      }
      return prev;
    })
  }

  const handleRemoveCard = (card: Cards) => {
    setCurrentDeck((prev) => {
      const temp = { ...prev };
      if(activeTab !== "ride") temp.list = temp.list.filter(ele => ele !== card);
      else temp.info.rideDeck = temp.info.rideDeck.filter(ele => ele !== card);
      temp.info.total_cards -= 1;
      switch (card.grade) {
        case 4: temp.info.grade_4 -= 1; break;
        case 3: temp.info.grade_3 -= 1; break;
        case 2: temp.info.grade_2 -= 1; break;
        case 1: temp.info.grade_1 -= 1; break;
        case 0: temp.info.grade_0 -= 1; break;
      }

      if(temp.info.dupes[card.name] > 1) temp.info.dupes[card.name] -= 1;
      else delete temp.info.dupes[card.name];

      return temp;
    })
  }

  const handleChooseDeck = (deck: string) => {
    setCurrentDeck(prev => ({
      ...prev,
      name: deck,
      list: decks[deck]
    }))
  }

  const handleSaveDeck = async () => {
    try {
      const res = await fetch("/api/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, deck: currentDeck, action: "handleSaveDeck" })
      });
      const data = await res.json();
      console.log(data);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Failed to create new deck:", error);
    }
  }
  
  const handleSaveDeckName = async () => {
    setIsEditing(false);
    if(currentDeck.name !== newDeckName){
      try {
        const res = await fetch("/api/users", {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentDeck: currentDeck.name, newDeckName: newDeckName, email: session?.user?.email })
        });
        const data = await res.json();
        setDecks(prev => {
          const temp = prev[currentDeck.name];
          const newDecks = { ...prev };
          delete newDecks[currentDeck.name];
          newDecks[newDeckName] = temp;
          return newDecks;
        })
        setCurrentDeck((prev) => ({
          ...prev,
          name: newDeckName
        }))
        return data;
      } catch (error) {
        console.error("Failed to change deck name:", error);
      }
    } else {
      console.log("No changes to deck name");
    }
  }

  const handleCreateDeck = async () => {
    try {
      const res = await fetch("/api/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, action: "handleCreateDeck" })
      });
      const data = await res.json();
      const decks = data.deckList.rows[0].decks.cardfight_vanguard;
      setDecks(decks);
      setCurrentDeck(prev => ({
        ...prev,
        name: data.newDeck,
        list: [] as Cards[]
      }));
    } catch (error) {
      console.error("Failed to create new deck:", error);
    }
  }

  const handleDeleteDeck = async () => {
    try {
      const res = await fetch("/api/users", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, deckName: currentDeck.name })
      });
      const data = await res.json();
      setDecks(data.rows[0].decks.cardfight_vanguard);
      setCurrentDeck(prev => ({
        ...prev,
        name: Object.keys(data.rows[0].decks.cardfight_vanguard)[0],
        list: Object.values(data.rows[0].decks.cardfight_vanguard)[0] as Cards[]
      }));
    } catch (error) {
      console.error("Failed to create new deck:", error);
    }
  }

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
    const fetchUserDecks = async () => {
      if(session){
        try {
          const res = await fetch(`/api/users/${session.user?.email}`);
          const data = await res.json();
          setDecks(data[0].decks.cardfight_vanguard);
          setCurrentDeck(prev => {
            const temp = { ...prev };
            temp.name = Object.keys(data[0].decks.cardfight_vanguard)[0];
            temp.list = Object.values(data[0].decks.cardfight_vanguard)[0] as Cards[];
            for(const card of Object.values(data[0].decks.cardfight_vanguard)[0] as Cards[]){
              temp.info.total_cards += 1;
              switch(card.grade){
                case 4:
                  temp.info.grade_4 += 1;
                  break;
                case 3:
                  temp.info.grade_3 += 1;
                  break;
                case 2:
                  temp.info.grade_2 += 1;
                  break;
                case 1:
                  temp.info.grade_1 += 1;
                  break;
                case 0:
                  temp.info.grade_0 += 1;
                  break;
              }
              if(temp.info.dupes[card.name]) temp.info.dupes[card.name] += 1;
              else temp.info.dupes[card.name] = 1;
            }
            return temp;
          });
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        }
      }
    }

    fetchUserDecks();
  }, [session, isEditing, refetch]);

  useEffect(() => {
    if(isEditing && inputRef.current) {
      setNewDeckName(currentDeck.name);
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-7/10 pl-[24px] pr-6">
          <div className="flex items-center w-[97%] ml-8">
            <PlaceholdersAndVanishInput
              placeholders={["Search for any card!"]}
              onChange={handleInputChange}
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
        <button 
          className="mr-[24px] bg-white text-black hover:invert border-2 border-black cursor-pointer rounded-xl px-[16px] py-[4px] transition-colors ease-in-out" 
          type="submit"
          onClick={handleSaveDeck}
        >
          Save
        </button>
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
                          className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl hover:cursor-pointer"
                          alt="thumbnail"
                          onMouseEnter={() => handleMouseEnter(ele)}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                          onClick={() => handleAddCard(ele)}
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
                  onBlur={() => setDropDownStatus(false)}
                  className={`${dropDownStatus && "rounded-b-none"} flex justify-between items-center bg-white text-black w-full px-4 py-2 hover:cursor-pointer rounded-md`}
                >
                  {
                    isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={newDeckName}
                        onChange={(e) => setNewDeckName(e.target.value)}
                        onBlur={() => handleSaveDeckName()}
                        className="w-full mr-2"
                      />
                    ) : (
                      <p>{currentDeck.name}</p>
                    )
                  }
                  {
                    dropDownStatus ? 
                      <Image className="rotate-180" src="/up-arrow.png" height="15" width="15" alt="up-arrow logo" />
                    :
                      <Image src="/up-arrow.png" height="15" width="15" alt="up-arrow logo" />
                  }
                </button>
                {
                  dropDownStatus && (
                    <div className="absolute mt-[40px] w-[24%] bg-white border border-t-slate-400 rounded-md rounded-t-none shadow-lg z-20">
                      <ul className="py-1 text-gray-700">
                        {
                          Object.keys(decks).map((deck, i) => {
                            return (
                              <li 
                                key={i} 
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onMouseDown={() => handleChooseDeck(deck)}
                              >
                                {deck}
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                }
              </div>
              <Image className="invert h-[20px] w-[20px] mx-1 hover:cursor-pointer" src="/editing.png" onClick={() => setIsEditing(true)} height="0" width="0" alt="edit logo" />
              <Image className="invert h-[20px] w-[20px] mr-1 hover:cursor-pointer" src="/plus.png" onClick={handleCreateDeck} height="0" width="0" alt="create logo" />
              <Image className="invert h-[20px] w-[20px] hover:cursor-pointer" src="/trash.png" onClick={handleDeleteDeck} height="0" width="0" alt="delete logo" />
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
                    <p>{currentDeck.info.total_cards} / 50</p>
                  </div>
                  <div className="flex mr-5">
                    <Image
                      src="https://i.imgur.com/vJmy5qL.png"
                      className="mr-1"
                      height="20"
                      width="20"
                      alt="deck nation"
                    />
                    <p>{currentDeck.info.nation}</p>
                  </div>
                  <div className="flex">
                    <Image
                      src="https://i.imgur.com/vJmy5qL.png"
                      className="mr-1"
                      height="20"
                      width="20"
                      alt="deck type"
                    />
                    <p>{currentDeck.info.version}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <div className="mr-8">
                    <p>Grade 3: {currentDeck.info.grade_3}</p>
                    <p>Grade 2: {currentDeck.info.grade_2}</p>
                  </div>
                  <div>
                    <p>Grade 1: {currentDeck.info.grade_1}</p>
                    <p>Grade 0: {currentDeck.info.grade_0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-[75%] max-h-[75%] p-">
            <div className="flex">
              <h2
                className={`${activeTab === "ride" ? "border-b-transparent border-white bg-cyan-200 text-black" : "hover:bg-slate-800"} border border-l-0 py-1 px-3 z-10 hover:cursor-pointer transition-colors ease-in-out rounded-tl-lg`}
                onClick={() => setActiveTab("ride")}
              >
                Ride Deck
              </h2>
              <h2
                className={`${activeTab === "main" ? "border-b-transparent border-white bg-cyan-200 text-black" : "hover:bg-slate-800"} border border-l-0 py-1 px-3 z-10 hover:cursor-pointer transition-colors ease-in-out`}
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
                activeTab === "ride" ? 
                  currentDeck.info.rideDeck.map((ele, i) => {
                    return (
                      <CardContainer key={i} className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                        <CardItem translateZ="100" className="w-full">
                          <Image
                              src={ele.image_url[0]}
                              height="300"
                              width="300"
                              className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl hover:cursor-pointer"
                              alt="thumbnail"
                              onMouseEnter={() => handleMouseEnter(ele)}
                              onMouseLeave={handleMouseLeave}
                              onMouseMove={handleMouseMove}
                              onClick={() => {
                                handleRemoveCard(ele)
                                handleMouseLeave();
                              }}
                            />
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    )
                  })
                :
                  activeTab === "main" ? 
                    currentDeck.list?.map((ele, i) => {
                      if(ele.type !== "G Unit"){
                        return (
                          <CardContainer key={i} className="inter-var">
                            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                            <CardItem translateZ="100" className="w-full">
                              <Image
                                  src={ele.image_url[0]}
                                  height="300"
                                  width="300"
                                  className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl hover:cursor-pointer"
                                  alt="thumbnail"
                                  onMouseEnter={() => handleMouseEnter(ele)}
                                  onMouseLeave={handleMouseLeave}
                                  onMouseMove={handleMouseMove}
                                  onClick={() => {
                                    handleRemoveCard(ele)
                                    handleMouseLeave();
                                  }}
                                />
                              </CardItem>
                            </CardBody>
                          </CardContainer>
                        )
                      }
                    })
                :
                  currentDeck.list?.map((ele, i) => {
                    if(ele.type == "G Unit"){
                      return (
                        <CardContainer key={i} className="inter-var">
                          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
                          <CardItem translateZ="100" className="w-full">
                            <Image
                                src={ele.image_url[0]}
                                height="300"
                                width="300"
                                className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl hover:cursor-pointer"
                                alt="thumbnail"
                                onMouseEnter={() => handleMouseEnter(ele)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                                onClick={() => {
                                  handleRemoveCard(ele)
                                  handleMouseLeave();
                                }}
                              />
                            </CardItem>
                          </CardBody>
                        </CardContainer>
                      )
                    }
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
