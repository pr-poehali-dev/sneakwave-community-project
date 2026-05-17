import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Каталог", section: "catalog" },
  { label: "Блог", section: "blog" },
  { label: "Сообщество", section: "community" },
  { label: "Коллаборации", section: "collabs" },
];

const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Wave Runner 01",
    price: "12 990 ₽",
    tag: "Новинка",
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  },
  {
    id: 2,
    name: "Collab Drop SS25",
    price: "18 500 ₽",
    tag: "Лимит",
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  },
  {
    id: 3,
    name: "Street Archive",
    price: "9 990 ₽",
    tag: "Хит",
    img: "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    category: "Тренды",
    title: "Как носить оверсайз кроссовки в 2025",
    date: "12 мая 2025",
  },
  {
    id: 2,
    category: "Уход",
    title: "5 способов сохранить белизну подошвы",
    date: "5 мая 2025",
  },
  {
    id: 3,
    category: "Интервью",
    title: "Дизайнер о коллаборации с уличными художниками",
    date: "28 апр. 2025",
  },
];

const COMMUNITY_PHOTOS = [
  "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
  "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/0b467c5c-906d-4356-95dc-0cd288f82de5.jpg",
  "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg",
  "https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/eb0370a8-bf92-4f69-a283-11e7fa4f220a.jpg",
];

const COLLABS = [
  { name: "Арт-дроп: Иван Горшков", label: "Ограниченный тираж 50 пар", color: "bg-wave-black text-wave-white" },
  { name: "Уличная галерея ×SW", label: "Городская серия", color: "bg-[#FF3B1F] text-white" },
  { name: "Eco Future Collection", label: "Переработанные материалы", color: "bg-wave-gray text-wave-black" },
];

const MARQUEE_TEXT = ["SneakWave", "Стиль", "Движение", "Индивидуальность", "Комфорт", "Тренды"];

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (id === "catalog") { navigate("/catalog"); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-wave-white text-wave-black overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-black/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-2xl tracking-wider text-wave-black">
            SNEAKWAVE
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollTo(link.section)}
                className="font-body text-sm font-medium text-wave-mid hover:text-wave-black transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("catalog")}
              className="hidden md:flex items-center gap-2 bg-wave-black text-wave-white px-5 py-2 text-sm font-medium hover:bg-[#FF3B1F] transition-colors duration-200"
            >
              Каталог
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAFA] border-t border-black/8 px-6 py-4 flex flex-col gap-4 animate-fade-up">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollTo(link.section)}
                className="text-left font-medium text-wave-black py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 py-20">
          <div className="flex-1 animate-fade-up">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase mb-6">
              Новая коллекция 2025
            </span>
            <h1 className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-wave-black mb-6">
              ТВОЙ<br />СТИЛЬ<br />В ДВИЖЕНИИ
            </h1>
            <p className="text-wave-mid text-lg max-w-md mb-10 font-body leading-relaxed">
              Кроссовки для тех, кто не боится выделяться. Уникальный стиль, комфорт и актуальные тренды в одном месте.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-wave-black text-wave-white px-8 py-4 font-semibold hover:bg-[#FF3B1F] transition-colors duration-200"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("collabs")}
                className="border border-wave-black text-wave-black px-8 py-4 font-semibold hover:bg-wave-black hover:text-wave-white transition-colors duration-200"
              >
                Коллаборации
              </button>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in animate-delay-300">
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-wave-gray" />
              <img
                src="https://cdn.poehali.dev/projects/250c9868-106d-4599-864e-8ba2db636eb8/files/96a548eb-cc39-4459-9aa4-ea70326cedf8.jpg"
                alt="SneakWave hero"
                className="relative w-full h-full object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#FF3B1F] text-white px-4 py-3 font-display text-xl tracking-wide">
                SS 2025
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-black/10 py-4 overflow-hidden bg-wave-black">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT].map((word, i) => (
              <span key={i} className="font-display text-2xl text-wave-white mx-8 tracking-widest">
                {word} <span className="text-[#FF3B1F]">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Коллекция</span>
            <h2 className="font-display text-6xl md:text-7xl mt-2">КАТАЛОГ</h2>
          </div>
          <button onClick={() => navigate("/catalog")} className="hidden md:flex items-center gap-2 text-sm font-medium text-wave-mid hover:text-wave-black transition-colors">
            Все товары <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATALOG_ITEMS.map((item, i) => (
            <div key={item.id} className="group cursor-pointer" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="aspect-square overflow-hidden bg-wave-gray mb-4 relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#FF3B1F] text-white text-xs font-semibold px-3 py-1 tracking-wide">
                  {item.tag}
                </span>
                <button className="absolute bottom-4 right-4 bg-wave-black text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon name="ShoppingBag" size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-wave-black">{item.name}</h3>
                <span className="font-body font-semibold text-wave-black">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <button onClick={() => navigate("/catalog")} className="border border-wave-black text-wave-black px-8 py-3 font-semibold hover:bg-wave-black hover:text-white transition-colors">
            Все товары
          </button>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-wave-black text-wave-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Контент</span>
              <h2 className="font-display text-6xl md:text-7xl mt-2">БЛОГ</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
              Все статьи <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-[#0A0A0A] p-8 hover:bg-white/5 transition-colors duration-200 cursor-pointer group"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">
                  {post.category}
                </span>
                <h3 className="font-body font-semibold text-xl mt-4 mb-6 leading-snug group-hover:text-[#FF3B1F] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-white/40 text-sm">
                  <span>{post.date}</span>
                  <Icon name="ArrowUpRight" size={16} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Люди SneakWave</span>
          <h2 className="font-display text-6xl md:text-7xl mt-2">СООБЩЕСТВО</h2>
          <p className="text-wave-mid mt-4 max-w-md text-lg">
            Делись своим образом — попади в галерею и вдохнови других.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {COMMUNITY_PHOTOS.map((photo, i) => (
            <div key={i} className="aspect-square overflow-hidden group cursor-pointer relative">
              <img
                src={photo}
                alt={`Community photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Icon name="Heart" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 p-8 border border-black/10 bg-wave-gray">
          <div className="flex-1">
            <h3 className="font-display text-3xl mb-2">ОТМЕТЬ #SNEAKWAVE</h3>
            <p className="text-wave-mid">Публикуй фото с хештегом — лучшие работы появятся в нашей галерее.</p>
          </div>
          <button className="bg-wave-black text-wave-white px-8 py-4 font-semibold hover:bg-[#FF3B1F] transition-colors duration-200 shrink-0">
            Поделиться фото
          </button>
        </div>
      </section>

      {/* COLLABS */}
      <section id="collabs" className="py-24 bg-wave-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Лимитированные серии</span>
            <h2 className="font-display text-6xl md:text-7xl mt-2">КОЛЛАБОРАЦИИ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {COLLABS.map((collab, i) => (
              <div
                key={i}
                className={`${collab.color} p-10 flex flex-col justify-between min-h-[240px] cursor-pointer group`}
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
                  {collab.label}
                </span>
                <div>
                  <h3 className="font-display text-3xl mb-4">{collab.name}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                    Смотреть <Icon name="ArrowRight" size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-wave-black text-wave-white p-12 md:p-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#FF3B1F] uppercase">Хочешь коллаборацию?</span>
              <h2 className="font-display text-5xl mt-3 mb-4">СТАНЬ ПАРТНЁРОМ</h2>
              <p className="text-white/60 max-w-md">
                Мы открыты для совместных проектов с художниками, брендами и стилистами.
              </p>
            </div>
            <button className="bg-[#FF3B1F] text-white px-10 py-5 font-semibold text-lg hover:bg-white hover:text-wave-black transition-colors duration-200 shrink-0">
              Написать нам
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-wave-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <div className="font-display text-3xl tracking-wider mb-3">SNEAKWAVE</div>
              <p className="text-white/40 text-sm max-w-xs">Твой стиль в движении. Кроссовки для тех, кто не боится выделяться.</p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] text-white/40 uppercase mb-4">Разделы</p>
                <div className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.section}
                      onClick={() => scrollTo(link.section)}
                      className="text-sm text-white/70 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] text-white/40 uppercase mb-4">Контакты</p>
                <div className="flex flex-col gap-3">
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Telegram</a>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">VK</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2025 SneakWave. Все права защищены.</p>
            <p className="text-white/30 text-sm">Политика конфиденциальности</p>
          </div>
        </div>
      </footer>
    </div>
  );
}