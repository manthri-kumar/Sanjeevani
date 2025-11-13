// src/components/Medicines/Medicines.js
import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  sanjeevaniImg,
  Optimum_Nutrition_Gold_Standard_Whey,
  Tynor_Wrist_Support,
  Mankind_Manforce_Condoms,
  Carbimide_Forte_Vitamin_C,
  HealthKart_Vitamin_D3,
  Dove_Intense_Repair_Shampoo,
  First_Aid_Compact_Kit,
  KY_Jelly,
  MuscleTech_Mass_Tech,
  SBL_Aconite_Napellus_30,
  Dr_ReckewegBC_16,
  Dr_Reckeweg_Nux_Vomica_200,
  Durex_Air_Condoms,
  Durex_Play_Lubricant,
  Dynaplast_Elastic_Adhesivev,
  Family_First_Aid_Box,
  Flamingo_Wrist_Support,
  HealthKart_HK_Vitals_Multivitamin,
  HealthKart_Vitamine_C,
  HealthKart_Vitamine_D3,
  Himalaya_Tentex_Royal,
  LOreal_Total_Repair_5_Conditioner,
  Mamaearth_Onion_Shampoo,
  Mamaearth_Onion_Hair_Oil,
  Musli_Power_Xtra,
  MuscleTech_Platinum_Creatine,
  MyProtein_Impact_Whey_Protein,
  SBL_Bio_Combination_28,
  Sporlac_Probiotic_Capsules,
  Supradyn_Daily,
  TrueBasics_Omega3,
  Tynor_Shoulder_Support,
  Vissco_Knee_Brace,
  VSL3_Probiotic,
  Wheezal_Thuja_Occidentalis_Q,
  WOW_Apple_Cider_Vinegar_Conditioner,
  WOW_Omega_3,
  Cipladine_Providone_Iodine,
  Calcirol_Sachet_Vitamine_D3,
  Dabur_Chyawanprash,
  BigMuscles_Real_Mass,
  Baidhyanath_Chyawanprash,
  BandAid_Flexible_Fabric,
  BigMuscles_Micronized_Creatine,
  Dettol_Antiseptic_Liquid,
  Flamingo_Shoulder_Support,
  Himalayan_Organics_Vitamin_C,
  Parachute_Adavanced_Aloe_Vera_Oil,
  SBL_Belladonna_30,
  AccuSure_Knee_Cap,
  SBL_Arnica_Montana_Q,
  Cipla_Vitamine_D3,
  GNC_Pro_Performance_Creatine,
  Indulekha_Bringha_Hair_Oil,
  Kapiva_Shilajit_Gold,
  Mamaearth_Onion_Conditioner,
  MuscleBlaze_Mass_Gainer,
  MuscleBlaze_Whey_Protein,
  Revital_H_Multivitamin,
  Scalpe_Plus_Anti_Dandruff_Shampoo,
  Skore_Cool_Lubricant,
  Skore_Timeless_Condoms,
  Tynor_Knee_Support,
  Tynor_Wrist_Wrap,
  Vissco_Shoulder_Immobilizer,
  Vizylac_Probiotic,
  Zandu_Chyawanprash_Avaleha,
  HK_Vitals_Fish_Oil,
  Savlon_Antiseptic_Liquid,
  DrReckeweg_Calendula_Q,
  Hansaplast_Regular_Bandage,
  SBL_Bio_Combination_6,
  Vissco_Wrist_Brace,
  Travel_First_Aid_Pouch,
} from "../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Medicines.css";
import MedicineCard from "./MedicinesCard";
import NavbarWithDropdown from "./NavbarWithDropdown";

/* ---------------- helpers ---------------- */
const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const humanize = (slug) =>
  (slug || "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const genPrice = (catIdx, subIdx, n) => {
  const base = 149;
  const step = 70;
  const price = base + ((catIdx * 13 + subIdx * 11 + n * 7) % 10) * step;
  const mrp = price + 120;
  return {
    price,
    mrp,
    discount: `${Math.max(5, Math.min(40, Math.round((1 - price / mrp) * 100)))}% off`,
  };
};

/* --------- NAME → IMAGE map (use any heuristics you like) ---------- */
const IMAGE_MAP = [
  { key: "optimum nutrition gold standard whey", img: Optimum_Nutrition_Gold_Standard_Whey },
  { key: "manforce", img: Mankind_Manforce_Condoms },
  { key: "tynor wrist", img: Tynor_Wrist_Support },
  { key: "carbamide forte vitamin c", img: Carbimide_Forte_Vitamin_C },
  { key: "healthkart vitamin d3", img: HealthKart_Vitamin_D3 },
  { key: "dove intense repair shampoo", img: Dove_Intense_Repair_Shampoo },
  { key: "first aid compact kit", img: First_Aid_Compact_Kit },
  { key: "k-y jelly", img: KY_Jelly },
  { key: "muscletech mass tech", img: MuscleTech_Mass_Tech },
  { key: "sbl aconite napellus 30", img: SBL_Aconite_Napellus_30 },
  { key: "dr reckeweg bc 16", img: Dr_ReckewegBC_16 },
  { key: "durex air condoms", img: Durex_Air_Condoms },
  { key: "durex play lubricant", img: Durex_Play_Lubricant },
  { key: "dynaplast elastic adhesive", img: Dynaplast_Elastic_Adhesivev },
  { key: "family first aid box", img: Family_First_Aid_Box },
  { key: "flamingo wrist support", img: Flamingo_Wrist_Support },
  { key: "healthkart hk vitals multivitamin", img: HealthKart_HK_Vitals_Multivitamin },
  { key: "healthkart vitamin c", img: HealthKart_Vitamine_C },
  { key: "healthkart vitamin d3", img: HealthKart_Vitamine_D3 },
  { key: "himalaya tentex royal", img: Himalaya_Tentex_Royal },
  { key: "loreal total repair 5 conditioner", img: LOreal_Total_Repair_5_Conditioner },
  { key: "mamaearth onion shampoo", img: Mamaearth_Onion_Shampoo },
  { key: "mamaearth onion hair oil", img: Mamaearth_Onion_Hair_Oil },
  { key: "musli power x-tra", img: Musli_Power_Xtra },
  { key: "muscletech platinum creatine", img: MuscleTech_Platinum_Creatine },
  { key: "myprotein impact whey", img: MyProtein_Impact_Whey_Protein },
  { key: "sbl bio-combination 28", img: SBL_Bio_Combination_28 },
  { key: "sporlac probiotic capsules", img: Sporlac_Probiotic_Capsules },
  { key: "supradyn daily", img: Supradyn_Daily },
  { key: "truebasics omega-3", img: TrueBasics_Omega3 },
  { key: "tynor shoulder support", img: Tynor_Shoulder_Support },
  { key: "vissco knee brace", img: Vissco_Knee_Brace },
  { key: "vsl#3 probiotic", img: VSL3_Probiotic },
  { key: "wheezal thuja occidentalis q", img: Wheezal_Thuja_Occidentalis_Q },
  { key: "wow apple cider vinegar conditioner", img: WOW_Apple_Cider_Vinegar_Conditioner },
  { key: "wow omega-3", img: WOW_Omega_3 },
  { key: "cipladine povidone iodine", img: Cipladine_Providone_Iodine },
  { key: "calcirol sachet vitamin d3", img: Calcirol_Sachet_Vitamine_D3 },
  { key: "dabur chyawanprash", img: Dabur_Chyawanprash },
  { key: "bigmuscles real mass", img: BigMuscles_Real_Mass },
  { key: "dr reckeweg nux vomica 200", img: Dr_Reckeweg_Nux_Vomica_200 },
  { key: "baidhyanath chyawanprash", img: Baidhyanath_Chyawanprash },
  { key: "band-aid flexible fabric", img: BandAid_Flexible_Fabric },
  { key: "bigmuscles micronized creatine", img: BigMuscles_Micronized_Creatine },
  { key: "dettol antiseptic liquid", img: Dettol_Antiseptic_Liquid },
  { key: "flamingo shoulder support", img: Flamingo_Shoulder_Support },
  { key: "himalayan organics vitamin c", img: Himalayan_Organics_Vitamin_C },
  { key: "parachute advanced aloe vera oil", img: Parachute_Adavanced_Aloe_Vera_Oil },
  { key: "sbl belladonna 30", img: SBL_Belladonna_30 },
  { key: "accusure knee cap", img: AccuSure_Knee_Cap },
  { key: "sbl arnica montana q", img: SBL_Arnica_Montana_Q },
  { key: "cipla vitamin d3", img: Cipla_Vitamine_D3 },
  { key: "gnc pro performance creatine", img: GNC_Pro_Performance_Creatine },
  { key: "indulekha bringha hair oil", img: Indulekha_Bringha_Hair_Oil },
  { key: "kapiva shilajit gold", img: Kapiva_Shilajit_Gold },
  { key: "mamaearth onion conditioner", img: Mamaearth_Onion_Conditioner },
  { key: "muscleblaze mass gainer", img: MuscleBlaze_Mass_Gainer },
  { key: "muscleblaze whey protein", img: MuscleBlaze_Whey_Protein },
  { key: "revital h multivitamin", img: Revital_H_Multivitamin },
  { key: "scalpe plus anti-dandruff shampoo", img: Scalpe_Plus_Anti_Dandruff_Shampoo },
  { key: "skore cool lubricant", img: Skore_Cool_Lubricant },
  { key: "skore timeless condoms", img: Skore_Timeless_Condoms },
  { key: "tynor knee support", img: Tynor_Knee_Support },
  { key: "tynor wrist wrap", img: Tynor_Wrist_Wrap },
  { key: "vissco shoulder immobilizer", img: Vissco_Shoulder_Immobilizer },
  { key: "vizylac probiotic", img: Vizylac_Probiotic },
  { key: "zandu chyawanprash avaleha", img: Zandu_Chyawanprash_Avaleha },
  { key: "hk vitals fish oil", img: HK_Vitals_Fish_Oil },
  { key: "savlon antiseptic liquid", img: Savlon_Antiseptic_Liquid },
  { key: "hansaplast regular bandage", img: Hansaplast_Regular_Bandage },
  { key: "vissco wrist brace", img: Vissco_Wrist_Brace },
  { key: "travel first aid pouch", img: Travel_First_Aid_Pouch },
];

const getImageFor = (productName) => {
  const name = (productName || "").toLowerCase();
  const found = IMAGE_MAP.find((m) => name.includes(m.key));
  return found ? found.img : sanjeevaniImg; // fallback if no match
};

/* ---------------- catalog spec ---------------- */
const CATALOG = [
  {
    category: "Hair Care",
    subs: {
      Shampoos: [
        "Scalpe Plus Anti-Dandruff Shampoo",
        "Mamaearth Onion Shampoo",
        "Dove Intense Repair Shampoo",
      ],
      Conditioners: [
        "Mamaearth Onion Conditioner",
        "loreal total repair 5 conditioner",
        "WOW Apple Cider Vinegar Conditioner",
      ],
      "Hair Oils": [
        "Indulekha Bringha Hair Oil",
        "Parachute Advanced Aloe Vera Oil",
        "Mamaearth Onion Hair Oil",
      ],
    },
  },
  {
    category: "Fitness & Health",
    subs: {
      "Protein Supplements": [
        "Optimum Nutrition Gold Standard Whey",
        "MuscleBlaze Whey Protein",
        "MyProtein Impact Whey",
      ],
      "Mass Gainers": [
        "MuscleTech Mass Tech",
        "MuscleBlaze Mass Gainer",
        "BigMuscles Real Mass",
      ],
      Creatine: [
        "MuscleTech Platinum Creatine",
        "GNC Pro Performance Creatine",
        "BigMuscles Micronized Creatine",
      ],
    },
  },
  {
    category: "Sexual Wellness",
    subs: {
      Contraceptives: [
        "Durex Air Condoms",
        "Mankind Manforce Condoms",
        "Skore Timeless Condoms",
      ],
      Lubricants: ["Durex Play Lubricant", "K-Y Jelly", "Skore Cool Lubricant"],
      "Performance Support": ["Himalaya Tentex Royal", "Musli Power X-tra", "Kapiva Shilajit Gold"],
    },
  },
  {
    category: "Vitamins & Nutrition",
    subs: {
      "Vitamin C": [
        "Himalayan Organics Vitamin C",
        "HealthKart Vitamin C",
        "Carbamide Forte Vitamin C",
      ],
      Multivitamins: [
        "Revital H Multivitamin",
        "HealthKart HK Vitals Multivitamin",
        "Supradyn Daily",
      ],
      "Omega & Fish Oils": ["HK Vitals Fish Oil", "WOW Omega-3", "TrueBasics Omega-3"],
    },
  },
  {
    category: "Supports & Braces",
    subs: {
      "Knee Support": ["Tynor Knee Support", "AccuSure Knee Cap", "Vissco Knee Brace"],
      "Wrist Support": ["Tynor Wrist Wrap", "Vissco Wrist Brace", "Flamingo Wrist Support"],
      "Shoulder Support": ["Tynor Shoulder Support", "Vissco Shoulder Immobilizer", "Flamingo Shoulder Support"],
    },
  },
  {
    category: "Immunity Boosters",
    subs: {
      "Herbal Tonics": ["Dabur Chyawanprash", "Zandu Chyawanprash Avaleha", "Baidhyanath Chyawanprash"],
      "Vitamin D": ["Calcirol Sachet Vitamin D3", "HealthKart Vitamin D3", "Cipla Vitamin D3"],
      Probiotics: ["Sporlac Probiotic Capsules", "VSL#3 Probiotic", "Vizylac Probiotic"],
    },
  },
  {
    category: "Homeopathy",
    subs: {
      "Mother Tinctures": ["SBL Arnica Montana Q", "Wheezal Thuja Occidentalis Q"],
      Dilutions: ["SBL Belladonna 30", "dr reckeweg nux vomica 200", "SBL Aconite Napellus 30"],
      "Biochemic Tablets": [ "dr reckeweg bc 16", "SBL Bio-Combination 28"],
    },
  },
  {
    category: "First Aid",
    subs: {
      Bandages: ["Hansaplast Regular Bandage", "Band-Aid Flexible Fabric", "Dynaplast Elastic Adhesive"],
      Antiseptics: ["Savlon Antiseptic Liquid", "Dettol Antiseptic Liquid", "Cipladine Povidone Iodine"],
      "Medical Kits": ["First Aid Compact Kit", "Travel First Aid Pouch", "Family First Aid Box"],
    },
  },
];

/* ---------------- build the products list ---------------- */
const PRODUCTS = (() => {
  const list = [];
  CATALOG.forEach((cat, catIdx) => {
    const categorySlug = slugify(cat.category);
    const subNames = Object.keys(cat.subs || {});
    subNames.forEach((subName, subIdx) => {
      const subSlug = slugify(subName);
      const names = cat.subs[subName] || [];
      names.slice(0, 3).forEach((prodName, n) => {
        const { price, mrp, discount } = genPrice(catIdx, subIdx, n + 1);
        list.push({
          id: `${categorySlug}-${subSlug}-${n + 1}`,
          name: prodName,
          image: getImageFor(prodName),     // <-- HERE we apply the product image
          price,
          mrp,
          discount,
          description: `${prodName} — ${subName} under ${cat.category}.`,
          category: cat.category,
          subCategory: subName,
          categorySlug,
          subSlug,
        });
      });
    });
  });
  return list;
})();

/* ---------------- component ---------------- */
function Medicines({ handleAddToCart }) {
  const [sortOption, setSortOption] = React.useState("relevance");
  const [searchParams] = useSearchParams();

  const cat = searchParams.get("cat") || "";
  const sub = searchParams.get("sub") || "";

  const images = [sanjeevaniImg, sanjeevaniImg, sanjeevaniImg];

  const sortList = (list) => {
    if (sortOption === "price-low-to-high") return [...list].sort((a, b) => a.price - b.price);
    if (sortOption === "price-high-to-low") return [...list].sort((a, b) => b.price - a.price);
    return list;
  };

  const filtered = React.useMemo(() => {
    return PRODUCTS.filter((p) => {
      const byCat = cat ? p.categorySlug === cat : true;
      const bySub = sub ? p.subSlug === sub : true;
      return byCat && bySub;
    });
  }, [cat, sub]);

  const sortedProducts = React.useMemo(() => sortList(filtered), [filtered, sortOption]);

  const heading =
    cat && sub ? `${humanize(cat)} • ${humanize(sub)}`
              : cat ? humanize(cat)
              : "All Medicines";

  return (
    <div>
      <NavbarWithDropdown />

      {/* Banner / Slider */}
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`Slide ${i + 1}`} style={{ width: "100%" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Heading + Sort */}
      <section className="product-display">
        <div className="product-sort-container">
          <h2 className="category-heading">{heading}</h2>

          <div className="sort-row">
            <span className="sort-label">Sort By:</span>
            <select
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {sortedProducts.length === 0 ? (
            <div className="empty">No products found in this category.</div>
          ) : (
            sortedProducts.map((product) => (
              <MedicineCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Medicines;