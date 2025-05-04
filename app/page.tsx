"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";

export default function Home() {
  const images: string[] = [
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    // one piece, vanguard, pokemon, yugioh, weiss; below are repeated imgs
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
    "https://cdn.shopify.com/s/files/1/1098/5414/files/one_piece_tcg_3_1024x1024.jpg?v=1733206042",
    "https://images.start.gg/images/tournament/210459/image-a0223aec00085289d03cc8934236c921.jpg?ehk=CX6O2SR1hR7Gtrqu%2Byq%2F37HCyPdjfOU%2FH3npuXTKKqM%3D&ehkOptimized=aZvnXgGOAfUBgmY7dsAlBrMXkq%2BluH%2FBxB0NAStptSY%3D",
    "https://i.pinimg.com/736x/b1/2e/08/b12e082df259312980a591fc0ad5b1c3.jpg",
    "https://www.hobbycorneregypt.com/cdn/shop/collections/yu-gi-oh-648878.jpg?v=1734332899",
    "https://www.aarebogemagic.ch/wp-content/uploads/2019/10/WSTCG.jpg",

    "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/tcg-pocket/2025/01/23/01/pokemon-tcg-pocket-169-en.png",
    "https://images8.alphacoders.com/104/thumb-1920-1048955.jpg",
    "https://cardotaku.com/cdn/shop/files/WS.webp?v=1659074416&width=1200",
    "https://aura-print.com/media/wysiwyg/One-piece-tcg-starting-banner_1.jpg",
    "https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/opengraph/YGO-Speed-Duel-Character-Collage-2.jpg",
    
  ];

  return (
    <div className="flex justify-between items-center h-[95vh] w-screen p-22">
      <div className="font-sans">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-3xl mt-8 bg-gradient-to-br from-slate-300 to-white py-4 bg-clip-text text-center text-4xl tracking-tight text-transparent md:text-7xl"
          >
            Welcome to TCG Wiki
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-slate-300 text-lg max-w-xl mb-9"
          >
            Build decks, explore cards, and play any trading card game!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="bg-white text-black hover:bg-cyan-200 hover:font-medium text-lg rounded-xl py-2 px-6 transition-colors ease-in-out duration-300"
          >
            Sign up now!
          </motion.button>
        </LampContainer>
      </div>
      <div className="mx-auto max-w-4xl">
        <ThreeDMarquee images={images} />
      </div>
    </div>
  )
}
