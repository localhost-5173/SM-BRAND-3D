/* Offline product list — used when the backend is not reachable.
   Same shape as the API: slug, name, price_label, spec, badge, tag, category, img, description, specs */
window.SM_FALLBACK = [
  // ---- machines ----
  {slug:'sm450',name:'SM-450 Eco Semi-Auto',price_label:'Rs 195,000',spec:'15/min • PP 9-12mm • 220V',badge:'Starter',tag:'semi',category:'machines',img:'assets/img/machine-semi.jpg',
   description:'Entry-level semi-automatic strapping machine for small warehouses and shops. Simple controls, low maintenance, and fast to learn.',
   specs:[['Speed','15 straps / min'],['Strap','PP 9–12mm'],['Best for','Under 200 boxes/day'],['Power','220V']]},
  {slug:'sm601',name:'SM-601 Pro Semi-Auto',price_label:'Rs 285,000',spec:'24/min • PP 9-15mm • 220V',badge:'Best Seller',tag:'semi',category:'machines',img:'assets/img/machine-semi.jpg',
   description:'Our most popular machine. Handles 200–1200 cartons a day with adjustable tension and seal time. Warranty and free installation included.',
   specs:[['Speed','24 straps / min'],['Strap','PP 9–15mm'],['Best for','200–1200 boxes/day'],['Power','220V'],['Warranty','1 year']]},
  {slug:'sm801',name:'SM-801 Auto Arch',price_label:'Rs 895,000',spec:'35/min • PP/PET • Touchscreen',badge:'Auto',tag:'auto',category:'machines',img:'assets/img/machine-auto.jpg',
   description:'Fully automatic arch strapping machine with touchscreen control. Built to sit inline on a production or export packing line.',
   specs:[['Speed','35 straps / min'],['Strap','PP / PET 9–15mm'],['Best for','1200+ boxes/day'],['Power','220V / 380V'],['Control','Touchscreen']]},
  {slug:'sm950',name:'SM-950 High-Speed',price_label:'Rs 1,250,000',spec:'45/min • Full Auto • Conveyor',badge:'High-Speed',tag:'high',category:'machines',img:'assets/img/machine-auto.jpg',
   description:'High-speed fully automatic machine with conveyor for continuous high-volume lines.',
   specs:[['Speed','45 straps / min'],['Strap','PP / PET'],['Mode','Full auto + conveyor'],['Power','380V']]},
  {slug:'sm620',name:'SM-620 Low Table',price_label:'Rs 310,000',spec:'22/min • Low height • Cartons',badge:'Low Table',tag:'semi',category:'machines',img:'assets/img/machine-semi.jpg',
   description:'Low-height table design for easy loading of heavy cartons, great for ergonomic packing stations.',
   specs:[['Speed','22 straps / min'],['Table','Low height'],['Power','220V']]},
  {slug:'sm810',name:'SM-810 Side Seal Auto',price_label:'Rs 945,000',spec:'Side seal • Bricks / Tiles',badge:'Auto',tag:'auto',category:'machines',img:'assets/img/machine-auto.jpg',
   description:'Side-seal automatic machine designed for bricks, tiles and heavy-duty bundles.',
   specs:[['Seal','Side seal'],['Best for','Bricks, tiles, bundles'],['Power','380V']]},
  // ---- rolls ----
  {slug:'pp-roll-12mm-virgin',name:'PP Roll 12mm Virgin',price_label:'Rs 185 / kg',spec:'2000m • 160kg break • 11 colors',badge:'PP',tag:'pp',category:'rolls',img:'assets/img/rolls.jpg',description:'Virgin PP strapping roll, 12mm. Available in 11 colors. Bulk discount on request.',specs:[['Width','12mm'],['Length','2000m'],['Break strength','160kg']]},
  {slug:'pp-roll-15mm-virgin',name:'PP Roll 15mm Virgin',price_label:'Rs 185 / kg',spec:'1500m • 220kg break',badge:'PP',tag:'pp',category:'rolls',img:'assets/img/rolls.jpg',description:'Virgin PP strapping roll, 15mm, for general carton and bundle strapping.',specs:[['Width','15mm'],['Length','1500m'],['Break strength','220kg']]},
  {slug:'pp-roll-19mm-heavy',name:'PP Roll 19mm Heavy',price_label:'Rs 185 / kg',spec:'1200m • 300kg break',badge:'PP',tag:'pp',category:'rolls',img:'assets/img/rolls.jpg',description:'Heavy-duty 19mm PP roll for large bundles.',specs:[['Width','19mm'],['Length','1200m'],['Break strength','300kg']]},
  {slug:'pet-roll-12mm-green',name:'PET Roll 12mm Green',price_label:'Rs 310 / kg',spec:'1750m • 450kg break',badge:'Export',tag:'pet',category:'rolls',img:'assets/img/rolls.jpg',description:'PET strapping for export-grade packing. Strong with low stretch.',specs:[['Width','12mm'],['Length','1750m'],['Break strength','450kg']]},
  {slug:'pet-roll-15mm-green',name:'PET Roll 15mm Green',price_label:'Rs 310 / kg',spec:'1250m • 780kg break',badge:'Export',tag:'pet',category:'rolls',img:'assets/img/rolls.jpg',description:'15mm PET roll for pallets and export cargo.',specs:[['Width','15mm'],['Length','1250m'],['Break strength','780kg']]},
  {slug:'pet-roll-19mm-black',name:'PET Roll 19mm Black',price_label:'Rs 310 / kg',spec:'900m • 1100kg break',badge:'Heavy',tag:'pet',category:'rolls',img:'assets/img/rolls.jpg',description:'Heavy 19mm PET roll for the toughest loads.',specs:[['Width','19mm'],['Length','900m'],['Break strength','1100kg']]},
  {slug:'metal-seals-12mm',name:'Metal Seals 12mm',price_label:'Rs 2.5 / pc',spec:'1000 pcs / box • Galvanized',badge:'Seals',tag:'acc',category:'rolls',img:'assets/img/rolls.jpg',description:'Galvanized metal seals for PET strapping.',specs:[['Size','12mm'],['Pack','1000 pcs / box']]},
  {slug:'plastic-buckles-15mm',name:'Plastic Buckles 15mm',price_label:'Rs 1.8 / pc',spec:'2000 pcs / bag',badge:'Buckles',tag:'acc',category:'rolls',img:'assets/img/rolls.jpg',description:'Plastic buckles for PP strapping, 15mm.',specs:[['Size','15mm'],['Pack','2000 pcs / bag']]},
  {slug:'stretch-film-23mic',name:'Stretch Film 23mic',price_label:'Rs 520 / kg',spec:'500mm • 300m • Clear/Black',badge:'Film',tag:'acc',category:'rolls',img:'assets/img/rolls.jpg',description:'Stretch film for pallet wrapping.',specs:[['Thickness','23 micron'],['Width','500mm'],['Length','300m']]},
  // ---- battery tools ----
  {slug:'zp-19-battery-tool',name:'ZP-19 Battery Tool',price_label:'Rs 148,000',spec:'PET 13-19mm • 3500N • 2 Batteries',badge:'Cordless',tag:'battery',category:'battery',img:'assets/img/tool-battery.jpg',description:'Cordless PET strapping tool for pallets, export and yard work. Two batteries included, no compressor needed.',specs:[['Strap','PET 13–19mm'],['Tension','3500N'],['Batteries','2 included']]},
  {slug:'zp-16-compact-tool',name:'ZP-16 Compact Tool',price_label:'Rs 125,000',spec:'PET 13-16mm • 2800N • Light',badge:'Compact',tag:'battery',category:'battery',img:'assets/img/tool-hand.jpg',description:'Lighter cordless tool for narrower PET straps.',specs:[['Strap','PET 13–16mm'],['Tension','2800N']]},
  {slug:'xt-32-pneumatic-combo',name:'XT-32 Pneumatic Combo',price_label:'Rs 92,000',spec:'13-19mm PET • Air powered',badge:'Pneumatic',tag:'battery',category:'battery',img:'assets/img/tool-hand.jpg',description:'Air-powered tensioner and sealer combo for workshops with a compressor.',specs:[['Strap','PET 13–19mm'],['Power','Compressed air']]},
  // ---- hand tools ----
  {slug:'pp-tensioner-h-19',name:'PP Tensioner H-19',price_label:'Rs 8,500',spec:'PP 12-19mm • Steel body',badge:'Manual',tag:'hand',category:'hand',img:'assets/img/tool-hand.jpg',description:'Manual tensioner for PP strap.',specs:[['Strap','PP 12–19mm'],['Body','Steel']]},
  {slug:'pet-sealer-s-19',name:'PET Sealer S-19',price_label:'Rs 9,800',spec:'PET 13-19mm • Heavy',badge:'Manual',tag:'hand',category:'hand',img:'assets/img/tool-hand.jpg',description:'Manual sealer for PET strap.',specs:[['Strap','PET 13–19mm']]},
  {slug:'combo-kit-starter',name:'Combo Kit Starter',price_label:'Rs 18,500',spec:'Tensioner + Sealer + 2 Rolls',badge:'Kit',tag:'hand',category:'hand',img:'assets/img/tool-hand.jpg',description:'Starter kit: tensioner, sealer and two rolls.',specs:[['Includes','Tensioner, sealer, 2 rolls']]},
  {slug:'cutter-spare-blades',name:'Cutter / Spare Blades',price_label:'Rs 1,200',spec:'Universal • 5 pcs pack',badge:'Spares',tag:'hand',category:'hand',img:'assets/img/tool-hand.jpg',description:'Replacement cutter blades.',specs:[['Pack','5 pcs']]},
  {slug:'dispenser-cart',name:'Dispenser Cart',price_label:'Rs 22,000',spec:'PP/PET rolls • With brake',badge:'Cart',tag:'hand',category:'hand',img:'assets/img/rolls.jpg',description:'Wheeled dispenser cart with brake for PP and PET rolls.',specs:[['Fits','PP / PET rolls'],['Brake','Yes']]},
  {slug:'seals-12-15-19mm',name:'Seals 12/15/19mm',price_label:'From Rs 1.8',spec:'Galvanized • Bulk box',badge:'Seals',tag:'hand',category:'hand',img:'assets/img/rolls.jpg',description:'Galvanized seals in 12, 15 and 19mm.',specs:[['Sizes','12 / 15 / 19mm']]}
];
