import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9000aa53-89d2-451b-bd4e-76cc90c55dac/bucket/91d809a3-bf0f-4c1c-a326-aed86bc9e980.jpg";
const MENU_IMAGE = "https://cdn.poehali.dev/projects/9000aa53-89d2-451b-bd4e-76cc90c55dac/files/4c823586-2c20-4a68-89d1-6f89ddf093dd.jpg";
const ABOUT_IMAGE = "https://cdn.poehali.dev/projects/9000aa53-89d2-451b-bd4e-76cc90c55dac/files/0e7adb1f-2cfd-4d0c-a6fb-f1e772e9e9f3.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  tag?: string;
  emoji: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Маргарита", description: "Томатный соус, моцарелла фиор ди латте, базилик, оливковое масло", price: 590, weight: "320г", tag: "Хит", emoji: "🍅" },
  { id: 2, name: "Трюфельная", description: "Крем-соус из трюфеля, моцарелла, пармезан, руккола, трюфельное масло", price: 890, weight: "340г", tag: "Новинка", emoji: "🍄" },
  { id: 3, name: "Прошутто", description: "Томатный соус, моцарелла, пармская ветчина, руккола, пармезан", price: 790, weight: "350г", emoji: "🥩" },
  { id: 4, name: "Четыре сыра", description: "Моцарелла, горгонзола, пармезан, фонтина, свежий тимьян", price: 750, weight: "330г", emoji: "🧀" },
  { id: 5, name: "Вегетарианская", description: "Томатный соус, моцарелла, цукини, перец, баклажан, черри", price: 680, weight: "360г", emoji: "🥗" },
  { id: 6, name: "Диавола", description: "Томатный соус, моцарелла, острая салями, перец чили, базилик", price: 720, weight: "340г", tag: "Острая", emoji: "🌶️" },
];

const REVIEWS = [
  { name: "Анна К.", text: "Лучшая пинса в городе! Тесто хрустящее, начинка свежайшая. Заказываем каждую пятницу.", stars: 5, date: "12 марта" },
  { name: "Михаил П.", text: "Трюфельная — это что-то невероятное. Доставили за 35 минут, всё горячее.", stars: 5, date: "18 марта" },
  { name: "Елена Р.", text: "Наконец-то нашла место, где умеют готовить настоящую римскую пинсу. Спасибо!", stars: 5, date: "24 марта" },
  { name: "Дмитрий С.", text: "Заказываю регулярно. Четыре сыра — обязательно попробуйте. Упаковка отличная.", stars: 5, date: "28 марта" },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter(c => c.quantity > 0));
  };

  const removeItem = (id: number) => setCart(prev => prev.filter(c => c.id !== id));

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const handleOrder = () => {
    setOrderSent(true);
    setTimeout(() => { setCartOpen(false); setOrderSent(false); setCart([]); }, 2500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "menu", label: "Меню" },
    { id: "about", label: "О нас" },
    { id: "delivery", label: "Доставка" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-terra">Пинса</span>
            <span className="text-2xl font-display text-foreground">Рома</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-body text-muted-foreground hover:text-terra transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-terra text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Icon name="ShoppingBag" size={16} />
            <span>Корзина</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-warm-gold text-dark-brown text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Римская пинса"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/85 via-dark-brown/55 to-dark-brown/20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 bg-warm-gold/20 border border-warm-gold/40 text-warm-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span>🏛️</span> Настоящий римский рецепт
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-cream leading-tight mb-6">
              Пинса<br />
              <em className="text-warm-gold not-italic">прямо</em><br />
              домой
            </h1>
            <p className="text-cream/80 text-lg mb-8 leading-relaxed font-body">
              Хрустящее тесто на закваске, свежие итальянские ингредиенты и доставка за 45 минут.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("menu")}
                className="bg-terra text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-all hover:scale-105 duration-200"
              >
                Смотреть меню
              </button>
              <button
                onClick={() => scrollTo("delivery")}
                className="border border-cream/40 text-cream px-8 py-3.5 rounded-full font-medium text-base hover:bg-cream/10 transition-all duration-200"
              >
                Условия доставки
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-brown/70 to-transparent">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-4 max-w-sm opacity-0 animate-fade-up delay-300" style={{ animationFillMode: 'forwards' }}>
              {[
                { val: "45", unit: "мин", label: "доставка" },
                { val: "6", unit: "видов", label: "в меню" },
                { val: "4.9", unit: "★", label: "рейтинг" },
              ].map(s => (
                <div key={s.val} className="text-center">
                  <div className="font-display text-2xl font-bold text-cream">{s.val}<span className="text-warm-gold text-sm ml-1">{s.unit}</span></div>
                  <div className="text-cream/60 text-xs font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-terra text-sm font-semibold tracking-widest uppercase font-body">— наши пинсы —</span>
            <h2 className="font-display text-5xl font-bold text-foreground mt-2">Меню</h2>
            <p className="text-muted-foreground mt-3 font-body max-w-md mx-auto">Каждая пинса готовится из теста на 72-часовой закваске</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENU_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-terra/10 transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}
              >
                <div className="relative h-52 bg-muted flex items-center justify-center overflow-hidden">
                  <img src={MENU_IMAGE} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-3xl">{item.emoji}</span>
                  {item.tag && (
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${item.tag === 'Хит' ? 'bg-terra text-primary-foreground' : item.tag === 'Острая' ? 'bg-red-600 text-white' : 'bg-warm-gold text-dark-brown'}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-2xl font-semibold text-foreground">{item.name}</h3>
                    <span className="text-muted-foreground text-xs font-body mt-1">{item.weight}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-terra">{item.price} ₽</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1.5 bg-terra text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all hover:scale-105 duration-200"
                    >
                      <Icon name="Plus" size={14} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img src={ABOUT_IMAGE} alt="О нас" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-terra text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="font-display text-4xl font-bold">2019</div>
                <div className="text-primary-foreground/80 text-sm font-body">с нами с</div>
              </div>
            </div>
            <div>
              <span className="text-terra text-sm font-semibold tracking-widest uppercase font-body">— наша история —</span>
              <h2 className="font-display text-5xl font-bold text-foreground mt-2 mb-6">О нас</h2>
              <p className="text-muted-foreground leading-relaxed font-body mb-5">
                Мы влюбились в пинсу во время путешествия по Риму и решили привезти этот вкус домой. Пинса — это не пицца. Это древнее римское блюдо с хрустящей, воздушной корочкой и нежной серединой.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body mb-8">
                Наше тесто готовится из смеси пшеничной, рисовой и соевой муки на закваске 72 часа. Все ингредиенты — от проверенных поставщиков, свежие каждый день.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Wheat", label: "Закваска 72 ч", desc: "Воздушное тесто" },
                  { icon: "Leaf", label: "Свежие продукты", desc: "Ежедневная доставка" },
                  { icon: "Heart", label: "С любовью", desc: "Каждая пинса" },
                  { icon: "Award", label: "Рецепты из Рима", desc: "Аутентичный вкус" },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border">
                    <div className="w-8 h-8 bg-terra/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon} size={16} className="text-terra" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm font-body">{f.label}</div>
                      <div className="text-muted-foreground text-xs font-body">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-terra text-sm font-semibold tracking-widest uppercase font-body">— быстро и удобно —</span>
            <h2 className="font-display text-5xl font-bold text-foreground mt-2">Доставка</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Clock", title: "45 минут", desc: "Среднее время доставки по городу", color: "terra" },
              { icon: "MapPin", title: "Весь город", desc: "Доставляем во все районы города", color: "olive" },
              { icon: "Package", title: "От 500 ₽", desc: "Минимальная сумма заказа. При заказе от 1500 ₽ — доставка бесплатно", color: "warm-gold" },
            ].map(item => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-7 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-terra/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={24} className="text-terra" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-terra rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-8 text-9xl">🍕</div>
              <div className="absolute bottom-4 right-8 text-9xl">🛵</div>
            </div>
            <h3 className="font-display text-4xl font-bold text-primary-foreground mb-3 relative z-10">Заказ за 3 шага</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-6 relative z-10">
              {["Выбери пинсу", "Оформи заказ", "Получи горячей"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">{i + 1}</span>
                    <span className="text-primary-foreground font-medium font-body">{step}</span>
                  </div>
                  {i < 2 && <Icon name="ChevronRight" size={18} className="text-primary-foreground/40 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-terra text-sm font-semibold tracking-widest uppercase font-body">— говорят гости —</span>
            <h2 className="font-display text-5xl font-bold text-foreground mt-2">Отзывы</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <span key={j} className="text-warm-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed font-body mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-sm font-body">{review.name}</span>
                  <span className="text-muted-foreground text-xs font-body">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-terra text-sm font-semibold tracking-widest uppercase font-body">— мы рядом —</span>
            <h2 className="font-display text-5xl font-bold text-foreground mt-2 mb-4">Контакты</h2>
            <p className="text-muted-foreground font-body mb-10">Есть вопрос? Напишите или позвоните — ответим быстро</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                { icon: "Phone", label: "+7 (999) 123-45-67", sub: "Ежедневно 11:00–23:00" },
                { icon: "Mail", label: "hello@pinsaroma.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Москва", sub: "Доставка по всему городу" },
              ].map(c => (
                <div key={c.label} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-terra/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name={c.icon} size={20} className="text-terra" />
                  </div>
                  <div className="font-semibold text-foreground text-sm font-body">{c.label}</div>
                  <div className="text-muted-foreground text-xs font-body mt-1">{c.sub}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("menu")}
              className="bg-terra text-primary-foreground px-10 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all hover:scale-105 duration-200 inline-flex items-center gap-2"
            >
              <Icon name="ShoppingBag" size={18} />
              Заказать пинсу
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-terra">Пинса</span>
            <span className="font-display text-xl text-foreground">Рома</span>
          </div>
          <p className="text-muted-foreground text-sm font-body">© 2024 Пинса Рома. Настоящая римская пинса с доставкой.</p>
          <div className="flex gap-4 text-sm text-muted-foreground font-body">
            <button onClick={() => scrollTo("menu")} className="hover:text-terra transition-colors">Меню</button>
            <button onClick={() => scrollTo("delivery")} className="hover:text-terra transition-colors">Доставка</button>
            <button onClick={() => scrollTo("contacts")} className="hover:text-terra transition-colors">Контакты</button>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-dark-brown/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-background flex flex-col h-full shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-2xl font-bold text-foreground">Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="font-display text-2xl text-muted-foreground mb-2">Корзина пуста</p>
                  <p className="text-muted-foreground text-sm font-body">Добавьте пинсу из меню</p>
                  <button
                    onClick={() => { setCartOpen(false); scrollTo("menu"); }}
                    className="mt-6 bg-terra text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Перейти в меню
                  </button>
                </div>
              ) : orderSent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 animate-scale-in">
                  <span className="text-7xl mb-4">🎉</span>
                  <h3 className="font-display text-3xl font-bold text-terra mb-2">Заказ принят!</h3>
                  <p className="text-muted-foreground font-body">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 animate-fade-in">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm font-body truncate">{item.name}</p>
                        <p className="text-terra font-display text-lg font-bold">{item.price * item.quantity} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors text-sm"
                        >
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="w-6 text-center font-semibold text-foreground text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 bg-terra text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Icon name="Plus" size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center ml-1"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && !orderSent && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-body">Итого</span>
                  <span className="font-display text-3xl font-bold text-foreground">{total} ₽</span>
                </div>
                {total < 1500 && (
                  <p className="text-xs text-muted-foreground font-body bg-muted/50 px-3 py-2 rounded-lg">
                    До бесплатной доставки осталось {1500 - total} ₽
                  </p>
                )}
                <button
                  onClick={handleOrder}
                  className="w-full bg-terra text-primary-foreground py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all hover:scale-[1.02] duration-200 flex items-center justify-center gap-2"
                >
                  <Icon name="CreditCard" size={18} />
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}