import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SHOE_SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const CLOTH_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["Все", "Кроссовки", "Одежда", "Бег", "Баскетбол", "Скейт", "Повседневные", "Коллаборации"];
const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "discount", label: "Сначала со скидкой" },
];

const IMGS = {
  // оригинальные
  a: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  b: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  c: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
  // одежда старые
  h: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/8e95bc50-c558-40ec-8ee6-a931ac876119.jpg",
  p: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/abf8a216-dd8d-499f-a3a0-0f9b4d3d601d.jpg",
  // новые кроссовки
  r: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/49ee0d51-a313-4915-b2f6-030ba3028b85.jpg",
  k: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/caecc500-484c-4fb2-810c-3d8c045f34bb.jpg",
  g: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/fd31d2ea-7a01-46b6-a505-3356d77efb4b.jpg",
  e: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/a88438e9-e180-4d38-94c4-36a3c3b30b03.jpg",
  // новая одежда
  z: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/f8952023-86ae-413d-937b-4ca9e81820b6.jpg",
  m: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/28313b24-0b42-458e-9c52-260c30f4538c.jpg",
};

const ALL_PRODUCTS = [
  // ── КРОССОВКИ ─────────────────────────────────────────────────────────────
  { id: 1,  name: "Wave Runner 01",       brand: "SneakWave",       category: "Бег",          type: "shoe",  price: 12990, oldPrice: 16990, discount: 23,  tag: "Новинка", sizes: [38,39,40,41,42,43,44], img: IMGS.r },
  { id: 2,  name: "Collab Drop SS25",     brand: "SneakWave × Арт", category: "Коллаборации", type: "shoe",  price: 18500, oldPrice: null,  discount: null, tag: "Лимит",   sizes: [39,40,41,42,43],       img: IMGS.b },
  { id: 3,  name: "Street Archive",       brand: "SneakWave",       category: "Скейт",        type: "shoe",  price: 9990,  oldPrice: 12990, discount: 23,  tag: "Хит",     sizes: [36,37,38,39,40,41,42], img: IMGS.g },
  { id: 4,  name: "Court Classic",        brand: "SneakWave",       category: "Баскетбол",    type: "shoe",  price: 14500, oldPrice: 18000, discount: 19,  tag: "Скидка",  sizes: [40,41,42,43,44,45],    img: IMGS.k },
  { id: 5,  name: "Foam Pro Lite",        brand: "SneakWave",       category: "Повседневные", type: "shoe",  price: 7490,  oldPrice: null,  discount: null, tag: null,      sizes: [36,37,38,39,40,41],    img: IMGS.e },
  { id: 6,  name: "Urban Edge X",         brand: "SneakWave",       category: "Скейт",        type: "shoe",  price: 11200, oldPrice: 14900, discount: 25,  tag: "Скидка",  sizes: [39,40,41,42,43,44],    img: IMGS.g },
  { id: 7,  name: "Eco Future Vol.1",     brand: "SneakWave Eco",   category: "Повседневные", type: "shoe",  price: 10990, oldPrice: null,  discount: null, tag: "Эко",     sizes: [37,38,39,40,41,42,43], img: IMGS.e },
  { id: 8,  name: "Galaxy Boost",         brand: "SneakWave",       category: "Бег",          type: "shoe",  price: 16800, oldPrice: 21000, discount: 20,  tag: "Скидка",  sizes: [40,41,42,43,44,45],    img: IMGS.r },
  { id: 9,  name: "Shadow Low",           brand: "SneakWave",       category: "Скейт",        type: "shoe",  price: 8990,  oldPrice: null,  discount: null, tag: "Новинка", sizes: [38,39,40,41,42],       img: IMGS.k },
  { id: 10, name: "Drift Trainer",        brand: "SneakWave",       category: "Бег",          type: "shoe",  price: 13500, oldPrice: 17000, discount: 21,  tag: "Скидка",  sizes: [39,40,41,42,43,44],    img: IMGS.a },
  { id: 11, name: "Hoop Legend '25",      brand: "SneakWave",       category: "Баскетбол",    type: "shoe",  price: 19900, oldPrice: null,  discount: null, tag: "Лимит",   sizes: [41,42,43,44,45],       img: IMGS.k },
  { id: 12, name: "Velvet Low",           brand: "SneakWave Eco",   category: "Повседневные", type: "shoe",  price: 9200,  oldPrice: 11500, discount: 20,  tag: "Скидка",  sizes: [36,37,38,39,40,41,42], img: IMGS.e },
  { id: 13, name: "Artisan Mule",         brand: "SneakWave × Арт", category: "Коллаборации", type: "shoe",  price: 22000, oldPrice: null,  discount: null, tag: "Лимит",   sizes: [39,40,41,42],          img: IMGS.a },
  { id: 14, name: "Crunch Pro",           brand: "SneakWave",       category: "Баскетбол",    type: "shoe",  price: 15990, oldPrice: 19500, discount: 18,  tag: "Скидка",  sizes: [40,41,42,43,44,45],    img: IMGS.k },
  { id: 15, name: "Air Pulse Run",        brand: "SneakWave",       category: "Бег",          type: "shoe",  price: 11800, oldPrice: null,  discount: null, tag: "Новинка", sizes: [37,38,39,40,41,42,43], img: IMGS.r },
  { id: 16, name: "Canvas Daily",         brand: "SneakWave",       category: "Повседневные", type: "shoe",  price: 5990,  oldPrice: 7990,  discount: 25,  tag: "Скидка",  sizes: [36,37,38,39,40,41],    img: IMGS.e },
  { id: 17, name: "Grind Vulcanized",     brand: "SneakWave",       category: "Скейт",        type: "shoe",  price: 7990,  oldPrice: null,  discount: null, tag: null,      sizes: [38,39,40,41,42,43],    img: IMGS.g },
  { id: 18, name: "Collab x Street Art",  brand: "SneakWave × Арт", category: "Коллаборации", type: "shoe",  price: 24500, oldPrice: null,  discount: null, tag: "Лимит",   sizes: [40,41,42,43],          img: IMGS.b },
  // ── ОДЕЖДА ────────────────────────────────────────────────────────────────
  { id: 19, name: "Oversized Hoodie SW",  brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 4990,  oldPrice: 7490,  discount: 33,  tag: "Скидка",  sizes: ["S","M","L","XL"],          img: IMGS.h },
  { id: 20, name: "Wave Cargo Pants",     brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 5990,  oldPrice: 8990,  discount: 33,  tag: "Скидка",  sizes: ["S","M","L","XL","XXL"],     img: IMGS.p },
  { id: 21, name: "Street Puffer Vest",   brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 6490,  oldPrice: 9990,  discount: 35,  tag: "Хит",     sizes: ["XS","S","M","L","XL"],      img: IMGS.m },
  { id: 22, name: "Jogger Tech Fleece",   brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 3990,  oldPrice: 5490,  discount: 27,  tag: "Скидка",  sizes: ["S","M","L","XL","XXL"],     img: IMGS.p },
  { id: 23, name: "Drop Shoulder Tee",    brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 1990,  oldPrice: 2990,  discount: 33,  tag: "Скидка",  sizes: ["XS","S","M","L"],           img: IMGS.h },
  { id: 24, name: "Collab Bomber SS25",   brand: "SneakWave × Арт", category: "Одежда",       type: "cloth", price: 11900, oldPrice: null,  discount: null, tag: "Лимит",  sizes: ["S","M","L","XL"],           img: IMGS.m },
  { id: 25, name: "Eco Sweatshirt",       brand: "SneakWave Eco",   category: "Одежда",       type: "cloth", price: 4290,  oldPrice: 5990,  discount: 28,  tag: "Эко",     sizes: ["XS","S","M","L","XL","XXL"], img: IMGS.z },
  { id: 26, name: "Wide Track Shorts",    brand: "SneakWave",       category: "Одежда",       type: "cloth", price: 2490,  oldPrice: 3490,  discount: 29,  tag: "Скидка",  sizes: ["S","M","L","XL"],           img: IMGS.z },
];

type Product = typeof ALL_PRODUCTS[0];

interface OrderModalProps {
  product: Product;
  size: number | string;
  onClose: () => void;
}

const ORDER_URL = "https://functions.poehali.dev/b8a59baf-36a8-493f-bafd-a4838968c1b3";

function OrderModal({ product, size, onClose }: OrderModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          product_name: product.name,
          brand: product.brand,
          size: String(size),
          product_price: product.price.toLocaleString("ru-RU") + " ₽",
        }),
      });
      if (!res.ok) throw new Error("error");
      setSent(true);
    } catch {
      setError("Не удалось отправить заказ. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md relative animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-wave-mid hover:text-wave-black transition-colors">
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 bg-[#FF3B1F] flex items-center justify-center mx-auto mb-5">
              <Icon name="Check" size={28} className="text-white" />
            </div>
            <h2 className="font-display text-4xl mb-3">ЗАКАЗ ПРИНЯТ</h2>
            <p className="text-wave-mid mb-6">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
            <button onClick={onClose} className="bg-wave-black text-white px-8 py-3 font-semibold hover:bg-[#FF3B1F] transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <div className="p-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Оформление заказа</span>
            <h2 className="font-display text-3xl mt-1 mb-1">{product.name}</h2>
            <p className="text-wave-mid text-sm mb-6">
              Размер: <strong className="text-wave-black">{size}</strong>
              &nbsp;·&nbsp;
              {product.price.toLocaleString("ru-RU")} ₽
              {product.oldPrice && (
                <span className="line-through ml-2 text-black/30">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
              )}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold tracking-[0.1em] uppercase text-wave-mid block mb-1.5">Ваше имя</label>
                <input
                  required
                  type="text"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-black/12 focus:outline-none focus:border-wave-black text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-[0.1em] uppercase text-wave-mid block mb-1.5">Телефон</label>
                <input
                  required
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-black/12 focus:outline-none focus:border-wave-black text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-[0.1em] uppercase text-wave-mid block mb-1.5">Адрес доставки</label>
                <input
                  required
                  type="text"
                  placeholder="Город, улица, дом, квартира"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-4 py-3 border border-black/12 focus:outline-none focus:border-wave-black text-sm transition-colors"
                />
              </div>
              {error && (
                <p className="text-sm text-[#FF3B1F] border border-[#FF3B1F]/20 bg-[#FF3B1F]/5 px-4 py-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 font-semibold transition-colors mt-2 ${
                  loading
                    ? "bg-black/20 text-black/40 cursor-not-allowed"
                    : "bg-wave-black text-white hover:bg-[#FF3B1F]"
                }`}
              >
                {loading ? "Отправляем..." : "Подтвердить заказ"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const SOCIALS = [
  { label: "Instagram", icon: "Instagram", href: "#" },
  { label: "TikTok", icon: "Music2", href: "#" },
  { label: "Telegram", icon: "Send", href: "#" },
];

export default function Catalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedShoeSize, setSelectedShoeSize] = useState<number | null>(null);
  const [selectedClothSize, setSelectedClothSize] = useState<string | null>(null);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number | string>>({});
  const [orderModal, setOrderModal] = useState<{ product: Product; size: number | string } | null>(null);

  const isClothingTab = activeCategory === "Одежда";
  const isShoeTab = ["Бег","Баскетбол","Скейт","Повседневные","Коллаборации","Кроссовки"].includes(activeCategory);

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (activeCategory === "Кроссовки") result = result.filter((p) => p.type === "shoe");
    else if (activeCategory !== "Все") result = result.filter((p) => p.category === activeCategory);
    if (selectedShoeSize) result = result.filter((p) => p.type === "cloth" || (p.sizes as (number|string)[]).includes(selectedShoeSize));
    if (selectedClothSize) result = result.filter((p) => p.type === "shoe" || (p.sizes as (number|string)[]).includes(selectedClothSize));
    if (onlyDiscount) result = result.filter((p) => p.discount !== null);
    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "discount") result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    return result;
  }, [search, activeCategory, selectedShoeSize, selectedClothSize, onlyDiscount, sortBy]);

  const toggleSize = (productId: number, size: number | string) => {
    setSelectedSizes((prev) =>
      prev[productId] === size ? { ...prev, [productId]: "" } : { ...prev, [productId]: size }
    );
  };

  const handleOrder = (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) return;
    setOrderModal({ product, size });
  };

  const fmt = (p: number) => p.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-wave-white text-wave-black">

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-black/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-wave-mid hover:text-wave-black transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-medium">Главная</span>
          </button>
          <div className="h-4 w-px bg-black/15" />
          <span className="font-display text-2xl tracking-wider">SNEAKWAVE</span>
          <div className="ml-auto flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} title={s.label}
                className="w-9 h-9 flex items-center justify-center border border-black/12 text-wave-mid hover:border-wave-black hover:text-wave-black transition-colors">
                <Icon name={s.icon} size={15} fallback="Link" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Все модели</span>
          <h1 className="font-display text-6xl md:text-8xl mt-1 mb-2">КАТАЛОГ</h1>
          <p className="text-wave-mid">{filtered.length} {filtered.length === 1 ? "товар" : filtered.length < 5 ? "товара" : "товаров"}</p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-wave-mid" />
              <input
                type="text"
                placeholder="Поиск по названию или бренду..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-black/12 bg-white focus:outline-none focus:border-wave-black text-sm placeholder:text-wave-mid transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-wave-mid hover:text-wave-black">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-black/12 bg-white px-4 py-3 text-sm focus:outline-none focus:border-wave-black cursor-pointer min-w-[220px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-wave-black text-wave-white border-wave-black"
                    : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto">
              <button
                onClick={() => setOnlyDiscount(!onlyDiscount)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-colors ${
                  onlyDiscount
                    ? "bg-[#FF3B1F] text-white border-[#FF3B1F]"
                    : "bg-white text-wave-mid border-black/12 hover:border-[#FF3B1F] hover:text-[#FF3B1F]"
                }`}
              >
                <Icon name="Tag" size={14} />
                Только со скидкой
              </button>
            </div>
          </div>

          {!isClothingTab && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.15em] text-wave-mid uppercase mr-2">Размер обуви:</span>
              {SHOE_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedShoeSize(selectedShoeSize === size ? null : size)}
                  className={`w-10 h-10 text-sm font-medium border transition-colors ${
                    selectedShoeSize === size
                      ? "bg-wave-black text-wave-white border-wave-black"
                      : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                  }`}
                >
                  {size}
                </button>
              ))}
              {selectedShoeSize && (
                <button onClick={() => setSelectedShoeSize(null)} className="text-xs text-wave-mid hover:text-wave-black ml-2 underline">Сбросить</button>
              )}
            </div>
          )}
          {!isShoeTab && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.15em] text-wave-mid uppercase mr-2">Размер одежды:</span>
              {CLOTH_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedClothSize(selectedClothSize === size ? null : size)}
                  className={`px-3 h-10 text-sm font-medium border transition-colors ${
                    selectedClothSize === size
                      ? "bg-wave-black text-wave-white border-wave-black"
                      : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                  }`}
                >
                  {size}
                </button>
              ))}
              {selectedClothSize && (
                <button onClick={() => setSelectedClothSize(null)} className="text-xs text-wave-mid hover:text-wave-black ml-2 underline">Сбросить</button>
              )}
            </div>
          )}
        </div>

        {/* PRODUCTS */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <Icon name="SearchX" size={48} className="mx-auto text-black/15 mb-4" />
            <p className="font-display text-3xl text-black/25">НИЧЕГО НЕ НАЙДЕНО</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Все"); setSelectedShoeSize(null); setSelectedClothSize(null); setOnlyDiscount(false); }}
              className="mt-6 text-sm text-wave-mid hover:text-wave-black underline"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const chosenSize = selectedSizes[product.id];
              return (
                <div key={product.id} className="group flex flex-col">
                  <div className="aspect-square overflow-hidden bg-wave-gray mb-4 relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount ? (
                      <span className="absolute top-3 left-3 bg-[#FF3B1F] text-white text-xs font-bold px-2.5 py-1">
                        -{product.discount}%
                      </span>
                    ) : product.tag ? (
                      <span className="absolute top-3 left-3 bg-wave-black text-white text-xs font-semibold px-2.5 py-1">
                        {product.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-3 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs text-wave-mid">{product.brand}</p>
                      {product.type === "cloth" && (
                        <span className="text-[10px] font-bold tracking-wider text-[#FF3B1F] border border-[#FF3B1F] px-1.5 py-0.5 uppercase leading-none">Одежда</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-wave-black leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-wave-black">{fmt(product.price)}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-wave-mid line-through">{fmt(product.oldPrice)}</span>
                      )}
                    </div>
                  </div>

                  {/* Size picker */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.sizes.map((size) => {
                      const isCloth = product.type === "cloth";
                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(product.id, size)}
                          className={`${isCloth ? "px-2.5 h-8" : "w-8 h-8"} text-xs font-medium border transition-colors ${
                            chosenSize === size
                              ? "bg-wave-black text-white border-wave-black"
                              : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleOrder(product)}
                    disabled={!chosenSize}
                    className={`w-full py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      chosenSize
                        ? "bg-wave-black text-wave-white hover:bg-[#FF3B1F] cursor-pointer"
                        : "bg-black/5 text-black/30 cursor-not-allowed"
                    }`}
                  >
                    {chosenSize ? `Заказать — размер ${chosenSize}` : "Выберите размер"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-wave-black text-white mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-wider">SNEAKWAVE</span>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                className="flex items-center gap-2 px-4 py-2.5 border border-white/20 text-white/60 hover:border-white hover:text-white transition-colors text-sm font-medium"
              >
                <Icon name={s.icon} size={15} fallback="Link" />
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-white/30 text-sm">© 2025 SneakWave</p>
        </div>
      </footer>

      {/* ORDER MODAL */}
      {orderModal && (
        <OrderModal
          product={orderModal.product}
          size={orderModal.size}
          onClose={() => setOrderModal(null)}
        />
      )}
    </div>
  );
}