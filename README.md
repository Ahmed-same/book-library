# Waraq Library

A small library website: buy a book, borrow one for 14 days, browse by section.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

## What's inside

- **Home** — hero with search, three service notes, four sections, and a catalog with
  search, section filters, a borrowable-only toggle and sorting.
- **Book page** — cover, details, stock, quantity, add to cart, borrow.
- **My shelf** — the books you borrowed, with due dates and a return button.
- **Cart** — drawer with quantities, subtotal, delivery and a demo checkout.
- **About** — how borrowing works, opening hours, membership, FAQ and a request form.
- Cart and borrowings persist in `localStorage`. Layout is responsive, and the
  animations are skipped when the system asks for reduced motion.

## Run it

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Files

```
index.html      markup and page structure
css/style.css   all styles
js/data.js      the book data
js/app.js       catalog, cart, borrowing, routing
images/         book covers
```

## Cover images

The covers are photographs of the editions on the shelf, from Wikimedia Commons.
All are public domain except the one noted below.

- **pride-and-prejudice.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AAUSTEN%281894%29_Pride_and_prejudice_%2815811958311%29.jpg (author: National Library NZ on The Commons)
- **great-gatsby.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AThe_Great_Gatsby_Cover_1925_Retouched.jpg (author: Original cover illustration by Francis Cugat (1893–1981) and published)
- **little-women.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3ALittle_Women_-_cover.png (author: L. M. Alcott, May Alcott)
- **sherlock-holmes.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AAdventures_of_sherlock_holmes.jpg (author: Rtrace (upload first version)User:ΛΦΠ (upload second version))
- **dracula.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3ADracula_-_Front_Cover_1919_Edition.jpg (author: Edgar Alfred Holloway)
- **alice.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AAlice%27s_Adventures_in_Wonderland_cover_%281865%29.jpg (author: Lewis Carroll)
- **wizard-of-oz.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AThe_Wonderful_Wizard_of_Oz_first_edition_cover.jpg (author: W. W. Denslow)
- **treasure-island.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3ATreasure_Island-Scribner%27s-1911.jpg (author: N. C. Wyeth)
- **twenty-thousand-leagues.jpg** — CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File%3A1956_Cover_of_%22Twenty_Thousand_Leagues_Under_the_Seas%22.jpg (author: Back ache)
- **time-machine.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AThe_Time_Machine_%28Heinemann_text%29_-_front_cover.jpg (author: Author Herbert George Wells)
- **rubaiyat.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3ARub%C3%A1iy%C3%A1t_of_Omar_Khayy%C3%A1m_-_Cover.jpg (author: Author Omar Khayyam)
- **arabian-nights.jpg** — Public domain — https://commons.wikimedia.org/wiki/File%3AThe_Book_of_The_Thousand_Nights_and_a_Night_%28Karmashastra%2C_1885%29_%28cover%29.jpg (author: Richard Francis Burton (translator), The Karmashastra Society (publish)

Prices, opening hours, address, ratings and stock are demo data.
