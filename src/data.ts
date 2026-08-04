import type { SupplyItem, GradeInfo, SupplyOption } from './types';

export const gradeInfo: Record<string, GradeInfo> = {
  k:  { key: 'k', title: 'Kindergarten', subtitle: 'Ages 5–6 · First school year', iconClass: 'grade-k' },
  '1': { key: '1', title: '1st Grade',     subtitle: 'Ages 6–7 · Building reading & writing', iconClass: 'grade-1' },
  '2': { key: '2', title: '2nd Grade',     subtitle: 'Ages 7–8 · More subjects, more independence', iconClass: 'grade-2' },
  '3': { key: '3', title: '3rd Grade',     subtitle: 'Ages 8–9 · Transition year', iconClass: 'grade-3' },
  '4': { key: '4', title: '4th Grade',     subtitle: 'Ages 9–10', iconClass: 'grade-4' },
  '5': { key: '5', title: '5th Grade',     subtitle: 'Ages 10–11 · Middle school prep', iconClass: 'grade-5' },
};

export const grades = ['k', '1', '2', '3', '4', '5'];

const IMG = {
  backpack:   'https://m.media-amazon.com/images/I/61bbyHMQ4xL._AC_SX466_.jpg',
  lunchbox:   'https://m.media-amazon.com/images/I/81K4caCR1tL._AC_SX569_.jpg',
  pencils:    'https://m.media-amazon.com/images/I/61Wd-8tcUFL._AC_SX425_.jpg',
  crayons:    'https://m.media-amazon.com/images/I/71-6xls--oL._AC_SX569_.jpg',
  markers:    'https://m.media-amazon.com/images/I/81oGqFUgN-L._AC_SX569_.jpg',
  colored:    'https://m.media-amazon.com/images/I/711qylvVF9L._AC_SY879_.jpg',
  glue:       'https://m.media-amazon.com/images/I/81dWHZqx6iL._SX425_.jpg',
  scissors:   'https://m.media-amazon.com/images/I/61mWRihnbFL._AC_SX569_.jpg',
  notebooks:  'https://m.media-amazon.com/images/I/81BHKAnoKQL._AC_SX425_.jpg',
  folders:    'https://m.media-amazon.com/images/I/61S2KcQRFjL._AC_SX425_.jpg',
  expo:       'https://m.media-amazon.com/images/I/81ZQ4C3jBCL._AC_SX425_.jpg',
  water:      'https://m.media-amazon.com/images/I/61jJkCwwNSL._AC_SX569_.jpg',
  headphones: 'https://m.media-amazon.com/images/I/61sW8UNU0XL._AC_SX425_.jpg',
  pencilcase: 'https://m.media-amazon.com/images/I/71R8UhxSc-L._AC_SX425_.jpg',
  pouch:      'https://m.media-amazon.com/images/I/71ER4J7omcL._AC_SX385_.jpg',
  girlbckpk:  'https://m.media-amazon.com/images/I/714m2kqkUvL._AC_SX425_.jpg',
  bento:      'https://m.media-amazon.com/images/I/71VKXcaB8QL._AC_SX569_.jpg',
  pinklunch:  'https://m.media-amazon.com/images/I/91OGmCk2DTL._AC_SX569_.jpg',
  water12:    'https://m.media-amazon.com/images/I/51C3Jby5XoL._AC_SX569_.jpg',
  smock:      'https://m.media-amazon.com/images/I/61DuT8E6O9L._AC_SX466_.jpg',
  highlighter: 'https://m.media-amazon.com/images/I/81DIdaBnl2L._AC_SX425_.jpg',
  ruler:      'https://m.media-amazon.com/images/I/51nR-2kuSvL._AC_SX569_.jpg',
  indexcards: 'https://m.media-amazon.com/images/I/61-abr9bylL._AC_SX425_.jpg',
};

// Helper: pick two options per grade tier
function opts(rec: SupplyOption, alt: SupplyOption): SupplyOption[] {
  return [rec, alt];
}

// ─── Backpack ───────────────────────────────────────────────
function backpackOpts(g: number, gender: 'boy' | 'girl'): SupplyOption[] {
  if (gender === 'boy') {
    if (g <= 1) return opts(
      { name: 'Mini Kids Backpack', desc: 'Compact 15" backpack sized for small frames. Lightweight with chest clip.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: true },
      { name: 'Standard Kids Backpack', desc: 'Padded straps, multiple compartments, fits standard desks.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: false }
    );
    if (g <= 3) return opts(
      { name: 'Standard Kids Backpack', desc: 'Padded straps, multiple compartments, fits standard desks.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: true },
      { name: 'Character Print Backpack', desc: 'Fun themed print with the same quality and storage.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: false }
    );
    return opts(
      { name: 'Laptop Backpack', desc: 'Padded laptop sleeve + organizer pockets. Built for heavier textbooks.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: true },
      { name: 'Character Print Backpack', desc: 'Fun themed print with the same quality and storage.', link: 'https://www.amazon.com/dp/B0CJ2XDTGH', rec: false }
    );
  }
  if (g <= 1) return opts(
    { name: 'Mini Kids Backpack', desc: 'Compact 15" backpack sized for small frames. Lightweight with chest clip.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: true },
    { name: 'Colorful Kids Backpack', desc: 'Bright pattern, padded straps, plenty of pockets.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Colorful Kids Backpack', desc: 'Bright pattern, padded straps, plenty of pockets.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: true },
    { name: 'Trendy Print Backpack', desc: 'Popular colors with a padded laptop sleeve for older grades.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: false }
  );
  return opts(
    { name: 'Trendy Print Backpack', desc: 'Popular colors with a padded laptop sleeve for older grades.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: true },
    { name: 'Fashion Backpack', desc: 'Stylish design with multiple compartments. Great for overnight field trips.', link: 'https://www.amazon.com/dp/B0D91VX1RN', rec: false }
  );
}

// ─── Lunchbox ───────────────────────────────────────────────
function lunchboxOpts(g: number, gender: 'boy' | 'girl'): SupplyOption[] {
  if (gender === 'boy') {
    if (g <= 1) return opts(
      { name: 'Insulated Soft Lunchbox', desc: 'Soft-sided, insulated, easy-carry handle. Fits lunch + ice pack.', link: 'https://www.amazon.com/dp/B07D4CG3JW', rec: true },
      { name: 'Lunch Sack with Zipper', desc: 'Simple insulated sack with easy-zip top. Lightweight and washable.', link: 'https://www.amazon.com/dp/B07D4CG3JW', rec: false }
    );
    if (g <= 3) return opts(
      { name: 'Hard Plastic Lunchbox', desc: 'Durable hard-shell with compartment tray. Keeps food separated.', link: 'https://www.amazon.com/dp/B07D4CG3JW', rec: true },
      { name: 'Insulated Soft Lunchbox', desc: 'Soft-sided, insulated, easy-carry handle. Fits lunch + ice pack.', link: 'https://www.amazon.com/dp/B07D4CG3JW', rec: false }
    );
    return opts(
      { name: 'Insulated Lunch Bag', desc: 'Large capacity with front pocket. Fits full-size containers and drinks.', link: 'https://www.amazon.com/dp/B07D4CG3JW', rec: true },
      { name: 'Bento Lunch Bag', desc: 'Compartmentalized bag with reusable ice pack. Great for packing their own lunch.', link: 'https://www.amazon.com/dp/B0GXJX5HH1', rec: false }
    );
  }
  if (g <= 1) return opts(
    { name: 'Insulated Soft Lunchbox', desc: 'Fun colors, insulated, lightweight. Fits lunch and ice pack.', link: 'https://www.amazon.com/dp/B0C5NSRKVR', rec: true },
    { name: 'Lunch Sack with Zipper', desc: 'Simple insulated sack with easy-zip top. Lightweight and washable.', link: 'https://www.amazon.com/dp/B0C5NSRKVR', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Insulated Soft Lunchbox', desc: 'Fun colors, insulated, lightweight. Fits lunch and ice pack.', link: 'https://www.amazon.com/dp/B0C5NSRKVR', rec: true },
    { name: 'Bento-Style Lunchbox', desc: 'Compartmentalized bento bag with reusable ice pack.', link: 'https://www.amazon.com/dp/B0GXJX5HH1', rec: false }
  );
  return opts(
    { name: 'Bento-Style Lunchbox', desc: 'Compartmentalized bento bag with reusable ice pack.', link: 'https://www.amazon.com/dp/B0GXJX5HH1', rec: true },
    { name: 'Large Insulated Tote', desc: 'Spacious tote-style lunch bag. Fits multiple containers and a water bottle.', link: 'https://www.amazon.com/dp/B0C5NSRKVR', rec: false }
  );
}

// ─── Pencils ────────────────────────────────────────────────
function pencilOpts(g: number): SupplyOption[] {
  if (g === 0) return opts(
    { name: 'Fat Primary Pencils (12-Pack)', desc: 'Thick triangular grip designed for small hands learning to write.', link: 'https://www.amazon.com/dp/B07TCJPMKM', rec: true },
    { name: 'Pre-Sharpened #2 Pencils', desc: 'Standard Ticonderoga-style. Pre-sharpened, ready to go.', link: 'https://www.amazon.com/dp/B0D124ZK46', rec: false }
  );
  if (g <= 2) return opts(
    { name: 'Pre-Sharpened #2 Pencils (24-Pack)', desc: 'Standard Ticonderoga-style. Pre-sharpened with erasers. Class pack.', link: 'https://www.amazon.com/dp/B0D124ZK46', rec: true },
    { name: 'Fat Primary Pencils', desc: 'Thick triangular grip — still helpful for emerging writers.', link: 'https://www.amazon.com/dp/B07TCJPMKM', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Mechanical Pencils 0.7mm', desc: 'No sharpening needed. Sturdy 0.7mm lead, includes refills.', link: 'https://www.amazon.com/dp/B07RZSVR71', rec: true },
    { name: 'Classic #2 Ticonderoga', desc: 'The gold standard wooden pencil. Pre-sharpened with erasers.', link: 'https://www.amazon.com/dp/B0D124ZK46', rec: false }
  );
  return opts(
    { name: 'Mechanical Pencils 0.5mm', desc: 'Fine 0.5mm lead for precise writing. Bulk pack with extra lead and erasers.', link: 'https://www.amazon.com/dp/B07RZSVR71', rec: true },
    { name: 'Mechanical Pencils 0.7mm', desc: 'Sturdy 0.7mm lead — a bit more forgiving for faster writing.', link: 'https://www.amazon.com/dp/B07RZSVR71', rec: false }
  );
}

// ─── Crayons ────────────────────────────────────────────────
function crayonOpts(g: number): SupplyOption[] {
  if (g === 0) return opts(
    { name: 'Crayola 24-Count', desc: 'Perfect starter count — enough colors without overwhelming.', link: 'https://www.amazon.com/dp/B000RTNMB8', rec: true },
    { name: 'Crayola 8-Count Basic', desc: 'Small pack with essential colors. Easy for small hands.', link: 'https://www.amazon.com/dp/B00BD2TKT4', rec: false }
  );
  if (g <= 2) return opts(
    { name: 'Crayola 24-Count', desc: 'Perfect starter count — enough colors without overwhelming.', link: 'https://www.amazon.com/dp/B000RTNMB8', rec: true },
    { name: 'Crayola 64-Count', desc: 'Bigger variety for bigger projects. Includes built-in sharpener.', link: 'https://www.amazon.com/dp/B00004TNSB', rec: false }
  );
  return opts(
    { name: 'Crayola 64-Count', desc: 'Big variety for maps, diagrams, and detailed illustrations. Includes sharpener.', link: 'https://www.amazon.com/dp/B00004TNSB', rec: true },
    { name: 'Crayola 24-Count', desc: 'Solid mid-size pack. Plenty of colors without the bulk.', link: 'https://www.amazon.com/dp/B000RTNMB8', rec: false }
  );
}

// ─── Markers ────────────────────────────────────────────────
function markerOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Broad Line Washable 10-Count', desc: 'Classic broad tip, washable ink. Great for posters and big shapes.', link: 'https://www.amazon.com/dp/B00448JPTQ', rec: true },
    { name: 'Fine Line Markers', desc: 'Thinner tips for detailed work. Still washable.', link: 'https://www.amazon.com/dp/B07C7H6XMJ', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Broad Line Washable 10-Count', desc: 'Classic broad tip, washable ink. Great for posters and big shapes.', link: 'https://www.amazon.com/dp/B00448JPTQ', rec: true },
    { name: 'Fine Line Markers', desc: 'Thinner tips for detailed work. Still washable.', link: 'https://www.amazon.com/dp/B07C7H6XMJ', rec: false }
  );
  return opts(
    { name: 'Fine Line Markers 10-Count', desc: 'Precise fine tips for diagrams, maps, and projects. 10 vivid colors.', link: 'https://www.amazon.com/dp/B07C7H6XMJ', rec: true },
    { name: 'Broad Line Washable', desc: 'Classic broad tip — still useful for posters. Washable ink.', link: 'https://www.amazon.com/dp/B00448JPTQ', rec: false }
  );
}

// ─── Colored Pencils ────────────────────────────────────────
function coloredPencilOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Crayola 12-Count', desc: 'Pre-sharpened 12 core colors — plenty for drawings and labels.', link: 'https://www.amazon.com/dp/B0033M0LZG', rec: true },
    { name: 'Crayola 24-Count', desc: 'Double the colors for more creative freedom. Includes sharpener.', link: 'https://www.amazon.com/dp/B00006IEE3', rec: false }
  );
  return opts(
    { name: 'Crayola 24-Count', desc: 'Great range for maps, diagrams, and illustrations. Includes sharpener.', link: 'https://www.amazon.com/dp/B00006IEE3', rec: true },
    { name: 'Crayola 12-Count', desc: 'Smaller pack. Enough basics if your child isn\'t big on coloring.', link: 'https://www.amazon.com/dp/B0033M0LZG', rec: false }
  );
}

// ─── Glue ───────────────────────────────────────────────────
function glueOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Glue Sticks (6-Pack)', desc: 'Purple-to-clear formula so kids see where they\'ve glued. Washable, no mess.', link: 'https://www.amazon.com/dp/B003ULBP9Q', rec: true },
    { name: 'Washable Liquid Glue', desc: 'Classic white glue with no-clog tip. Good for mixed media.', link: 'https://www.amazon.com/dp/B00006IEE6', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Glue Sticks (10-Pack)', desc: 'Bulk pack of purple-to-clear sticks. Projects get bigger — stock up.', link: 'https://www.amazon.com/dp/B003ULBP9Q', rec: true },
    { name: 'Glue Sticks (4-Pack)', desc: 'Smaller pack for light use. Supplement with liquid glue as needed.', link: 'https://www.amazon.com/dp/B00N3LJ5WM', rec: false }
  );
  return opts(
    { name: 'Glue Sticks (10-Pack)', desc: 'Bulk pack of purple-to-clear sticks. Projects get bigger — stock up.', link: 'https://www.amazon.com/dp/B003ULBP9Q', rec: true },
    { name: 'Elmer\'s School Glue Gallon', desc: 'Economy-size refill for the classroom. Great for group projects and refills.', link: 'https://www.amazon.com/dp/B00006IEE6', rec: false }
  );
}

// ─── Scissors ───────────────────────────────────────────────
function scissorsOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Blunt Tip Safety Scissors', desc: 'Rounded tips for safety. 5" stainless steel blades.', link: 'https://www.amazon.com/dp/B00TJSS9ZW', rec: true },
    { name: 'Pointed Tip Scissors', desc: 'Sharper points for more precise cutting.', link: 'https://www.amazon.com/dp/B09M2TCXG3', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Pointed Tip Scissors 5"', desc: 'Precise pointed tips for detailed cutting. Stainless steel blades.', link: 'https://www.amazon.com/dp/B09M2TCXG3', rec: true },
    { name: 'Blunt Tip Scissors', desc: 'Safer rounded tips. Still effective for paper and craft projects.', link: 'https://www.amazon.com/dp/B00TJSS9ZW', rec: false }
  );
  return opts(
    { name: 'Pointed Tip Scissors 6"', desc: 'Precise pointed tips for detailed cutting. Stainless steel, comfortable grip.', link: 'https://www.amazon.com/dp/B09M2TCXG3', rec: true },
    { name: 'Pointed Tip Scissors 5"', desc: 'Smaller pointed scissors. Still good for detailed work.', link: 'https://www.amazon.com/dp/B09M2TCXG3', rec: false }
  );
}

// ─── Notebooks ──────────────────────────────────────────────
function notebookOpts(g: number): SupplyOption[] {
  if (g === 0) return opts(
    { name: 'Primary Journal (Dashed Midline)', desc: 'Top half blank for drawing, bottom half primary-ruled with dashed midline.', link: 'https://www.amazon.com/dp/B07PF1DJGT', rec: true },
    { name: 'Wide Ruled Composition', desc: 'Standard wide-ruled composition book. Marble cover, 100 sheets.', link: 'https://www.amazon.com/dp/B0DZNYWX55', rec: false }
  );
  if (g <= 2) return opts(
    { name: 'Wide Ruled Spiral Notebooks (3-Pack)', desc: 'Three 70-sheet wide-ruled spirals. One per subject.', link: 'https://www.amazon.com/dp/B0DZNYWX55', rec: true },
    { name: 'Wide Ruled Composition Book', desc: 'Single marble composition notebook. 100 sheets, sewn binding.', link: 'https://www.amazon.com/dp/B0DZNYWX55', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Wide Ruled Spiral Notebooks (5-Pack)', desc: 'Five subject-specific spirals. Wide rule for developing handwriting.', link: 'https://www.amazon.com/dp/B0DZNYWX55', rec: true },
    { name: 'College Ruled Spiral Notebooks (3-Pack)', desc: 'College rule for more lines per page. Good for transitioning.', link: 'https://www.amazon.com/dp/B0B1LB6V59', rec: false }
  );
  return opts(
    { name: 'College Ruled Spiral Notebooks (5-Pack)', desc: '5 subject-specific spirals with college rule. More lines per page.', link: 'https://www.amazon.com/dp/B0B1LB6V59', rec: true },
    { name: '5-Subject Notebook', desc: 'Single 5-subject notebook with dividers built in. Keeps everything together.', link: 'https://www.amazon.com/dp/B0B1LB6V59', rec: false }
  );
}

// ─── Organization ───────────────────────────────────────────
function orgOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: '2-Pocket Folders (8-Pack)', desc: 'Eight assorted color folders — one for each subject. Durable poly.', link: 'https://www.amazon.com/dp/B07K8XVD11', rec: true },
    { name: 'Folder with Prongs', desc: '2-pocket folder with metal prongs. Keeps loose worksheets secure.', link: 'https://www.amazon.com/dp/B0BR6QJKWB', rec: false }
  );
  if (g <= 3) return opts(
    { name: '2-Pocket Folders (8-Pack)', desc: 'Eight assorted color folders — one for each subject. Durable poly.', link: 'https://www.amazon.com/dp/B07K8XVD11', rec: true },
    { name: '1½" D-Ring Binder', desc: 'Sturdy binder with subject dividers. D-ring holds more pages.', link: 'https://www.amazon.com/dp/B0C8R7NH9R', rec: false }
  );
  return opts(
    { name: '1½" D-Ring Binder', desc: 'Sturdy binder with subject dividers. D-ring holds more pages.', link: 'https://www.amazon.com/dp/B0C8R7NH9R', rec: true },
    { name: '2-Inch Binder with Pockets', desc: 'Extra capacity for 4th-5th grade workload. Includes inside pockets.', link: 'https://www.amazon.com/dp/B0C8R7NH9R', rec: false }
  );
}

// ─── Dry Erase Markers ──────────────────────────────────────
function dryEraseOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Low-Odor Fine Tip (4-Pack)', desc: 'Fine tip for small handwriting practice. Low-odor, assorted colors.', link: 'https://www.amazon.com/dp/B00006JNK2', rec: true },
    { name: 'Chisel Tip Dry Erase (4-Pack)', desc: 'Chisel tip for broad and fine lines. Standard classroom choice.', link: 'https://www.amazon.com/dp/B00006JZCB', rec: false }
  );
  return opts(
    { name: 'Low-Odor Fine Tip (4-Pack)', desc: 'Fine tip for small handwriting practice. Low-odor, assorted colors.', link: 'https://www.amazon.com/dp/B00006JNK2', rec: true },
    { name: 'Chisel Tip Dry Erase (4-Pack)', desc: 'Chisel tip for broad and fine lines. Standard classroom choice.', link: 'https://www.amazon.com/dp/B00006JZCB', rec: false }
  );
}

// ─── Highlighters ───────────────────────────────────────────
function highlighterOpts(g: number): SupplyOption[] {
  if (g <= 2) return opts(
    { name: '3-Color Starter Pack', desc: 'Yellow, pink, green — the essentials. Great for beginning readers.', link: 'https://www.amazon.com/dp/B07S74BJN2', rec: true },
    { name: '6-Color Mega Pack', desc: 'Six assorted colors for color-coded studying.', link: 'https://www.amazon.com/dp/B0H2B84B5X', rec: false }
  );
  return opts(
    { name: '6-Color Assorted Pack', desc: 'Six vibrant colors for notes and studying. Fine + chisel dual tip.', link: 'https://www.amazon.com/dp/B0H2B84B5X', rec: true },
    { name: '3-Color Basic Pack', desc: 'Just the essentials. Yellow, pink, blue.', link: 'https://www.amazon.com/dp/B07S74BJN2', rec: false }
  );
}

// ─── Ruler & Geometry ───────────────────────────────────────
function rulerOpts(g: number): SupplyOption[] {
  if (g <= 2) return opts(
    { name: '12" Clear Ruler', desc: 'Standard 12-inch ruler with inches and centimeters. Clear design.', link: 'https://www.amazon.com/dp/B004E3NK92', rec: true },
    { name: 'Ruler + Protractor Set', desc: 'Basic set ready for when geometry is introduced.', link: 'https://www.amazon.com/dp/B0B3LZF6RJ', rec: false }
  );
  if (g <= 3) return opts(
    { name: '12" Clear Ruler + Protractor', desc: 'Ruler and protractor set. Lightweight and clear.', link: 'https://www.amazon.com/dp/B0B3LZF6RJ', rec: true },
    { name: 'Geometry Set (6-Piece)', desc: 'Ruler, protractor, compass, triangles. Everything for math.', link: 'https://www.amazon.com/dp/B07Q1MDSNQ', rec: false }
  );
  return opts(
    { name: 'Geometry Set (6-Piece)', desc: 'Ruler, protractor, compass, triangles. Everything for 4th-5th grade math.', link: 'https://www.amazon.com/dp/B07Q1MDSNQ', rec: true },
    { name: '12" Clear Ruler + Protractor', desc: 'Just the essentials. Lightweight and clear.', link: 'https://www.amazon.com/dp/B0B3LZF6RJ', rec: false }
  );
}

// ─── Index Cards & Notes ────────────────────────────────────
function indexOpts(g: number): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Lined Index Cards (100-Pack)', desc: '3×5 lined cards. Great for vocabulary and sight words.', link: 'https://www.amazon.com/dp/B00INBSU14', rec: true },
    { name: 'Post-it Notes (Assorted)', desc: '3×3 sticky notes in assorted colors. Fun for marking pages.', link: 'https://www.amazon.com/dp/B00006JZ9D', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Lined Index Cards (100-Pack)', desc: '3×5 lined cards. Great for vocabulary, spelling, and math facts.', link: 'https://www.amazon.com/dp/B00INBSU14', rec: true },
    { name: 'Post-it Notes (Assorted)', desc: '3×3 sticky notes in assorted colors. Fun for marking pages.', link: 'https://www.amazon.com/dp/B00006JZ9D', rec: false }
  );
  return opts(
    { name: 'Index Cards + Post-it Combo', desc: 'Both 3×5 lined cards and assorted Post-its. Essential for studying.', link: 'https://www.amazon.com/dp/B00INBSU14', rec: true },
    { name: 'Graph Paper Pad', desc: '4x4 quad graph paper for math plotting and science experiments.', link: 'https://www.amazon.com/dp/B004E3NK92', rec: false }
  );
}

// ─── Water Bottle ───────────────────────────────────────────
function waterOpts(g: number, _gender: 'boy' | 'girl'): SupplyOption[] {
  if (g <= 1) return opts(
    { name: '12–14 oz Spill-Proof Bottle', desc: 'Small, lightweight with spill-proof straw lid. BPA-free.', link: 'https://www.amazon.com/dp/B0CCVH17TP', rec: true },
    { name: '14 oz Sports Bottle', desc: 'Simple pop-top bottle with carrying loop. Easy to open.', link: 'https://www.amazon.com/dp/B0BN17SQRH', rec: false }
  );
  if (g <= 3) return opts(
    { name: '16–18 oz Sport Bottle', desc: 'Slightly bigger with pop-top spout. Fits most backpack pockets.', link: 'https://www.amazon.com/dp/B0BN17SQRH', rec: true },
    { name: '12–14 oz Spill-Proof Bottle', desc: 'Small, lightweight with spill-proof straw lid. BPA-free.', link: 'https://www.amazon.com/dp/B0CCVH17TP', rec: false }
  );
  return opts(
    { name: '20–24 oz Insulated Bottle', desc: 'Stainless steel, double-wall insulated. Keeps water cold all day.', link: 'https://www.amazon.com/dp/B0BN17SQRH', rec: true },
    { name: '24–32 oz Sports Bottle', desc: 'Large capacity with straw or chug lid. Great for active kids.', link: 'https://www.amazon.com/dp/B0BN17SQRH', rec: false }
  );
}

// ─── Headphones ─────────────────────────────────────────────
function headphoneOpts(g: number, _gender: 'boy' | 'girl'): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Over-Ear Volume Limited', desc: '85dB limit protects hearing. Padded headband, comfortable for long use.', link: 'https://www.amazon.com/dp/B088Z22VYF', rec: true },
    { name: 'On-Ear Volume Limited', desc: 'Lighter on-ear design. Also 85dB limited. Good for desk storage.', link: 'https://www.amazon.com/dp/B0DW9C5S18', rec: false }
  );
  return opts(
    { name: 'Over-Ear Volume Limited', desc: '85dB limit protects hearing. Padded headband, comfortable for long use.', link: 'https://www.amazon.com/dp/B088Z22VYF', rec: true },
    { name: 'On-Ear Volume Limited', desc: 'Lighter on-ear design. Also 85dB limited. Good for desk storage.', link: 'https://www.amazon.com/dp/B0DW9C5S18', rec: false }
  );
}

// ─── Pencil Case ────────────────────────────────────────────
function pencilCaseOpts(g: number, _gender: 'boy' | 'girl'): SupplyOption[] {
  if (g <= 1) return opts(
    { name: 'Hard Plastic Pencil Box', desc: 'Sturdy hinged box that fits in a standard desk.', link: 'https://www.amazon.com/dp/B098GGFZQ3', rec: true },
    { name: 'Zipper Pencil Pouch', desc: 'Soft fabric pouch with smooth zipper. Fits in folders or binders.', link: 'https://www.amazon.com/dp/B0BFM67M4D', rec: false }
  );
  if (g <= 3) return opts(
    { name: 'Hard Plastic Pencil Box', desc: 'Sturdy hinged box that fits in a standard desk.', link: 'https://www.amazon.com/dp/B098GGFZQ3', rec: true },
    { name: 'Zipper Pencil Pouch', desc: 'Soft fabric pouch with smooth zipper. Fits in folders or binders.', link: 'https://www.amazon.com/dp/B0BFM67M4D', rec: false }
  );
  return opts(
    { name: 'Large Zipper Pencil Pouch', desc: 'Extra-large, binder-friendly. Fits highlighters, pens, and colored pencils.', link: 'https://www.amazon.com/dp/B0BFM67M4D', rec: true },
    { name: 'Hard Plastic Pencil Box', desc: 'Classic hard box. Organizes smaller items well.', link: 'https://www.amazon.com/dp/B098GGFZQ3', rec: false }
  );
}

// ─── Build ──────────────────────────────────────────────────
function buildSupplies(grade: number): SupplyItem[] {
  const g = grade;
  const all: SupplyItem[] = [
    {
      icon: '🎒', name: 'Backpack', image: IMG.backpack, gendered: true,
      boy: backpackOpts(g, 'boy'),
      girl: backpackOpts(g, 'girl'),
    },
    {
      icon: '🍱', name: 'Lunchbox', image: IMG.lunchbox, gendered: true,
      boy: lunchboxOpts(g, 'boy'),
      girl: lunchboxOpts(g, 'girl'),
    },
    {
      icon: '✏', name: 'Pencils', image: IMG.pencils, gendered: false,
      options: pencilOpts(g),
    },
    {
      icon: '🖍', name: 'Crayons', image: IMG.crayons, gendered: false,
      options: crayonOpts(g),
    },
    {
      icon: '🖊', name: 'Markers', image: IMG.markers, gendered: false,
      options: markerOpts(g),
    },
    {
      icon: '🎨', name: 'Colored Pencils', image: IMG.colored, gendered: false,
      options: coloredPencilOpts(g),
    },
    {
      icon: '🧴', name: 'Glue', image: IMG.glue, gendered: false,
      options: glueOpts(g),
    },
    {
      icon: '✂', name: 'Scissors', image: IMG.scissors, gendered: false,
      options: scissorsOpts(g),
    },
    {
      icon: '📓', name: 'Notebooks', image: IMG.notebooks, gendered: false,
      options: notebookOpts(g),
    },
    {
      icon: '📁', name: 'Organization', image: IMG.folders, gendered: false,
      options: orgOpts(g),
    },
    {
      icon: '⬜', name: 'Dry Erase Markers', image: IMG.expo, gendered: false,
      options: dryEraseOpts(g),
    },
    {
      icon: '🔆', name: 'Highlighters', image: IMG.highlighter, gendered: false, minGrade: 2,
      options: highlighterOpts(g),
    },
    {
      icon: '📐', name: 'Ruler & Geometry', image: IMG.ruler, gendered: false, minGrade: 2,
      options: rulerOpts(g),
    },
    {
      icon: '📇', name: 'Index Cards & Notes', image: IMG.indexcards, gendered: false, minGrade: 2,
      options: indexOpts(g),
    },
    {
      icon: '💧', name: 'Water Bottle', image: IMG.water, gendered: true,
      boy: waterOpts(g, 'boy'),
      girl: waterOpts(g, 'girl'),
    },
    {
      icon: '🎧', name: 'Headphones', image: IMG.headphones, gendered: true, minGrade: 3,
      boy: headphoneOpts(g, 'boy'),
      girl: headphoneOpts(g, 'girl'),
    },
    {
      icon: '🧰', name: 'Pencil Case', image: IMG.pencilcase, gendered: true,
      boy: pencilCaseOpts(g, 'boy'),
      girl: pencilCaseOpts(g, 'girl'),
    },
  ];
  return all.filter(item => (item.minGrade ?? 0) <= g);
}

export function getSupplies(grade: string): SupplyItem[] {
  return buildSupplies(Number(grade === 'k' ? 0 : grade));
}