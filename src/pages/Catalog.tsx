import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const CATEGORIES = ["Все", "Бег", "Баскетбол", "Скейт", "Повседневные", "Коллаборации"];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Wave Runner 01",
    brand: "SneakWave",
    category: "Бег",
    price: 12990,
    oldPrice: 16990,
    discount: 23,
    tag: "Новинка",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  },
  {
    id: 2,
    name: "Collab Drop SS25",
    brand: "SneakWave × Арт",
    category: "Коллаборации",
    price: 18500,
    oldPrice: null,
    discount: null,
    tag: "Лимит",
    sizes: [39, 40, 41, 42, 43],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  },
  {
    id: 3,
    name: "Street Archive",
    brand: "SneakWave",
    category: "Скейт",
    price: 9990,
    oldPrice: 12990,
    discount: 23,
    tag: "Хит",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
  },
  {
    id: 4,
    name: "Court Classic",
    brand: "SneakWave",
    category: "Баскетбол",
    price: 14500,
    oldPrice: 18000,
    discount: 19,
    tag: "Скидка",
    sizes: [40, 41, 42, 43, 44, 45],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  },
  {
    id: 5,
    name: "Foam Pro Lite",
    brand: "SneakWave",
    category: "Повседневные",
    price: 7490,
    oldPrice: null,
    discount: null,
    tag: null,
    sizes: [36, 37, 38, 39, 40, 41],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  },
  {
    id: 6,
    name: "Urban Edge X",
    brand: "SneakWave",
    category: "Скейт",
    price: 11200,
    oldPrice: 14900,
    discount: 25,
    tag: "Скидка",
    sizes: [39, 40, 41, 42, 43, 44],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
  },
  {
    id: 7,
    name: "Eco Future Vol.1",
    brand: "SneakWave Eco",
    category: "Повседневные",
    price: 10990,
    oldPrice: null,
    discount: null,
    tag: "Эко",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  },
  {
    id: 8,
    name: "Galaxy Boost",
    brand: "SneakWave",
    category: "Бег",
    price: 16800,
    oldPrice: 21000,
    discount: 20,
    tag: "Скидка",
    sizes: [40, 41, 42, 43, 44, 45],
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "discount", label: "Сначала со скидкой" },
];

export default function Catalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number>>({});

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "Все") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (onlyDiscount) {
      result = result.filter((p) => p.discount !== null);
    }

    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "discount") result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

    return result;
  }, [search, activeCategory, selectedSize, onlyDiscount, sortBy]);

  const toggleSize = (productId: number, size: number) => {
    setSelectedSizes((prev) =>
      prev[productId] === size ? { ...prev, [productId]: 0 } : { ...prev, [productId]: size }
    );
  };

  const formatPrice = (p: number) =>
    p.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-wave-white text-wave-black">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-black/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-wave-mid hover:text-wave-black transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-medium">Главная</span>
          </button>
          <div className="h-4 w-px bg-black/15" />
          <span className="font-display text-2xl tracking-wider">SNEAKWAVE</span>
          <div className="ml-auto flex items-center gap-3">
            <button className="bg-wave-black text-wave-white px-5 py-2 text-sm font-medium hover:bg-[#FF3B1F] transition-colors">
              <Icon name="ShoppingBag" size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Все модели</span>
          <h1 className="font-display text-6xl md:text-8xl mt-1 mb-2">КАТАЛОГ</h1>
          <p className="text-wave-mid">{filtered.length} товаров</p>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col gap-4 mb-8">

          {/* Search row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-wave-mid" />
              <input
                type="text"
                placeholder="Поиск по названию или бренду..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-black/12 bg-white focus:outline-none focus:border-wave-black text-sm font-body placeholder:text-wave-mid transition-colors"
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
              className="border border-black/12 bg-white px-4 py-3 text-sm font-body focus:outline-none focus:border-wave-black cursor-pointer min-w-[220px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Category + discount toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-colors border ${
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

          {/* Size filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.15em] text-wave-mid uppercase mr-2">Размер:</span>
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`w-10 h-10 text-sm font-medium border transition-colors ${
                  selectedSize === size
                    ? "bg-wave-black text-wave-white border-wave-black"
                    : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                }`}
              >
                {size}
              </button>
            ))}
            {selectedSize && (
              <button onClick={() => setSelectedSize(null)} className="text-xs text-wave-mid hover:text-wave-black ml-2 underline">
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <Icon name="SearchX" size={48} className="mx-auto text-black/15 mb-4" />
            <p className="font-display text-3xl text-black/25">НИЧЕГО НЕ НАЙДЕНО</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Все"); setSelectedSize(null); setOnlyDiscount(false); }}
              className="mt-6 text-sm text-wave-mid hover:text-wave-black underline"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-wave-gray mb-4 relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-[#FF3B1F] text-white text-xs font-bold px-2.5 py-1">
                      -{product.discount}%
                    </span>
                  )}
                  {product.tag && !product.discount && (
                    <span className="absolute top-3 left-3 bg-wave-black text-white text-xs font-semibold px-2.5 py-1">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="mb-3">
                  <p className="text-xs text-wave-mid mb-1">{product.brand}</p>
                  <h3 className="font-semibold text-wave-black leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-wave-black">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-wave-mid line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                </div>

                {/* Size picker */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(product.id, size)}
                      className={`w-8 h-8 text-xs font-medium border transition-colors ${
                        selectedSizes[product.id] === size
                          ? "bg-wave-black text-white border-wave-black"
                          : "bg-white text-wave-mid border-black/12 hover:border-wave-black hover:text-wave-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-wave-black text-wave-white py-2.5 text-sm font-semibold hover:bg-[#FF3B1F] transition-colors duration-200">
                  {selectedSizes[product.id] ? `В корзину — ${selectedSizes[product.id]} р.` : "Выбрать размер"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="border-t border-black/8 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="font-display text-xl tracking-wider text-black/30">SNEAKWAVE</span>
          <p className="text-sm text-wave-mid">© 2025 SneakWave</p>
        </div>
      </div>
    </div>
  );
}
