const STORE_PRODUCTS_KEY = 'storeProducts';
const STORE_STOCK_KEY = 'productStock';

// Default product catalog (used when localStorage is empty)
const STORE_PRODUCTS = [
                                // Plants - 21 unique products
                                { id: 1901, name: 'Snake Plant', price: 299, image: 'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg', description: 'Low-maintenance indoor snake plant.', category: 'Plants', stock: 20 },
                                { id: 1902, name: 'Money Plant', price: 250, image: 'https://images.pexels.com/photos/17465234/pexels-photo-17465234.jpeg', description: 'Easy-to-grow money plant.', category: 'Plants', stock: 20 },
                                { id: 1903, name: 'Aloe Vera', price: 220, image: 'https://images.pexels.com/photos/2409038/pexels-photo-2409038.jpeg', description: 'Aloe vera plant for health.', category: 'Plants', stock: 20 },
                                { id: 1904, name: 'Peace Lily', price: 320, image: 'https://images.pexels.com/photos/2445890/pexels-photo-2445890.jpeg', description: 'Peace lily for air purification.', category: 'Plants', stock: 20 },
                                { id: 1905, name: 'Spider Plant', price: 210, image: 'https://images.pexels.com/photos/2609107/pexels-photo-2609107.jpeg', description: 'Spider plant for hanging baskets.', category: 'Plants', stock: 20 },
                                { id: 1906, name: 'Bamboo Plant', price: 350, image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg', description: 'Lucky bamboo plant.', category: 'Plants', stock: 20 },
                                { id: 1907, name: 'Succulent Set', price: 399, image: 'https://images.pexels.com/photos/1334146/pexels-photo-1334146.jpeg', description: 'Set of assorted succulents.', category: 'Plants', stock: 20 },
                                { id: 1908, name: 'Cactus Pot', price: 180, image: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg', description: 'Mini cactus in a pot.', category: 'Plants', stock: 20 },
                                { id: 1909, name: 'Rose Plant', price: 270, image: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg', description: 'Rose plant for garden.', category: 'Plants', stock: 20 },
                                { id: 1910, name: 'Tulsi Plant', price: 200, image: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg', description: 'Holy basil (Tulsi) plant.', category: 'Plants', stock: 20 },
                                { id: 1911, name: 'Orchid Plant', price: 350, image: 'https://images.pexels.com/photos/1534925/pexels-photo-1534925.jpeg', description: 'Orchid plant for indoors.', category: 'Plants', stock: 20 },
                                { id: 1912, name: 'Lavender Plant', price: 320, image: 'https://images.pexels.com/photos/2318554/pexels-photo-2318554.jpeg', description: 'Lavender plant for fragrance.', category: 'Plants', stock: 20 },
                                { id: 1913, name: 'Jade Plant', price: 280, image: 'https://images.pexels.com/photos/2400843/pexels-photo-2400843.jpeg', description: 'Jade plant for prosperity.', category: 'Plants', stock: 20 },
                                { id: 1914, name: 'Palm Plant', price: 400, image: 'https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg', description: 'Indoor palm plant.', category: 'Plants', stock: 20 },
                                { id: 1915, name: 'Ficus Plant', price: 350, image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg', description: 'Ficus plant for home.', category: 'Plants', stock: 20 },
                                { id: 1916, name: 'Mint Plant', price: 220, image: 'https://images.pexels.com/photos/1090977/pexels-photo-1090977.jpeg', description: 'Mint plant for kitchen.', category: 'Plants', stock: 20 },
                                { id: 1917, name: 'Chili Plant', price: 240, image: 'https://images.pexels.com/photos/943907/pexels-photo-943907.jpeg', description: 'Chili plant for balcony.', category: 'Plants', stock: 20 },
                                { id: 1918, name: 'Lemon Plant', price: 300, image: 'https://images.pexels.com/photos/531731/pexels-photo-531731.jpeg', description: 'Lemon plant for garden.', category: 'Plants', stock: 20 },
                                { id: 1920, name: 'Fern Plant', price: 280, image: 'https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg', description: 'Fern plant for decoration.', category: 'Plants', stock: 20 },
                                { id: 1921, name: 'Gardenia Plant', price: 350, image: 'https://images.pexels.com/photos/1328879/pexels-photo-1328879.jpeg', description: 'Gardenia plant for garden.', category: 'Plants', stock: 20 },
                                // Soft Toys - 21 unique products
                                { id: 2001, name: 'Plush Teddy Bear', price: 299, image: 'https://i.pinimg.com/736x/8f/be/9b/8fbe9ba3fdf0d76ea1b1be989ab304c9.jpg', description: 'Soft plush teddy bear for kids.', category: 'Soft Toys', stock: 20 },
                                { id: 2002, name: 'Bunny Soft Toy', price: 250, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Cute bunny soft toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2003, name: 'Elephant Plush', price: 320, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Elephant plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2004, name: 'Dog Soft Toy', price: 270, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Dog soft toy for kids.', category: 'Soft Toys', stock: 20 },
                                { id: 2005, name: 'Cat Plush', price: 260, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Cat plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2006, name: 'Lion Soft Toy', price: 350, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Lion soft toy for children.', category: 'Soft Toys', stock: 20 },
                                { id: 2007, name: 'Dinosaur Plush', price: 320, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Dinosaur plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2008, name: 'Monkey Soft Toy', price: 280, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Monkey soft toy for fun.', category: 'Soft Toys', stock: 20 },
                                { id: 2009, name: 'Penguin Plush', price: 300, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Penguin plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2010, name: 'Bear Soft Toy', price: 299, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Bear soft toy for cuddling.', category: 'Soft Toys', stock: 20 },
                                { id: 2011, name: 'Unicorn Plush', price: 350, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Unicorn plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2012, name: 'Fox Soft Toy', price: 320, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Fox soft toy for kids.', category: 'Soft Toys', stock: 20 },
                                { id: 2013, name: 'Giraffe Plush', price: 350, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Giraffe plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2014, name: 'Horse Soft Toy', price: 320, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Horse soft toy for play.', category: 'Soft Toys', stock: 20 },
                                { id: 2015, name: 'Rabbit Plush', price: 280, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Rabbit plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2016, name: 'Tiger Soft Toy', price: 350, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Tiger soft toy for kids.', category: 'Soft Toys', stock: 20 },
                                { id: 2017, name: 'Panda Plush', price: 320, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Panda plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2018, name: 'Koala Soft Toy', price: 280, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Koala soft toy for cuddling.', category: 'Soft Toys', stock: 20 },
                                { id: 2019, name: 'Sheep Plush', price: 300, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Sheep plush toy.', category: 'Soft Toys', stock: 20 },
                                { id: 2020, name: 'Mouse Soft Toy', price: 299, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Mouse soft toy for play.', category: 'Soft Toys', stock: 20 },
                                { id: 2021, name: 'Octopus Plush', price: 350, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Octopus plush toy.', category: 'Soft Toys', stock: 20 },
                            // Jewelry - 21 unique products
                            { id: 1701, name: 'Gold Plated Necklace', price: 1200, image: 'https://i.pinimg.com/736x/8c/6d/d5/8c6dd546c6c3dd266ca87b87e8a8e884.jpg', description: 'Elegant gold plated necklace for special occasions.', category: 'Jewelry', stock: 20 },
                            { id: 1702, name: 'Silver Bracelet', price: 800, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Stylish silver bracelet.', category: 'Jewelry', stock: 20 },
                            { id: 1703, name: 'Diamond Earrings', price: 1500, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Sparkling diamond earrings.', category: 'Jewelry', stock: 20 },
                            { id: 1704, name: 'Pearl Pendant', price: 950, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Classic pearl pendant.', category: 'Jewelry', stock: 20 },
                            { id: 1705, name: 'Emerald Ring', price: 1100, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Emerald gemstone ring.', category: 'Jewelry', stock: 20 },
                            { id: 1706, name: 'Ruby Brooch', price: 900, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Ruby brooch for dresses.', category: 'Jewelry', stock: 20 },
                            { id: 1707, name: 'Sapphire Anklet', price: 850, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Sapphire anklet.', category: 'Jewelry', stock: 20 },
                            { id: 1708, name: 'Platinum Chain', price: 1300, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Platinum chain for men.', category: 'Jewelry', stock: 20 },
                            { id: 1709, name: 'Rose Gold Ring', price: 1050, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Rose gold ring.', category: 'Jewelry', stock: 20 },
                            { id: 1710, name: 'Crystal Hairpin', price: 400, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Crystal hairpin for styling.', category: 'Jewelry', stock: 20 },
                            { id: 1711, name: 'Beaded Necklace', price: 600, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Colorful beaded necklace.', category: 'Jewelry', stock: 20 },
                            { id: 1712, name: 'Charm Bracelet', price: 700, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Bracelet with charms.', category: 'Jewelry', stock: 20 },
                            { id: 1713, name: 'Stud Earrings', price: 500, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Simple stud earrings.', category: 'Jewelry', stock: 20 },
                            { id: 1714, name: 'Hoop Earrings', price: 550, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Large hoop earrings.', category: 'Jewelry', stock: 20 },
                            { id: 1715, name: 'Pendant Set', price: 800, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Pendant and earrings set.', category: 'Jewelry', stock: 20 },
                            { id: 1716, name: 'Gemstone Necklace', price: 950, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Necklace with gemstones.', category: 'Jewelry', stock: 20 },
                            { id: 1717, name: 'Antique Ring', price: 1200, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Antique style ring.', category: 'Jewelry', stock: 20 },
                            { id: 1718, name: 'Designer Brooch', price: 900, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Designer brooch.', category: 'Jewelry', stock: 20 },
                            { id: 1719, name: 'Layered Necklace', price: 1100, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Layered necklace.', category: 'Jewelry', stock: 20 },
                            { id: 1720, name: 'Infinity Bracelet', price: 650, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Infinity symbol bracelet.', category: 'Jewelry', stock: 20 },
                            { id: 1721, name: 'Pearl Earrings', price: 700, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Classic pearl earrings.', category: 'Jewelry', stock: 20 },
                            // Personalized Gifts - 21 unique products
                            { id: 1801, name: 'Custom Photo Frame', price: 399, image: 'https://i.pinimg.com/736x/b9/0f/a0/b90fa0ed952616c4a16ab02922b78479.jpg', description: 'Personalized photo frame with your favorite picture.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1802, name: 'Engraved Keychain', price: 199, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Keychain with custom engraving.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1803, name: 'Custom Mug', price: 299, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Personalized coffee mug.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1804, name: 'Name Plate', price: 350, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Custom name plate for home.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1805, name: 'Photo Cushion', price: 499, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Cushion with printed photo.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1806, name: 'Personalized Calendar', price: 399, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Custom calendar with photos.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1807, name: 'Custom T-shirt', price: 499, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'T-shirt with personalized print.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1808, name: 'Personalized Pen', price: 199, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Pen with custom engraving.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1809, name: 'Custom Mobile Cover', price: 299, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Mobile cover with personalized design.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1810, name: 'Personalized Diary', price: 399, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Diary with custom name.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1811, name: 'Custom Clock', price: 499, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Clock with personalized photo.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1812, name: 'Personalized Jewelry Box', price: 599, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Jewelry box with custom name.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1813, name: 'Custom Water Bottle', price: 299, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Water bottle with personalized print.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1814, name: 'Personalized Key Holder', price: 399, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Key holder with custom engraving.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1815, name: 'Custom Mouse Pad', price: 199, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Mouse pad with personalized design.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1816, name: 'Personalized Bag', price: 499, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Bag with custom name.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1817, name: 'Custom Cap', price: 299, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Cap with personalized print.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1818, name: 'Personalized Pillow', price: 399, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Pillow with custom photo.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1819, name: 'Custom Apron', price: 299, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Apron with personalized print.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1820, name: 'Personalized Wall Art', price: 499, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Wall art with custom design.', category: 'Personalized Gifts', stock: 20 },
                            { id: 1821, name: 'Custom Magnet', price: 199, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Magnet with personalized photo.', category: 'Personalized Gifts', stock: 20 },
                        // Flowers - 21 unique products
                        { id: 1501, name: 'Rose Bouquet', price: 350, image: 'https://i.pinimg.com/736x/2b/2b/2b/2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b.jpg', description: 'Fresh red roses bouquet, perfect for any occasion.', category: 'Flowers', stock: 20 },
                        { id: 1502, name: 'Tulip Arrangement', price: 400, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Colorful tulip arrangement.', category: 'Flowers', stock: 20 },
                        { id: 1503, name: 'Lily Basket', price: 420, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Basket of fresh lilies.', category: 'Flowers', stock: 20 },
                        { id: 1504, name: 'Orchid Vase', price: 450, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Elegant orchid vase.', category: 'Flowers', stock: 20 },
                        { id: 1505, name: 'Sunflower Bunch', price: 380, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Bright sunflower bunch.', category: 'Flowers', stock: 20 },
                        { id: 1506, name: 'Mixed Flower Basket', price: 500, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Basket of mixed flowers.', category: 'Flowers', stock: 20 },
                        { id: 1507, name: 'Carnation Bouquet', price: 370, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Bouquet of carnations.', category: 'Flowers', stock: 20 },
                        { id: 1508, name: 'Gerbera Arrangement', price: 390, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Gerbera flower arrangement.', category: 'Flowers', stock: 20 },
                        { id: 1509, name: 'Peony Basket', price: 430, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Basket of peonies.', category: 'Flowers', stock: 20 },
                        { id: 1510, name: 'Daisy Bunch', price: 360, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Bunch of daisies.', category: 'Flowers', stock: 20 },
                        { id: 1511, name: 'Exotic Flower Hamper', price: 600, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Hamper of exotic flowers.', category: 'Flowers', stock: 20 },
                        { id: 1512, name: 'Floral Basket', price: 410, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Basket of assorted flowers.', category: 'Flowers', stock: 20 },
                        { id: 1513, name: 'Rose & Lily Combo', price: 470, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Combo of roses and lilies.', category: 'Flowers', stock: 20 },
                        { id: 1514, name: 'Spring Flower Arrangement', price: 520, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Spring themed flower arrangement.', category: 'Flowers', stock: 20 },
                        { id: 1515, name: 'Winter Flower Basket', price: 530, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Winter themed flower basket.', category: 'Flowers', stock: 20 },
                        { id: 1516, name: 'Autumn Flower Hamper', price: 540, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Autumn themed flower hamper.', category: 'Flowers', stock: 20 },
                        { id: 1517, name: 'Summer Flower Combo', price: 550, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Summer themed flower combo.', category: 'Flowers', stock: 20 },
                        { id: 1518, name: 'Romantic Flower Basket', price: 560, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Romantic flower basket.', category: 'Flowers', stock: 20 },
                        { id: 1519, name: 'Birthday Flower Hamper', price: 570, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Birthday themed flower hamper.', category: 'Flowers', stock: 20 },
                        { id: 1520, name: 'Anniversary Flower Basket', price: 580, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Anniversary themed flower basket.', category: 'Flowers', stock: 20 },
                        { id: 1521, name: 'Get Well Flower Combo', price: 590, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Get well soon flower combo.', category: 'Flowers', stock: 20 },
                        // Greeting Cards - 21 unique products
                        { id: 1601, name: 'Birthday Greeting Card', price: 99, image: 'https://i.pinimg.com/736x/25/8e/74/258e74ae56305c4d45fab001aadcbfdd.jpg', description: 'Colorful birthday greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1602, name: 'Anniversary Card', price: 120, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Elegant anniversary card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1603, name: 'Wedding Card', price: 130, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Wedding greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1604, name: 'Get Well Card', price: 110, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Get well soon card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1605, name: 'Thank You Card', price: 115, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Thank you greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1606, name: 'Congratulations Card', price: 125, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Congratulations card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1607, name: 'Love Card', price: 140, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Love themed greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1608, name: 'Friendship Card', price: 110, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Friendship greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1609, name: 'New Year Card', price: 130, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'New Year greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1610, name: 'Christmas Card', price: 140, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Christmas greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1611, name: 'Diwali Card', price: 120, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Diwali greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1612, name: 'Holi Card', price: 110, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Holi greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1613, name: 'Eid Card', price: 120, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Eid greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1614, name: 'Mother’s Day Card', price: 130, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Mother’s Day greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1615, name: 'Father’s Day Card', price: 130, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Father’s Day greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1616, name: 'Children’s Day Card', price: 110, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Children’s Day greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1617, name: 'Teacher’s Day Card', price: 120, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Teacher’s Day greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1618, name: 'Baisakhi Card', price: 110, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Baisakhi greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1619, name: 'Lohri Card', price: 120, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Lohri greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1620, name: 'Pongal Card', price: 110, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Pongal greeting card.', category: 'Greeting Cards', stock: 20 },
                        { id: 1621, name: 'Onam Card', price: 120, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Onam greeting card.', category: 'Greeting Cards', stock: 20 },
                    // Chocolates - 21 unique products
                    { id: 1301, name: 'Belgian Chocolate Box', price: 499, image: 'https://i.pinimg.com/736x/52/4a/d3/524ad3c1fddf6a2b110fc3788b272e59.jpg', description: 'Assorted Belgian chocolates in a gift box.', category: 'Chocolates', stock: 20 },
                    { id: 1302, name: 'Dark Chocolate Bar', price: 120, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Rich dark chocolate bar.', category: 'Chocolates', stock: 20 },
                    { id: 1303, name: 'Milk Chocolate Truffles', price: 250, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Creamy milk chocolate truffles.', category: 'Chocolates', stock: 20 },
                    { id: 1304, name: 'Hazelnut Chocolate Spread', price: 180, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Hazelnut chocolate spread.', category: 'Chocolates', stock: 20 },
                    { id: 1305, name: 'Chocolate Almond Clusters', price: 220, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Chocolate covered almond clusters.', category: 'Chocolates', stock: 20 },
                    { id: 1306, name: 'White Chocolate Bark', price: 150, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'White chocolate bark with nuts.', category: 'Chocolates', stock: 20 },
                    { id: 1307, name: 'Chocolate Fudge', price: 200, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Classic chocolate fudge.', category: 'Chocolates', stock: 20 },
                    { id: 1308, name: 'Chocolate Coated Strawberries', price: 300, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Strawberries dipped in chocolate.', category: 'Chocolates', stock: 20 },
                    { id: 1309, name: 'Mint Chocolate Squares', price: 170, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Mint flavored chocolate squares.', category: 'Chocolates', stock: 20 },
                    { id: 1310, name: 'Chocolate Gift Hamper', price: 599, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Gift hamper with assorted chocolates.', category: 'Chocolates', stock: 20 },
                    { id: 1311, name: 'Chocolate Cookies', price: 180, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Chocolate chip cookies.', category: 'Chocolates', stock: 20 },
                    { id: 1312, name: 'Chocolate Brownies', price: 220, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Fudgy chocolate brownies.', category: 'Chocolates', stock: 20 },
                    { id: 1313, name: 'Chocolate Muffins', price: 200, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Moist chocolate muffins.', category: 'Chocolates', stock: 20 },
                    { id: 1314, name: 'Chocolate Wafers', price: 160, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Crispy chocolate wafers.', category: 'Chocolates', stock: 20 },
                    { id: 1315, name: 'Chocolate Lollipops', price: 140, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Fun chocolate lollipops.', category: 'Chocolates', stock: 20 },
                    { id: 1316, name: 'Chocolate Cupcakes', price: 210, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Chocolate cupcakes with frosting.', category: 'Chocolates', stock: 20 },
                    { id: 1317, name: 'Chocolate Ice Cream', price: 250, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Chocolate flavored ice cream.', category: 'Chocolates', stock: 20 },
                    { id: 1318, name: 'Chocolate Pretzels', price: 190, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Pretzels coated in chocolate.', category: 'Chocolates', stock: 20 },
                    { id: 1319, name: 'Chocolate Marshmallows', price: 160, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Marshmallows dipped in chocolate.', category: 'Chocolates', stock: 20 },
                    { id: 1320, name: 'Chocolate Nougat', price: 180, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Chocolate nougat bars.', category: 'Chocolates', stock: 20 },
                    { id: 1321, name: 'Chocolate Gift Box', price: 499, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Gift box with assorted chocolates.', category: 'Chocolates', stock: 20 },
                    // Festival Gifts - 21 unique products
                    { id: 1401, name: 'Diwali Gift Hamper', price: 999, image: 'https://i.pinimg.com/736x/49/12/b3/4912b35e97eccbb9e273ef8a5f9914df.jpg', description: 'Festive hamper for Diwali celebrations.', category: 'Festival Gifts', stock: 20 },
                    { id: 1402, name: 'Holi Color Pack', price: 299, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Pack of colors for Holi.', category: 'Festival Gifts', stock: 20 },
                    { id: 1403, name: 'Christmas Gift Basket', price: 799, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Basket of Christmas goodies.', category: 'Festival Gifts', stock: 20 },
                    { id: 1404, name: 'Raksha Bandhan Combo', price: 499, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Rakhi and sweets combo.', category: 'Festival Gifts', stock: 20 },
                    { id: 1405, name: 'Eid Gift Box', price: 699, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Gift box for Eid celebrations.', category: 'Festival Gifts', stock: 20 },
                    { id: 1406, name: 'New Year Party Kit', price: 599, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Party kit for New Year.', category: 'Festival Gifts', stock: 20 },
                    { id: 1407, name: 'Ganesh Chaturthi Decor', price: 399, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Decor items for Ganesh Chaturthi.', category: 'Festival Gifts', stock: 20 },
                    { id: 1408, name: 'Navratri Dandiya Set', price: 299, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Dandiya sticks for Navratri.', category: 'Festival Gifts', stock: 20 },
                    { id: 1409, name: 'Valentine Gift Combo', price: 899, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Valentine’s Day gift combo.', category: 'Festival Gifts', stock: 20 },
                    { id: 1410, name: 'Birthday Party Pack', price: 499, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Birthday party supplies pack.', category: 'Festival Gifts', stock: 20 },
                    { id: 1411, name: 'Wedding Gift Set', price: 1200, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Gift set for weddings.', category: 'Festival Gifts', stock: 20 },
                    { id: 1412, name: 'Anniversary Gift Box', price: 999, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Anniversary gift box.', category: 'Festival Gifts', stock: 20 },
                    { id: 1413, name: 'Mother’s Day Hamper', price: 799, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Hamper for Mother’s Day.', category: 'Festival Gifts', stock: 20 },
                    { id: 1414, name: 'Father’s Day Combo', price: 799, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Combo for Father’s Day.', category: 'Festival Gifts', stock: 20 },
                    { id: 1415, name: 'Children’s Day Pack', price: 399, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Children’s Day party pack.', category: 'Festival Gifts', stock: 20 },
                    { id: 1416, name: 'Teacher’s Day Gift', price: 299, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Gift for Teacher’s Day.', category: 'Festival Gifts', stock: 20 },
                    { id: 1417, name: 'Baisakhi Celebration Kit', price: 499, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Kit for Baisakhi celebrations.', category: 'Festival Gifts', stock: 20 },
                    { id: 1418, name: 'Lohri Gift Basket', price: 599, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Basket for Lohri festival.', category: 'Festival Gifts', stock: 20 },
                    { id: 1419, name: 'Pongal Gift Set', price: 499, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Gift set for Pongal festival.', category: 'Festival Gifts', stock: 20 },
                    { id: 1420, name: 'Onam Celebration Pack', price: 399, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Pack for Onam festival.', category: 'Festival Gifts', stock: 20 },
                    { id: 1421, name: 'Festive Gift Combo', price: 999, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Combo of festive gifts.', category: 'Festival Gifts', stock: 20 },
                // Cake - 21 unique products
                { id: 1201, name: 'Chocolate Truffle Cake', price: 650, image: 'https://i.pinimg.com/736x/0a/0a/0a/0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a.jpg', description: 'Rich chocolate truffle cake for celebrations.', category: 'Cake', stock: 20 },
                { id: 1202, name: 'Red Velvet Cake', price: 700, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Classic red velvet cake with cream cheese frosting.', category: 'Cake', stock: 20 },
                { id: 1203, name: 'Black Forest Cake', price: 680, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'German black forest cake with cherries.', category: 'Cake', stock: 20 },
                { id: 1204, name: 'Pineapple Cake', price: 600, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Fresh pineapple cake with whipped cream.', category: 'Cake', stock: 20 },
                { id: 1205, name: 'Strawberry Cake', price: 650, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Strawberry cake with real fruit topping.', category: 'Cake', stock: 20 },
                { id: 1206, name: 'Butterscotch Cake', price: 670, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Butterscotch cake with caramel drizzle.', category: 'Cake', stock: 20 },
                { id: 1207, name: 'Vanilla Bean Cake', price: 620, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Classic vanilla bean cake.', category: 'Cake', stock: 20 },
                { id: 1208, name: 'Mango Mousse Cake', price: 690, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Refreshing mango mousse cake.', category: 'Cake', stock: 20 },
                { id: 1209, name: 'Coffee Walnut Cake', price: 710, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Coffee cake with crunchy walnuts.', category: 'Cake', stock: 20 },
                { id: 1210, name: 'Blueberry Cheesecake', price: 750, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Cheesecake topped with blueberries.', category: 'Cake', stock: 20 },
                { id: 1211, name: 'Fruit Gateau', price: 720, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Layered fruit gateau cake.', category: 'Cake', stock: 20 },
                { id: 1212, name: 'Rasmalai Cake', price: 800, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Indian fusion rasmalai cake.', category: 'Cake', stock: 20 },
                { id: 1213, name: 'Chocolate Fudge Cake', price: 670, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Dense chocolate fudge cake.', category: 'Cake', stock: 20 },
                { id: 1214, name: 'Rainbow Cake', price: 900, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Colorful rainbow layered cake.', category: 'Cake', stock: 20 },
                { id: 1215, name: 'Opera Cake', price: 950, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'French opera cake with coffee and chocolate.', category: 'Cake', stock: 20 },
                { id: 1216, name: 'Carrot Cake', price: 650, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Moist carrot cake with cream cheese frosting.', category: 'Cake', stock: 20 },
                { id: 1217, name: 'Hazelnut Praline Cake', price: 800, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Hazelnut praline cake with chocolate.', category: 'Cake', stock: 20 },
                { id: 1218, name: 'Lemon Drizzle Cake', price: 670, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Tangy lemon drizzle cake.', category: 'Cake', stock: 20 },
                { id: 1219, name: 'Almond Honey Cake', price: 720, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Almond honey cake with nuts.', category: 'Cake', stock: 20 },
                { id: 1220, name: 'Tiramisu Cake', price: 950, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Italian tiramisu cake.', category: 'Cake', stock: 20 },
                { id: 1221, name: 'Sacher Torte', price: 1000, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Austrian sacher torte chocolate cake.', category: 'Cake', stock: 20 },
            // Accessories - 21 unique products
            { id: 1101, name: 'Leather Wallet', price: 699, image: 'https://i.pinimg.com/736x/23/c9/ff/23c9ffe39e30f915d0896ddb47c8bdf6.jpg', description: 'Premium leather wallet with multiple card slots.', category: 'Accessories', stock: 20 },
            { id: 1102, name: 'Classic Sunglasses', price: 499, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Stylish sunglasses for everyday wear.', category: 'Accessories', stock: 20 },
            { id: 1103, name: 'Silk Scarf', price: 399, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Elegant silk scarf for all seasons.', category: 'Accessories', stock: 20 },
            { id: 1104, name: 'Wrist Watch', price: 1200, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Modern wrist watch with leather strap.', category: 'Accessories', stock: 20 },
            { id: 1105, name: 'Handbag', price: 999, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Trendy handbag for daily use.', category: 'Accessories', stock: 20 },
            { id: 1106, name: 'Travel Backpack', price: 1299, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Spacious backpack for travel.', category: 'Accessories', stock: 20 },
            { id: 1107, name: 'Keychain Set', price: 149, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Set of 3 stylish keychains.', category: 'Accessories', stock: 20 },
            { id: 1108, name: 'Tie & Pocket Square', price: 299, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Matching tie and pocket square set.', category: 'Accessories', stock: 20 },
            { id: 1109, name: 'Belt', price: 399, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Leather belt for formal and casual wear.', category: 'Accessories', stock: 20 },
            { id: 1110, name: 'Hair Clip Set', price: 199, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Colorful hair clips for styling.', category: 'Accessories', stock: 20 },
            { id: 1111, name: 'Brooch', price: 249, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Elegant brooch for dresses.', category: 'Accessories', stock: 20 },
            { id: 1112, name: 'Cufflinks', price: 349, image: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j.jpg', description: 'Stylish cufflinks for shirts.', category: 'Accessories', stock: 20 },
            { id: 1113, name: 'Wallet Chain', price: 179, image: 'https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1a.jpg', description: 'Metal chain for wallets.', category: 'Accessories', stock: 20 },
            { id: 1114, name: 'Phone Case', price: 299, image: 'https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7g8h9i0j1a2b.jpg', description: 'Protective phone case with design.', category: 'Accessories', stock: 20 },
            { id: 1115, name: 'Earphone Pouch', price: 159, image: 'https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7g8h9i0j1a2b3c.jpg', description: 'Compact pouch for earphones.', category: 'Accessories', stock: 20 },
            { id: 1116, name: 'Makeup Bag', price: 399, image: 'https://i.pinimg.com/736x/5e/6f/7g/5e6f7g8h9i0j1a2b3c4d.jpg', description: 'Portable makeup bag for essentials.', category: 'Accessories', stock: 20 },
            { id: 1117, name: 'Shoe Organizer', price: 499, image: 'https://i.pinimg.com/736x/6f/7g/8h/6f7g8h9i0j1a2b3c4d5e.jpg', description: 'Organizer for shoes and sandals.', category: 'Accessories', stock: 20 },
            { id: 1118, name: 'Travel Pouch', price: 299, image: 'https://i.pinimg.com/736x/7g/8h/9i/7g8h9i0j1a2b3c4d5e6f.jpg', description: 'Multipurpose travel pouch.', category: 'Accessories', stock: 20 },
            { id: 1119, name: 'Raincoat', price: 699, image: 'https://i.pinimg.com/736x/8h/9i/0j/8h9i0j1a2b3c4d5e6f7g.jpg', description: 'Lightweight raincoat for all weather.', category: 'Accessories', stock: 20 },
            { id: 1120, name: 'Umbrella', price: 349, image: 'https://i.pinimg.com/736x/9i/0j/1a/9i0j1a2b3c4d5e6f7g8h.jpg', description: 'Compact umbrella for rainy days.', category: 'Accessories', stock: 20 },
            { id: 1121, name: 'Travel Adapter', price: 299, image: 'https://i.pinimg.com/736x/0j/1a/2b/0j1a2b3c4d5e6f7g8h9i.jpg', description: 'Universal travel adapter for electronics.', category: 'Accessories', stock: 20 },
       
    // Add 20 products for each category
    // Home Décor
    { id: 1001, name: 'Elegant Vase', price: 499, image: 'https://i.pinimg.com/736x/be/b8/4a/beb84a2080676c34ec82b6787db46f82.jpg', description: 'A decorative flower pot with fresh flowers.', category: 'Home Décor', stock: 20 },
    { id: 1002, name: 'Wall Art Canvas', price: 799, image: 'https://i.pinimg.com/736x/57/66/2b/57662b49765883072f483fe1d956453b.jpg', description: 'Modern wall art for stylish interiors.', category: 'Home Décor', stock: 20 },
    { id: 1003, name: 'Table Lamp', price: 699, image: 'https://i.pinimg.com/736x/ea/b6/04/eab604a65ef0e4eff20947a65413ff7.jpg', description: 'LED table lamp for cozy lighting.', category: 'Home Décor', stock: 20 },
    { id: 1004, name: 'Photo Frame Set', price: 399, image: 'https://i.pinimg.com/736x/b9/0f/a0/b90fa0ed952616c4a16ab02922b78479.jpg', description: 'Set of 3 stylish photo frames.', category: 'Home Décor', stock: 20 },
    { id: 1005, name: 'Decorative Wall Clock', price: 799, image: 'https://i.pinimg.com/736x/be/b8/4a/beb84a2080676c34ec82b6787db46f82.jpg', description: 'Stylish wall clock for home décor.', category: 'Home Décor', stock: 20 },
    { id: 1006, name: 'Ceramic Planter', price: 349, image: 'https://i.pinimg.com/1200x/8c/36/03/8c36038aef1a1f124e6466f7a313eb71.jpg', description: 'Beautiful ceramic planter for indoor plants.', category: 'Home Décor', stock: 20 },
    { id: 1007, name: 'Throw Pillow', price: 449, image: 'https://i.pinimg.com/1200x/1c/9c/92/1c9c927c16a9caa6342e30bdde44c375.jpg', description: 'Soft decorative throw pillow for any room.', category: 'Home Décor', stock: 20 },
    { id: 1008, name: 'Storage Baskets', price: 749, image: 'https://i.pinimg.com/736x/a0/e5/82/a0e5827e5e47c66e84d6f73f4b28de34.jpg', description: 'Set of 3 woven storage baskets for organization.', category: 'Home Décor', stock: 20 },
    { id: 1009, name: 'Fragrance Diffuser', price: 849, image: 'https://i.pinimg.com/1200x/54/18/ce/5418ce5ff2b7f8d49532a27da210029f.jpg', description: 'Luxury fragrance diffuser with premium scents.', category: 'Home Décor', stock: 20 },
    { id: 1010, name: 'Beeswax Candles', price: 449, image: 'https://i.pinimg.com/1200x/fc/bd/01/fcbd016673c226833e157aacde5b81ea.jpg', description: 'Natural beeswax candles for a clean burn.', category: 'Home Décor', stock: 20 },
    { id: 1011, name: 'Wine Glass Set', price: 799, image: 'https://i.pinimg.com/736x/54/81/0a/54810a5dbf06789393fe4b6711565098.jpg', description: 'Set of 4 elegant wine glasses with gift packaging.', category: 'Home Décor', stock: 20 },
    { id: 1012, name: 'Desk Organizer', price: 449, image: 'https://i.pinimg.com/736x/0f/82/7e/0f827ec91186faf1448f574ef5ebc7b9.jpg', description: 'Wooden desk organizer with multiple compartments.', category: 'Home Décor', stock: 20 },
    { id: 1013, name: 'Smart LED Bulbs', price: 899, image: 'https://i.pinimg.com/1200x/d8/da/36/d8da36c2247144cf1f5de7a2d8eb0a76.jpg', description: 'Set of 2 smart LED bulbs with WiFi control.', category: 'Home Décor', stock: 20 },
    { id: 1014, name: 'Silk Pillowcase', price: 599, image: 'https://i.pinimg.com/1200x/9f/8a/b3/9f8ab36734399f898aad4f144ed7e01a.jpg', description: 'Luxurious silk pillowcase for better sleep quality.', category: 'Home Décor', stock: 20 },
    { id: 1015, name: 'Aromatherapy Diffuser', price: 749, image: 'https://i.pinimg.com/736x/4c/0e/46/4c0e463f5e5da817fc19b04e98a3a549.jpg', description: 'Electric diffuser with essential oils.', category: 'Home Décor', stock: 20 },
    { id: 1016, name: 'Humidifier', price: 899, image: 'https://i.pinimg.com/736x/d4/f7/33/d4f733ad3bd6c98fbaab1881d7f3793c.jpg', description: 'Ultrasonic humidifier for comfortable air quality.', category: 'Home Décor', stock: 20 },
    { id: 1017, name: 'Bamboo Cutting Board', price: 399, image: 'https://i.pinimg.com/736x/63/f4/36/63f436ef3de95137db2a0edf740c15bf.jpg', description: 'Eco-friendly bamboo cutting board for the kitchen.', category: 'Home Décor', stock: 20 },
    { id: 1018, name: 'Marble Coasters', price: 299, image: 'https://i.pinimg.com/1200x/cd/71/1f/cd711fbc3d8f29564b52fa82756650aa.jpg', description: 'Set of 4 elegant marble coasters.', category: 'Home Décor', stock: 20 },
    { id: 1019, name: 'Succulent Plant Set', price: 449, image: 'https://i.pinimg.com/1200x/63/2e/d1/632ed15f4306d55fae921ca6cd0f856c.jpg', description: 'Live succulent plants in decorative pots.', category: 'Home Décor', stock: 20 },
    { id: 1020, name: 'Coffee Maker', price: 1499, image: 'https://i.pinimg.com/736x/57/36/14/573614a65cb3bf19f45e730e8b26f038.jpg', description: 'Modern programmable coffee maker for the perfect brew.', category: 'Home Décor', stock: 20 },
    { id: 1021, name: 'Festival Gift Basket', price: 1999, image: 'https://i.pinimg.com/736x/0c/c2/eb/0cc2ebcf06724d4fd23d34a37d6afa43.jpg', description: 'Festive gift basket with assorted treats.', category: 'Home Décor', stock: 20 },
    // Mugs
    { id: 1022, name: 'Ceramic Coffee Mug', price: 199, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Durable ceramic mug for your morning coffee.', category: 'Mugs', stock: 20 },
    { id: 1023, name: 'Travel Mug', price: 249, image: 'https://i.pinimg.com/1200x/52/74/9f/52749f1a73e9d3cfad14c3d33f27f52b.jpg', description: 'Insulated travel mug for hot and cold drinks.', category: 'Mugs', stock: 20 },
    { id: 1024, name: 'Personalized Mug', price: 299, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Custom mug perfect for your morning coffee.', category: 'Mugs', stock: 20 },
    { id: 1025, name: 'Tea Cup Set', price: 399, image: 'https://i.pinimg.com/736x/54/81/0a/54810a5dbf06789393fe4b6711565098.jpg', description: 'Set of 4 elegant tea cups.', category: 'Mugs', stock: 20 },
    { id: 1026, name: 'Espresso Mug', price: 179, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Small mug for espresso shots.', category: 'Mugs', stock: 20 },
    { id: 1027, name: 'Color Changing Mug', price: 299, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug that changes color with heat.', category: 'Mugs', stock: 20 },
    { id: 1028, name: 'Funny Quote Mug', price: 229, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug with a humorous quote.', category: 'Mugs', stock: 20 },
    { id: 1029, name: 'Couple Mug Set', price: 399, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Matching mugs for couples.', category: 'Mugs', stock: 20 },
    { id: 1030, name: 'Animal Print Mug', price: 249, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug with animal print design.', category: 'Mugs', stock: 20 },
    { id: 1031, name: 'Insulated Water Bottle', price: 599, image: 'https://i.pinimg.com/1200x/52/74/9f/52749f1a73e9d3cfad14c3d33f27f52b.jpg', description: 'Keeps drinks cold for 24 hours or hot for 12 hours.', category: 'Mugs', stock: 20 },
    { id: 1032, name: 'Glass Mug', price: 299, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Transparent glass mug for beverages.', category: 'Mugs', stock: 20 },
    { id: 1033, name: 'Floral Print Mug', price: 249, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug with floral design.', category: 'Mugs', stock: 20 },
    { id: 1034, name: 'Birthday Mug', price: 199, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Birthday themed mug.', category: 'Mugs', stock: 20 },
    { id: 1035, name: 'Christmas Mug', price: 249, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Christmas themed mug.', category: 'Mugs', stock: 20 },
    { id: 1036, name: 'Travel Thermos', price: 399, image: 'https://i.pinimg.com/1200x/52/74/9f/52749f1a73e9d3cfad14c3d33f27f52b.jpg', description: 'Thermos for travel and outdoor use.', category: 'Mugs', stock: 20 },
    { id: 1037, name: 'Minimalist Mug', price: 199, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Simple and elegant mug.', category: 'Mugs', stock: 20 },
    { id: 1038, name: 'Heart Shape Mug', price: 299, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug with heart shape design.', category: 'Mugs', stock: 20 },
    { id: 1039, name: 'Large Soup Mug', price: 349, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Large mug for soup and stews.', category: 'Mugs', stock: 20 },
    { id: 1040, name: 'Office Mug', price: 199, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug for office use.', category: 'Mugs', stock: 20 },
    { id: 1041, name: 'Funny Cat Mug', price: 249, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'Mug with a funny cat design.', category: 'Mugs', stock: 20 },
    // ...repeat for all other categories with themed products...
    // ...repeat for other categories with themed names...
];

function getStoredStock() {
    const raw = localStorage.getItem(STORE_STOCK_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveStock(stockMap) {
    localStorage.setItem(STORE_STOCK_KEY, JSON.stringify(stockMap));
}

function initStock() {
    let stockMap = getStoredStock();
    if (!stockMap) {
        stockMap = {};
        STORE_PRODUCTS.forEach(p => {
            stockMap[p.id] = p.stock;
        });
        saveStock(stockMap);
    }
    return stockMap;
}

function getStockForProduct(productId) {
    const stockMap = getStoredStock() || initStock();
    return stockMap[productId] ?? 0;
}

function setStockForProduct(productId, newStock) {
    const stockMap = getStoredStock() || initStock();
    stockMap[productId] = Math.max(0, newStock);
    saveStock(stockMap);
    return stockMap[productId];
}

function reduceStockForOrder(cartItems) {
    const stockMap = getStoredStock() || initStock();
    cartItems.forEach(item => {
        const current = stockMap[item.id] ?? 0;
        stockMap[item.id] = Math.max(0, current - item.quantity);
    });
    saveStock(stockMap);
    return stockMap;
}

function getProductById(productId) {
    return STORE_PRODUCTS.find(p => p.id === Number(productId));
}

function getAllProducts() {
    const stockMap = getStoredStock() || initStock();
    return STORE_PRODUCTS.map(p => ({
        ...p,
        stock: stockMap[p.id] ?? 0
    }));
}

function getSoldOutProducts() {
    return getAllProducts().filter(p => p.stock <= 0);
}

function getSalesStats() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const stats = {};

    orders.forEach(order => {
        (order.items || []).forEach(item => {
            if (!stats[item.id]) {
                stats[item.id] = { id: item.id, name: item.name, revenue: 0, sold: 0 };
            }
            stats[item.id].sold += item.quantity;
            stats[item.id].revenue += item.quantity * item.price;
        });
    });

    return Object.values(stats);
}

function getTopSellingProducts(limit = 5) {
    const stats = getSalesStats();
    return stats.sort((a, b) => b.sold - a.sold).slice(0, limit);
}

// Expose helper functions globally (for inline scripts and other modules)
window.store = {
    initStock,
    getStockForProduct,
    setStockForProduct,
    reduceStockForOrder,
    getProductById,
    getAllProducts,
    getSoldOutProducts,
    getSalesStats,
    getTopSellingProducts,
};

// Ensure there is a stock record in localStorage for the first time the app loads
initStock();
