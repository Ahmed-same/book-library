/* Waraq Library — book data */

const SECTIONS = [
  { id: "literature", name: "Literature", blurb: "Novels that stayed" },
  { id: "children",   name: "Children",   blurb: "First books, best books" },
  { id: "adventure",  name: "Adventure & Sci-Fi", blurb: "Sea voyages and time travel" },
  { id: "poetry",     name: "Poetry & Folklore", blurb: "Verse and old stories" }
];

const BOOKS = [
  {
    slug: "pride-and-prejudice", title: "Pride and Prejudice", author: "Jane Austen", year: 1813,
    section: "literature", price: 240, pages: 432, rating: 4.8, copies: 3, borrow: true,
    shelf: "LIT-014", image: "images/pride-and-prejudice.jpg",
    desc: "Elizabeth Bennet has a sharp tongue and no patience for pride; Mr. Darcy has both, and a fortune. Austen's comedy of manners about first impressions that turn out to be wrong."
  },
  {
    slug: "great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925,
    section: "literature", price: 210, pages: 180, rating: 4.6, copies: 2, borrow: true,
    shelf: "LIT-021", image: "images/great-gatsby.jpg",
    desc: "A mysterious millionaire throws parties across the bay from the woman he lost. Fitzgerald's short, glittering novel about the price of reinventing yourself."
  },
  {
    slug: "little-women", title: "Little Women", author: "Louisa May Alcott", year: 1868,
    section: "literature", price: 260, pages: 512, rating: 4.8, copies: 4, borrow: true,
    shelf: "LIT-007", image: "images/little-women.jpg",
    desc: "Four sisters grow up in wartime New England with little money and a lot of imagination. A warm, stubborn book about work, art and family."
  },
  {
    slug: "sherlock-holmes", title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle", year: 1892,
    section: "literature", price: 230, pages: 307, rating: 4.7, copies: 3, borrow: true,
    shelf: "LIT-033", image: "images/sherlock-holmes.jpg",
    desc: "Twelve cases from Baker Street, told by Dr. Watson. The collection that fixed the shape of detective fiction."
  },
  {
    slug: "dracula", title: "Dracula", author: "Bram Stoker", year: 1897,
    section: "literature", price: 245, pages: 418, rating: 4.5, copies: 1, borrow: true,
    shelf: "LIT-041", image: "images/dracula.jpg",
    desc: "A young solicitor travels to Transylvania and does not come back the same. Stoker's novel in letters and diaries built the modern vampire."
  },
  {
    slug: "alice", title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", year: 1865,
    section: "children", price: 190, pages: 192, rating: 4.6, copies: 5, borrow: true,
    shelf: "CHI-003", image: "images/alice.jpg",
    desc: "A girl follows a rabbit down a hole and finds a world with its own rules of logic. Written for children, quoted by everyone."
  },
  {
    slug: "wizard-of-oz", title: "The Wonderful Wizard of Oz", author: "L. Frank Baum", year: 1900,
    section: "children", price: 185, pages: 156, rating: 4.4, copies: 4, borrow: true,
    shelf: "CHI-011", image: "images/wizard-of-oz.jpg",
    desc: "A cyclone carries Dorothy to a country of talking beasts and a wizard who may not exist. The first great American fairy tale."
  },
  {
    slug: "treasure-island", title: "Treasure Island", author: "Robert Louis Stevenson", year: 1883,
    section: "adventure", price: 220, pages: 292, rating: 4.7, copies: 2, borrow: true,
    shelf: "ADV-006", image: "images/treasure-island.jpg",
    desc: "A map, a one-legged cook, and a voyage that turns into a mutiny. Stevenson's adventure set the template for every pirate story since."
  },
  {
    slug: "twenty-thousand-leagues", title: "Twenty Thousand Leagues Under the Seas", author: "Jules Verne", year: 1870,
    section: "adventure", price: 235, pages: 368, rating: 4.5, copies: 3, borrow: false,
    shelf: "ADV-019", image: "images/twenty-thousand-leagues.jpg",
    desc: "Captain Nemo takes three captives around the world in a submarine, decades before submarines were real. Verne's catalogue of the ocean and its wonders."
  },
  {
    slug: "time-machine", title: "The Time Machine", author: "H. G. Wells", year: 1895,
    section: "adventure", price: 175, pages: 118, rating: 4.3, copies: 4, borrow: true,
    shelf: "ADV-024", image: "images/time-machine.jpg",
    desc: "A Victorian inventor travels to the year 802,701 and finds what is left of humanity. Wells invented the time-travel story here."
  },
  {
    slug: "rubaiyat", title: "Rubáiyát of Omar Khayyám", author: "Omar Khayyám", year: 1859,
    section: "poetry", price: 200, pages: 128, rating: 4.6, copies: 2, borrow: true,
    shelf: "POE-002", image: "images/rubaiyat.jpg",
    desc: "Quatrains on wine, fate and the passing hour, freely translated by Edward FitzGerald. The poem that made a Persian astronomer famous in English."
  },
  {
    slug: "arabian-nights", title: "The Book of the Thousand Nights and a Night", author: "Anonymous · trans. Richard F. Burton", year: 1885,
    section: "poetry", price: 320, pages: 640, rating: 4.8, copies: 1, borrow: false,
    shelf: "POE-009", image: "images/arabian-nights.jpg",
    desc: "Scheherazade tells stories to stay alive, and the stories nest inside each other. Burton's translation of the Arabian Nights, in one volume."
  }
];
