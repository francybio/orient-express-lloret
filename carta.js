/* ==========================================================
   ORIENT EXPRESS — la carta (de sus cartas en Restaurant Guru)
   Cada sección es un «andén» del panel de salidas.
   Plato: [número, precio, [es, ca, en, fr], [descripciones] | null]
   ========================================================== */
window.OE_CARTA = [
  { id: 'desayunos', ic: 'coffee', t: ['Desayunos', 'Esmorzars', 'Breakfasts', 'Petits-déjeuners'], note: ['Sin grasa añadida', 'Sense greix afegit', 'No added fat', 'Sans matière grasse ajoutée'], items: [
    [90, 6.95, ['Oferta especial de desayuno', 'Oferta especial d’esmorzar', 'Special breakfast offer', 'Offre spéciale petit-déjeuner'], ['Bacon danés, huevo frito, tomate, alubias Heinz, salchicha, tostadas y mantequilla', 'Bacon danès, ou ferrat, tomàquet, mongetes Heinz, salsitxa, torrades i mantega', 'Danish bacon, fried egg, tomato, Heinz baked beans, sausage, toast and butter', 'Bacon danois, œuf au plat, tomate, haricots Heinz, saucisse, toasts et beurre']],
    [91, 8.95, ['Desayuno especial con patatas fritas', 'Esmorzar especial amb patates fregides', 'Special breakfast with chips', 'Petit-déjeuner spécial avec frites'], ['El mismo desayuno, con patatas fritas', 'El mateix esmorzar, amb patates fregides', 'The same breakfast, with chips', 'Le même petit-déjeuner, avec des frites']],
    [120, 3.5, ['Desayuno tradicional', 'Esmorzar tradicional', 'Traditional breakfast', 'Petit-déjeuner traditionnel'], ['Café o té y cruasán', 'Cafè o te i croissant', 'Coffee or tea and a croissant', 'Café ou thé et croissant']],
    [121, 14.9, ['Desayuno proteico', 'Esmorzar proteic', 'Protein breakfast', 'Petit-déjeuner protéiné'], ['Café o té, zumo de naranja, 2 tostadas integrales, jamón dulce, queso, 2 huevos revueltos, queso crema y yogur con granola y fruta', 'Cafè o te, suc de taronja, 2 torrades integrals, pernil dolç, formatge, 2 ous remenats, formatge cremós i iogurt amb granola i fruita', 'Coffee or tea, orange juice, 2 wholemeal toasts, ham, cheese, 2 scrambled eggs, cream cheese and yoghurt with granola and fruit', 'Café ou thé, jus d’orange, 2 toasts complets, jambon, fromage, 2 œufs brouillés, fromage frais et yaourt granola et fruits']],
    [122, 7.9, ['Desayuno light', 'Esmorzar light', 'Light breakfast', 'Petit-déjeuner léger'], ['Café o té, zumo de naranja, 2 tostadas integrales, queso crema y mermelada', 'Cafè o te, suc de taronja, 2 torrades integrals, formatge cremós i melmelada', 'Coffee or tea, orange juice, 2 wholemeal toasts, cream cheese and jam', 'Café ou thé, jus d’orange, 2 toasts complets, fromage frais et confiture']],
    [123, 1.8, ['Cruasán', 'Croissant', 'Croissant', 'Croissant'], null],
    [124, 1.9, ['Cruasán integral', 'Croissant integral', 'Wholemeal croissant', 'Croissant complet'], null],
    [125, 3.9, ['Cruasán con jamón y queso', 'Croissant amb pernil i formatge', 'Ham and cheese croissant', 'Croissant jambon-fromage'], null],
    [126, 1.9, ['Napolitana', 'Napolitana', 'Pain au chocolat', 'Pain au chocolat'], null],
    [127, 2.6, ['Muffins', 'Muffins', 'Muffins', 'Muffins'], null]
  ] },
  { id: 'extras', ic: 'egg', t: ['Extras del desayuno', 'Extres de l’esmorzar', 'Breakfast extras', 'Suppléments du petit-déjeuner'], items: [
    [92, 3.5, ['Alubias', 'Mongetes', 'Beans', 'Haricots'], null],
    [93, 1.4, ['Huevo', 'Ou', 'Egg', 'Œuf'], null],
    [94, 1.5, ['Salchicha', 'Salsitxa', 'Sausage', 'Saucisse'], null],
    [95, 2.4, ['Jamón con tostadas', 'Pernil amb torrades', 'Ham on toast', 'Jambon sur toasts'], null],
    [96, 3.95, ['Alubias con tostadas', 'Mongetes amb torrades', 'Beans on toast', 'Haricots sur toasts'], null],
    [97, 4.5, ['Huevos con tostadas', 'Ous amb torrades', 'Eggs on toast', 'Œufs sur toasts'], null],
    [98, 4.5, ['Huevos revueltos con tostadas', 'Ous remenats amb torrades', 'Scrambled eggs on toast', 'Œufs brouillés sur toasts'], null],
    [100, 2.4, ['Tostadas y mermelada', 'Torrades i melmelada', 'Toast and jam', 'Toasts et confiture'], null],
    [101, 3.85, ['Salchicha con tostadas', 'Salsitxa amb torrades', 'Sausage on toast', 'Saucisse sur toasts'], null],
    [102, 3.95, ['Bacon con tostadas', 'Bacon amb torrades', 'Bacon on toast', 'Bacon sur toasts'], null],
    [103, 5.95, ['2 bacon y 2 huevos con tostadas', '2 bacon i 2 ous amb torrades', '2 bacon and 2 eggs on toast', '2 bacon et 2 œufs sur toasts'], null],
    [104, 3.75, ['Patatas fritas', 'Patates fregides', 'Chips', 'Frites'], null],
    [105, 3.5, ['Hash browns (3 por ración)', 'Hash browns (3 per ració)', 'Hash browns (3 per portion)', 'Hash browns (3 par portion)'], null]
  ] },
  { id: 'baguettes', ic: 'bread', t: ['Baguettes y patatas asadas', 'Baguets i patates al forn', 'Baguettes and jacket potatoes', 'Baguettes et pommes de terre au four'], note: ['Pan blanco o de cereales y semillas, recién horneado', 'Pa blanc o de cereals i llavors, acabat de fer', 'White or seeded multigrain bread, freshly baked', 'Pain blanc ou aux céréales et graines, tout juste cuit'], items: [
    [130, 4.5, ['Baguette de jamón', 'Baguet de pernil', 'Ham baguette', 'Baguette jambon'], null],
    [131, 4.5, ['Baguette de queso', 'Baguet de formatge', 'Cheese baguette', 'Baguette fromage'], null],
    [132, 4.95, ['Baguette de queso y jamón', 'Baguet de formatge i pernil', 'Ham and cheese baguette', 'Baguette jambon-fromage'], null],
    [133, 6.3, ['Baguette de bacon y queso', 'Baguet de bacon i formatge', 'Bacon and cheese baguette', 'Baguette bacon-fromage'], null],
    [134, 6.3, ['Baguette de bacon y tomate', 'Baguet de bacon i tomàquet', 'Bacon and tomato baguette', 'Baguette bacon-tomate'], null],
    [135, 6.3, ['Baguette de atún y mayonesa', 'Baguet de tonyina i maionesa', 'Tuna mayo baguette', 'Baguette thon-mayonnaise'], null],
    [136, 8.5, ['Baguette de jamón ibérico', 'Baguet de pernil ibèric', 'Iberian ham baguette', 'Baguette jambon ibérique'], null],
    [137, 9.9, ['Bagel de salmón', 'Bagel de salmó', 'Salmon bagel', 'Bagel au saumon'], null],
    [138, 3.95, ['Sándwich mixto', 'Entrepà mixt', 'Ham and cheese toastie', 'Croque-monsieur'], null],
    [140, 6.95, ['Patata asada con alubias', 'Patata al forn amb mongetes', 'Jacket potato with beans', 'Pomme de terre au four et haricots'], null],
    [141, 6.95, ['Patata asada con queso y alubias', 'Patata al forn amb formatge i mongetes', 'Jacket potato with cheese and beans', 'Pomme de terre au four, fromage et haricots'], null],
    [142, 6.95, ['Patata asada con atún y mayonesa', 'Patata al forn amb tonyina i maionesa', 'Jacket potato with tuna mayo', 'Pomme de terre au four, thon-mayonnaise'], null]
  ] },
  { id: 'entrantes', ic: 'bowl-food', t: ['Entrantes', 'Entrants', 'Starters', 'Entrées'], items: [
    [1, 7.8, ['Tequeños con salsa sweet chili', 'Tequeños amb salsa sweet chili', 'Tequeños with sweet chilli sauce', 'Tequeños sauce sweet chili'], null],
    [2, 7.95, ['Provoleta con confitura de tomate', 'Provoleta amb confitura de tomàquet', 'Provoleta with tomato jam', 'Provoleta à la confiture de tomate'], null],
    [3, 10.5, ['Alitas de pollo rebozadas con barbacoa', 'Aletes de pollastre arrebossades amb barbacoa', 'Breaded chicken wings with barbecue sauce', 'Ailes de poulet panées, sauce barbecue'], null],
    [4, 7.9, ['Pollo crujiente con salsa sweet chili', 'Pollastre cruixent amb salsa sweet chili', 'Crispy chicken with sweet chilli sauce', 'Poulet croustillant sauce sweet chili'], null],
    [5, 6.5, ['Croqueta de ibérico', 'Croqueta d’ibèric', 'Iberian ham croquette', 'Croquette au jambon ibérique'], null],
    [6, 7.5, ['Croqueta Orient Express', 'Croqueta Orient Express', 'Orient Express croquette', 'Croquette Orient Express'], ['La croqueta de la casa', 'La croqueta de la casa', 'The house croquette', 'La croquette maison']],
    [7, 8.4, ['Calamares a la romana con all i oli', 'Calamars a la romana amb allioli', 'Battered squid rings with aioli', 'Calamars à la romaine, aïoli'], null],
    [8, 13.9, ['Mejillones en salsa provenzal', 'Musclos en salsa provençal', 'Mussels in Provençal sauce', 'Moules sauce provençale'], null],
    [9, 9.5, ['Gambas al ajillo', 'Gambes a l’allet', 'Garlic prawns', 'Crevettes à l’ail'], null],
    [10, 17.9, ['Tabla de quesos', 'Taula de formatges', 'Cheese board', 'Plateau de fromages'], ['Un viaje por España en 5 quesos: manchego, semicurado, oveja ahumada, madurado y oveja curado', 'Un viatge per Espanya en 5 formatges: manxego, semicurat, ovella fumat, madurat i ovella curat', 'A journey through Spain in 5 cheeses: Manchego, semi-cured, smoked sheep’s, aged and cured sheep’s', 'Un voyage en Espagne en 5 fromages : manchego, demi-affiné, brebis fumé, affiné et brebis affiné']],
    [11, 18.5, ['Ración de jamón ibérico', 'Ració de pernil ibèric', 'Iberian ham platter', 'Assiette de jambon ibérique'], null],
    [12, 3.8, ['Pan de campo con tomate y aceite', 'Pa de pagès amb tomàquet i oli', 'Country bread with tomato and olive oil', 'Pain de campagne, tomate et huile d’olive'], null]
  ] },
  { id: 'ensaladas', ic: 'leaf', t: ['Ensaladas', 'Amanides', 'Salads', 'Salades'], items: [
    [30, 14.5, ['César', 'Cèsar', 'Caesar', 'César'], ['Mezclum, pollo, picatostes, tomate, parmesano y salsa César', 'Mesclum, pollastre, crostons, tomàquet, parmesà i salsa Cèsar', 'Mixed leaves, chicken, croutons, tomato, Parmesan and Caesar dressing', 'Mesclun, poulet, croûtons, tomate, parmesan et sauce César']],
    [31, 13.5, ['Burrata', 'Burrata', 'Burrata', 'Burrata'], ['Sobre rúcula, con tomate cherry, tomate confitado con hierbas y pesto', 'Sobre ruca, amb tomàquet cherry, tomàquet confitat amb herbes i pesto', 'On rocket, with cherry tomatoes, herb-confit tomato and pesto', 'Sur roquette, tomates cerises, tomate confite aux herbes et pesto']],
    [32, 10.95, ['Rúcula', 'Ruca', 'Rocket', 'Roquette'], ['Rúcula, parmesano, nueces, queso azul y reducción de aceto', 'Ruca, parmesà, nous, formatge blau i reducció d’aceto', 'Rocket, Parmesan, walnuts, blue cheese and balsamic reduction', 'Roquette, parmesan, noix, bleu et réduction de balsamique']],
    [33, 13.5, ['Queso de cabra', 'Formatge de cabra', 'Goat’s cheese', 'Chèvre'], ['Mezclum, mermelada de tomate, frutos secos, fresas, reducción de aceto y queso de cabra', 'Mesclum, melmelada de tomàquet, fruits secs, maduixes, reducció d’aceto i formatge de cabra', 'Mixed leaves, tomato jam, nuts, strawberries, balsamic reduction and goat’s cheese', 'Mesclun, confiture de tomate, fruits secs, fraises, balsamique et chèvre']],
    [34, 13.75, ['Atún', 'Tonyina', 'Tuna', 'Thon'], ['Mezclum, maíz, tomate, pepino, cebolla morada y atún', 'Mesclum, blat de moro, tomàquet, cogombre, ceba morada i tonyina', 'Mixed leaves, sweetcorn, tomato, cucumber, red onion and tuna', 'Mesclun, maïs, tomate, concombre, oignon rouge et thon']],
    [35, 8.5, ['Mixta', 'Mixta', 'Mixed', 'Mixte'], ['Mezclum, tomate, cebolla, pimiento, maíz y pepino', 'Mesclum, tomàquet, ceba, pebrot, blat de moro i cogombre', 'Mixed leaves, tomato, onion, pepper, sweetcorn and cucumber', 'Mesclun, tomate, oignon, poivron, maïs et concombre']]
  ] },
  { id: 'bruschettas', ic: 'knife', t: ['Bruschettas', 'Bruschettes', 'Bruschettas', 'Bruschettas'], note: ['Sobre tostón de pan de campo', 'Sobre llesca de pa de pagès', 'On toasted country bread', 'Sur une tranche de pain de campagne grillé'], items: [
    [70, 13.5, ['Aguacate', 'Alvocat', 'Avocado', 'Avocat'], ['Queso crema con cebollino, crema de aguacate, huevo, semillas y tomate deshidratado', 'Formatge cremós amb cibulet, crema d’alvocat, ou, llavors i tomàquet sec', 'Chive cream cheese, avocado cream, egg, seeds and sun-dried tomato', 'Fromage frais à la ciboulette, crème d’avocat, œuf, graines et tomate séchée']],
    [71, 16.5, ['Rúcula y jamón', 'Ruca i pernil', 'Rocket and ham', 'Roquette et jambon'], ['Con tomate y aceite, jamón serrano, rúcula y parmesano', 'Amb tomàquet i oli, pernil serrà, ruca i parmesà', 'With tomato and olive oil, Serrano ham, rocket and Parmesan', 'Tomate et huile, jambon serrano, roquette et parmesan']],
    [72, 12.9, ['Caprese', 'Caprese', 'Caprese', 'Caprese'], ['Queso crema con cebollino, tomate, mozzarella fresca y pesto', 'Formatge cremós amb cibulet, tomàquet, mozzarella fresca i pesto', 'Chive cream cheese, tomato, fresh mozzarella and pesto', 'Fromage frais à la ciboulette, tomate, mozzarella fraîche et pesto']],
    [73, 14.9, ['Cremoso de atún', 'Cremós de tonyina', 'Creamy tuna', 'Crémeux de thon'], ['Tomate, atún, huevo duro y olivas negras', 'Tomàquet, tonyina, ou dur i olives negres', 'Tomato, tuna, hard-boiled egg and black olives', 'Tomate, thon, œuf dur et olives noires']],
    [74, 9.9, ['Bagel de salmón', 'Bagel de salmó', 'Salmon bagel', 'Bagel au saumon'], ['Queso crema, aguacate, rúcula y salmón', 'Formatge cremós, alvocat, ruca i salmó', 'Cream cheese, avocado, rocket and salmon', 'Fromage frais, avocat, roquette et saumon']]
  ] },
  { id: 'pizzas', ic: 'pizza', t: ['Pizzas', 'Pizzes', 'Pizzas', 'Pizzas'], note: ['Todas con base de tomate', 'Totes amb base de tomàquet', 'All on a tomato base', 'Toutes sur base tomate'], items: [
    [20, 10.25, ['Margarita', 'Margarita', 'Margherita', 'Margherita'], ['Mozzarella y orégano', 'Mozzarella i orenga', 'Mozzarella and oregano', 'Mozzarella et origan']],
    [21, 12.9, ['Jamón dulce y champiñones', 'Pernil dolç i xampinyons', 'Ham and mushroom', 'Jambon et champignons'], ['Con olivas negras', 'Amb olives negres', 'With black olives', 'Avec olives noires']],
    [22, 16.9, ['Atún y cebolla', 'Tonyina i ceba', 'Tuna and onion', 'Thon et oignon'], ['Atún y aros de cebolla morada', 'Tonyina i anelles de ceba morada', 'Tuna and red onion rings', 'Thon et rondelles d’oignon rouge']],
    [23, 16.5, ['Caprese', 'Caprese', 'Caprese', 'Caprese'], ['Rodajas de tomate, mozzarella fresca y pesto', 'Rodanxes de tomàquet, mozzarella fresca i pesto', 'Tomato slices, fresh mozzarella and pesto', 'Rondelles de tomate, mozzarella fraîche et pesto']],
    [24, 12.9, ['Pepperoni', 'Pepperoni', 'Pepperoni', 'Pepperoni'], ['Salami pepperoni italiano, orégano y albahaca', 'Salami pepperoni italià, orenga i alfàbrega', 'Italian pepperoni, oregano and basil', 'Pepperoni italien, origan et basilic']],
    [25, 18.9, ['Bacon y barbacoa', 'Bacon i barbacoa', 'Bacon and barbecue', 'Bacon et barbecue'], ['Mozzarella, orégano, bacon y salsa barbacoa', 'Mozzarella, orenga, bacon i salsa barbacoa', 'Mozzarella, oregano, bacon and barbecue sauce', 'Mozzarella, origan, bacon et sauce barbecue']],
    [26, 19.5, ['Ruculenta', 'Ruculenta', 'Ruculenta', 'Ruculenta'], ['Jamón serrano, rúcula, virutas de parmesano y olivas negras', 'Pernil serrà, ruca, encenalls de parmesà i olives negres', 'Serrano ham, rocket, Parmesan shavings and black olives', 'Jambon serrano, roquette, copeaux de parmesan et olives noires']],
    [27, 13.5, ['Cuatro quesos', 'Quatre formatges', 'Four cheese', 'Quatre fromages'], ['Mozzarella, cheddar, emmental y queso azul', 'Mozzarella, cheddar, emmental i formatge blau', 'Mozzarella, cheddar, Emmental and blue cheese', 'Mozzarella, cheddar, emmental et bleu']],
    [28, 14.9, ['Carnívora', 'Carnívora', 'Meat feast', 'Carnivore'], ['Salchicha, cebolla, bacon y pulled pork', 'Salsitxa, ceba, bacon i pulled pork', 'Sausage, onion, bacon and pulled pork', 'Saucisse, oignon, bacon et pulled pork']],
    [29, 15.9, ['Vegetariana', 'Vegetariana', 'Vegetarian', 'Végétarienne'], ['Verduras salteadas, mozzarella y olivas negras', 'Verdures saltades, mozzarella i olives negres', 'Sautéed vegetables, mozzarella and black olives', 'Légumes sautés, mozzarella et olives noires']]
  ] },
  { id: 'hamburguesas', ic: 'hamburger', t: ['Hamburguesas', 'Hamburgueses', 'Burgers', 'Burgers'], note: ['Ternera, 220 g, con patatas fritas. Cada una lleva el nombre de una estación del Orient Express', 'Vedella, 220 g, amb patates fregides. Cadascuna porta el nom d’una estació de l’Orient Express', 'Beef, 220 g, with chips. Each one is named after an Orient Express station', 'Bœuf, 220 g, avec frites. Chacun porte le nom d’une gare de l’Orient-Express'], items: [
    [40, 13.5, ['Gare de Paris', 'Gare de Paris', 'Gare de Paris', 'Gare de Paris'], ['Lechuga, tomate y queso', 'Enciam, tomàquet i formatge', 'Lettuce, tomato and cheese', 'Salade, tomate et fromage']],
    [41, 14.95, ['Constantinopla', 'Constantinoble', 'Constantinople', 'Constantinople'], ['Queso, huevo, bacon, lechuga y tomate', 'Formatge, ou, bacon, enciam i tomàquet', 'Cheese, egg, bacon, lettuce and tomato', 'Fromage, œuf, bacon, salade et tomate']],
    [42, 17.5, ['Victoria Station', 'Victoria Station', 'Victoria Station', 'Victoria Station'], ['Cebolla caramelizada, rúcula, huevo y queso azul en un pan rojo con sésamo', 'Ceba caramel·litzada, ruca, ou i formatge blau en un pa vermell amb sèsam', 'Caramelised onion, rocket, egg and blue cheese in a red sesame bun', 'Oignon caramélisé, roquette, œuf et bleu dans un pain rouge au sésame']],
    [43, 14.9, ['Venezia S. Lucia', 'Venezia S. Lucia', 'Venezia S. Lucia', 'Venezia S. Lucia'], ['Cerdo desmechado a baja temperatura con barbacoa y queso, en pan de carbón activado', 'Porc desfilat a baixa temperatura amb barbacoa i formatge, en pa de carbó actiu', 'Slow-cooked pulled pork with BBQ sauce and cheese in an activated-charcoal bun', 'Porc effiloché basse température, sauce barbecue et fromage, pain au charbon actif']],
    [44, 11.5, ['Vegan burger', 'Vegan burger', 'Vegan burger', 'Burger vegan'], ['Tomate, lechuga y aros de cebolla morada', 'Tomàquet, enciam i anelles de ceba morada', 'Tomato, lettuce and red onion rings', 'Tomate, salade et rondelles d’oignon rouge']]
  ] },
  { id: 'carnes', ic: 'cow', t: ['Nuestras carnes', 'Les nostres carns', 'Our steaks', 'Nos viandes'], note: ['Con patatas fritas', 'Amb patates fregides', 'Served with chips', 'Servies avec des frites'], items: [
    [50, 22.9, ['Entrecot 250 g', 'Entrecot 250 g', 'Sirloin 250 g', 'Entrecôte 250 g'], ['Lomo de Angus nacional', 'Llom d’Angus nacional', 'Spanish Angus sirloin', 'Faux-filet d’Angus espagnol']],
    [51, 19.5, ['Entraña 300 g', 'Entranya 300 g', 'Skirt steak 300 g', 'Hampe 300 g'], ['Con o sin piel', 'Amb pell o sense', 'With or without the skin', 'Avec ou sans la peau']],
    [52, 21.5, ['Churrasco argentino 300 g', 'Xurrasco argentí 300 g', 'Argentinian churrasco 300 g', 'Churrasco argentin 300 g'], ['Vacío fino, magro y sin hueso', 'Vacío fi, magre i sense os', 'Lean flank, boneless', 'Bavette maigre, sans os']],
    [53, 19.5, ['Costillas con salsa barbacoa', 'Costelles amb salsa barbacoa', 'Barbecue ribs', 'Travers sauce barbecue'], ['Cocidas lentamente a baja temperatura', 'Cuites lentament a baixa temperatura', 'Slow-cooked at low temperature', 'Cuits lentement à basse température']],
    [54, 14, ['Pechuga de pollo a la parrilla', 'Pit de pollastre a la graella', 'Grilled chicken breast', 'Blanc de poulet grillé'], null],
    ['56·59', 3, ['Salsas', 'Salses', 'Sauces', 'Sauces'], ['Chimichurri, pimienta, champiñones o barbacoa', 'Chimichurri, pebre, xampinyons o barbacoa', 'Chimichurri, pepper, mushroom or barbecue', 'Chimichurri, poivre, champignons ou barbecue']]
  ] },
  { id: 'paellas', ic: 'cooking-pot', t: ['Paellas', 'Paelles', 'Paellas', 'Paellas'], items: [
    [60, 16.5, ['Marisco', 'Marisc', 'Seafood', 'Fruits de mer'], ['Cigala, calamar, gambas, mejillones, guisantes y pimientos', 'Escamarlà, calamar, gambes, musclos, pèsols i pebrots', 'Langoustine, squid, prawns, mussels, peas and peppers', 'Langoustine, calamar, crevettes, moules, petits pois et poivrons']],
    [61, 15.9, ['Mixta', 'Mixta', 'Mixed', 'Mixte'], ['Pollo, costilla de cerdo, gambas, mejillones, guisantes y pimientos', 'Pollastre, costella de porc, gambes, musclos, pèsols i pebrots', 'Chicken, pork rib, prawns, mussels, peas and peppers', 'Poulet, travers de porc, crevettes, moules, petits pois et poivrons']],
    [62, 12.9, ['Verduras', 'Verdures', 'Vegetable', 'Légumes'], ['Alcachofas, judías, zanahorias, habas, pimientos y guisantes', 'Carxofes, mongetes, pastanagues, faves, pebrots i pèsols', 'Artichokes, green beans, carrots, broad beans, peppers and peas', 'Artichauts, haricots verts, carottes, fèves, poivrons et petits pois']],
    [63, 18, ['Queen Victoria', 'Queen Victoria', 'Queen Victoria', 'Queen Victoria'], ['Paella de marisco, todo pelado', 'Paella de marisc, tot pelat', 'Seafood paella, everything peeled', 'Paella de fruits de mer, tout décortiqué']]
  ] },
  { id: 'pastas', ic: 'bowl-steam', t: ['Pastas', 'Pastes', 'Pasta', 'Pâtes'], items: [
    [80, 18.9, ['Lasaña de verduras (500 g)', 'Lasanya de verdures (500 g)', 'Vegetable lasagne (500 g)', 'Lasagnes aux légumes (500 g)'], null],
    [81, 18.9, ['Lasaña de carne (500 g)', 'Lasanya de carn (500 g)', 'Meat lasagne (500 g)', 'Lasagnes à la viande (500 g)'], null],
    [82, 15.5, ['Fiocchetti de gorgonzola', 'Fiocchetti de gorgonzola', 'Gorgonzola fiocchetti', 'Fiocchetti au gorgonzola'], ['Con salsa cuatro quesos', 'Amb salsa de quatre formatges', 'With four-cheese sauce', 'Sauce quatre fromages']],
    [83, 15.5, ['Raviolis de espinaca y grana padano', 'Raviolis d’espinacs i grana padano', 'Spinach and Grana Padano ravioli', 'Raviolis épinards et grana padano'], ['Con salsa de champiñones', 'Amb salsa de xampinyons', 'With mushroom sauce', 'Sauce aux champignons']],
    [84, 12.9, ['Espaguetis a la boloñesa', 'Espaguetis a la bolonyesa', 'Spaghetti Bolognese', 'Spaghetti bolognaise'], null]
  ] },
  { id: 'postres', ic: 'cake', t: ['Postres', 'Postres', 'Desserts', 'Desserts'], note: ['★ Caseros, de su repostera Valentina', '★ Casolanes, de la seva rebostera Valentina', '★ Homemade by their pastry chef Valentina', '★ Faits maison par leur pâtissière Valentina'], items: [
    [150, 5.5, ['Crep con dulce de leche o Nutella', 'Crep amb dolç de llet o Nutella', 'Crêpe with dulce de leche or Nutella', 'Crêpe dulce de leche ou Nutella'], null],
    [151, 6.5, ['Coulant de chocolate', 'Coulant de xocolata', 'Chocolate fondant', 'Coulant au chocolat'], null],
    [153, 5.5, ['Tiramisú Valentina ★', 'Tiramisú Valentina ★', 'Tiramisu Valentina ★', 'Tiramisu Valentina ★'], null],
    [154, 5.5, ['Mousse de chocolate Valentina ★', 'Mousse de xocolata Valentina ★', 'Chocolate mousse Valentina ★', 'Mousse au chocolat Valentina ★'], null],
    [155, 4.5, ['Helado, 2 bolas', 'Gelat, 2 boles', 'Ice cream, 2 scoops', 'Glace, 2 boules'], ['Chocolate, limón, fresa o nata', 'Xocolata, llimona, maduixa o nata', 'Chocolate, lemon, strawberry or cream', 'Chocolat, citron, fraise ou crème']],
    [156, 5.5, ['Cheesecake Valentina ★', 'Cheesecake Valentina ★', 'Cheesecake Valentina ★', 'Cheesecake Valentina ★'], null],
    [157, 5.9, ['Fresas con nata', 'Maduixes amb nata', 'Strawberries and cream', 'Fraises à la chantilly'], null],
    [158, 6.5, ['Músico', 'Músic', 'Músic (nuts and muscat)', 'Músic (fruits secs et muscat)'], ['Frutos secos con vino moscatel', 'Fruits secs amb vi moscatell', 'Nuts with muscat wine', 'Fruits secs et vin muscat']]
  ] },
  { id: 'infantil', ic: 'baby', t: ['Menú infantil', 'Menú infantil', 'Kids’ menu', 'Menu enfant'], note: ['Con patatas fritas o timbal de arroz', 'Amb patates fregides o timbal d’arròs', 'With chips or a rice timbale', 'Avec frites ou timbale de riz'], items: [
    [111, 4.9, ['Pechuga de pollo', 'Pit de pollastre', 'Chicken breast', 'Blanc de poulet'], null],
    [112, 6.9, ['Hamburguesa de ternera con queso', 'Hamburguesa de vedella amb formatge', 'Beef cheeseburger', 'Cheeseburger de bœuf'], null],
    [113, 5.5, ['Pollo crujiente', 'Pollastre cruixent', 'Crispy chicken', 'Poulet croustillant'], null],
    [114, 4.2, ['2 salchichas', '2 salsitxes', '2 sausages', '2 saucisses'], null]
  ] }
];
