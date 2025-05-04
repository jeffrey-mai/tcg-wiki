import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

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
  return (
    <div className="h-[85vh] flex justify-center items-center mt-[24px] mr-[24px] pb-[24px]">
      <div className="grid grid-cols-5 h-full w-7/10 mr-5 ml-[24px] px-[10px] pt-1 border border-white overflow-y-auto">
        {cards}
      </div>
      <div className="flex flex-col justify-between h-full w-[30%] border border-white">
        <div className="max-h-[20%] p-1">
          <h2>Ride Deck</h2>
          <div className="grid grid-cols-4 h-[82%] w-full border border-white overflow-y-hidden">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto h-auto rounded-xl p-6">
              <CardItem translateZ="100" className="w-full">
                <Image
                    src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png"
                    height="300"
                    width="50"
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
                    src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png"
                    height="300"
                    width="50"
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
                    src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png"
                    height="300"
                    width="50"
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
                    src="https://en.cf-vanguard.com/wordpress/wp-content/images/cardlist/dzbt07/dzbt07_001.png"
                    height="300"
                    width="50"
                    className="w-auto h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
        <div className="max-h-[40%] p-1">
          <h2>Main Deck |# Grade 3, # Grade 2, # Grade 1, # Grade 0|</h2>
          <div className="grid grid-cols-3 h-[90%] w-full pt-1 border border-white overflow-y-auto overflow-x-hidden">
            {/* MAKE NEW SET OF CARDS FOR MAIN DECK */}
            {cards}
          </div>
        </div>
        <div className="max-h-[40%] p-1">
          <h2>Extra Deck</h2>
          <div className="grid grid-cols-3 h-[90%] w-full pt-1 border border-white overflow-y-auto overflow-x-hidden">
            {/* MAKE NEW SET OF CARDS FOR Extra DECK */}
            {cards}
          </div>
        </div>
      </div>
    </div>
  )
}