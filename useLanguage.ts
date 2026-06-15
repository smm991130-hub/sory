import { useState, useEffect } from 'react';

export type Language = 'uz' | 'en' | 'ru';

const translations = {
  uz: {
    // Auth
    signUp: "Ro'yxatdan o'tish",
    signUpTitle: "USDT P2P Savdo",
    signUpDesc: "Guruhdoshlar bilan xavfsiz savdo",
    fullName: "Ism va Familiya",
    phoneNumber: "Telefon raqami",
    cardNumber: "Plastik karta raqami",
    cardPlaceholder: "8600 1234 5678 9012",
    phonePlaceholder: "+998 90 123 45 67",
    enterBtn: "Kirish",
    alreadyHave: "Hisobingiz bormi?",
    login: "Kirish",
    
    // Navigation
    p2p: "P2P Savdo",
    chat: "Chat",
    orders: "Buyurtmalar",
    settings: "Sozlamalar",
    groupMember: "Guruh a'zosi",
    
    // P2P
    p2pTitle: "USDT E'lonlar Doskasi",
    p2pDesc: "Guruhdoshlaringiz bilan xavfsiz savdo qiling",
    newListing: "Yangi e'lon",
    buyUsdt: "USDT sotib olaman",
    sellUsdt: "USDT sotaman",
    usdtAmount: "USDT miqdori",
    price: "Narxi (so'm)",
    total: "Jami",
    som: "so'm",
    listingsCount: "Sotib olish",
    sellCount: "Sotish",
    volumeUsdt: "Hajm",
    noListings: "E'lonlar yo'q",
    beFirst: "Birinchilardan bo'lib e'lon bering!",
    copy: "Nusxa",
    copied: "Nusxalandi!",
    delete: "O'chirish",
    now: "Hozir",
    minutesAgo: "daqiqa oldin",
    hoursAgo: "soat oldin",
    daysAgo: "kun oldin",
    contactSeller: "Sotuvchi bilan bog'lanish",
    createOrder: "Buyurtma berish",
    
    // Chat
    chatTitle: "Umumiy Chat",
    online: "Onlayn",
    noMessages: "Xabarlar yo'q",
    writeFirst: "Birinchilardan bo'lib yozing!",
    typeMessage: "Xabaringizni yozing...",
    today: "Bugun",
    yesterday: "Kecha",
    
    // Orders
    ordersTitle: "Buyurtmalarim",
    ordersDesc: "Faol va tarixiy buyurtmalaringiz",
    activeOrders: "Faol",
    completedOrders: "Tarix",
    noOrders: "Buyurtmalar yo'q",
    pending: "Kutilmoqda",
    completed: "Tugatildi",
    cancelled: "Bekor qilindi",
    expired: "Muddati o'tdi",
    buyer: "Xaridor",
    seller: "Sotuvchi",
    you: "Siz",
    confirmOrder: "Tasdiqlash",
    cancelOrder: "Bekor qilish",
    orderCreated: "Buyurtma yaratildi!",
    orderConfirmed: "Buyurtma tasdiqlandi!",
    orderCancelled: "Buyurtma bekor qilindi!",
    
    // Settings
    profileTitle: "Profil",
    language: "Til",
    notifications: "Bildirishnomalar",
    notificationsOn: "Yoqilgan",
    notificationsOff: "O'chirilgan",
    defaultRate: "Standart kurs",
    logout: "Chiqish",
    logoutConfirm: "Ha, chiqish",
    cancel: "Bekor qilish",
    saved: "Saqlandi!",
    
    // Validation
    nameRequired: "Ism kiritish majburiy",
    phoneRequired: "Telefon raqami kiritish majburiy",
    cardRequired: "Karta raqami kiritish majburiy",
    invalidPhone: "Telefon raqami noto'g'ri",
    invalidCard: "Karta raqami noto'g'ri (16 ta raqam)",
  },
  en: {
    // Auth
    signUp: "Sign Up",
    signUpTitle: "USDT P2P Trading",
    signUpDesc: "Secure trading with group members",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    cardNumber: "Card Number",
    cardPlaceholder: "8600 1234 5678 9012",
    phonePlaceholder: "+998 90 123 45 67",
    enterBtn: "Enter",
    alreadyHave: "Already have an account?",
    login: "Login",
    
    // Navigation
    p2p: "P2P Trading",
    chat: "Chat",
    orders: "Orders",
    settings: "Settings",
    groupMember: "Group Member",
    
    // P2P
    p2pTitle: "USDT Listings Board",
    p2pDesc: "Trade securely with your group members",
    newListing: "New Listing",
    buyUsdt: "Buy USDT",
    sellUsdt: "Sell USDT",
    usdtAmount: "USDT Amount",
    price: "Price (UZS)",
    total: "Total",
    som: "UZS",
    listingsCount: "Buy Orders",
    sellCount: "Sell Orders",
    volumeUsdt: "Volume",
    noListings: "No listings",
    beFirst: "Be the first to create one!",
    copy: "Copy",
    copied: "Copied!",
    delete: "Delete",
    now: "Now",
    minutesAgo: "min ago",
    hoursAgo: "hours ago",
    daysAgo: "days ago",
    contactSeller: "Contact Seller",
    createOrder: "Create Order",
    
    // Chat
    chatTitle: "Group Chat",
    online: "Online",
    noMessages: "No messages",
    writeFirst: "Be the first to write!",
    typeMessage: "Type your message...",
    today: "Today",
    yesterday: "Yesterday",
    
    // Orders
    ordersTitle: "My Orders",
    ordersDesc: "Active and historical orders",
    activeOrders: "Active",
    completedOrders: "History",
    noOrders: "No orders",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    expired: "Expired",
    buyer: "Buyer",
    seller: "Seller",
    you: "You",
    confirmOrder: "Confirm",
    cancelOrder: "Cancel",
    orderCreated: "Order created!",
    orderConfirmed: "Order confirmed!",
    orderCancelled: "Order cancelled!",
    
    // Settings
    profileTitle: "Profile",
    language: "Language",
    notifications: "Notifications",
    notificationsOn: "Enabled",
    notificationsOff: "Disabled",
    defaultRate: "Default Rate",
    logout: "Logout",
    logoutConfirm: "Yes, logout",
    cancel: "Cancel",
    saved: "Saved!",
    
    // Validation
    nameRequired: "Name is required",
    phoneRequired: "Phone number is required",
    cardRequired: "Card number is required",
    invalidPhone: "Invalid phone number",
    invalidCard: "Invalid card number (16 digits)",
  },
  ru: {
    // Auth
    signUp: "Регистрация",
    signUpTitle: "USDT P2P Торговля",
    signUpDesc: "Безопасная торговля с участниками группы",
    fullName: "Имя и Фамилия",
    phoneNumber: "Номер телефона",
    cardNumber: "Номер карты",
    cardPlaceholder: "8600 1234 5678 9012",
    phonePlaceholder: "+998 90 123 45 67",
    enterBtn: "Войти",
    alreadyHave: "Уже есть аккаунт?",
    login: "Войти",
    
    // Navigation
    p2p: "P2P Торговля",
    chat: "Чат",
    orders: "Заказы",
    settings: "Настройки",
    groupMember: "Участник группы",
    
    // P2P
    p2pTitle: "Доска объявлений USDT",
    p2pDesc: "Торгуйте безопасно с участниками группы",
    newListing: "Новое объявление",
    buyUsdt: "Купить USDT",
    sellUsdt: "Продать USDT",
    usdtAmount: "Количество USDT",
    price: "Цена (сум)",
    total: "Итого",
    som: "сум",
    listingsCount: "Покупка",
    sellCount: "Продажа",
    volumeUsdt: "Объём",
    noListings: "Нет объявлений",
    beFirst: "Станьте первым!",
    copy: "Копировать",
    copied: "Скопировано!",
    delete: "Удалить",
    now: "Сейчас",
    minutesAgo: "мин назад",
    hoursAgo: "часов назад",
    daysAgo: "дней назад",
    contactSeller: "Связаться",
    createOrder: "Создать заказ",
    
    // Chat
    chatTitle: "Общий чат",
    online: "Онлайн",
    noMessages: "Нет сообщений",
    writeFirst: "Напишите первым!",
    typeMessage: "Напишите сообщение...",
    today: "Сегодня",
    yesterday: "Вчера",
    
    // Orders
    ordersTitle: "Мои заказы",
    ordersDesc: "Активные и исторические заказы",
    activeOrders: "Активные",
    completedOrders: "История",
    noOrders: "Нет заказов",
    pending: "Ожидание",
    completed: "Завершено",
    cancelled: "Отменено",
    expired: "Истёк",
    buyer: "Покупатель",
    seller: "Продавец",
    you: "Вы",
    confirmOrder: "Подтвердить",
    cancelOrder: "Отменить",
    orderCreated: "Заказ создан!",
    orderConfirmed: "Заказ подтверждён!",
    orderCancelled: "Заказ отменён!",
    
    // Settings
    profileTitle: "Профиль",
    language: "Язык",
    notifications: "Уведомления",
    notificationsOn: "Включены",
    notificationsOff: "Выключены",
    defaultRate: "Курс по умолчанию",
    logout: "Выйти",
    logoutConfirm: "Да, выйти",
    cancel: "Отмена",
    saved: "Сохранено!",
    
    // Validation
    nameRequired: "Имя обязательно",
    phoneRequired: "Телефон обязателен",
    cardRequired: "Номер карты обязателен",
    invalidPhone: "Неверный номер телефона",
    invalidCard: "Неверный номер карты (16 цифр)",
  },
};

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('usdt_p2p_language');
    return (saved as Language) || 'uz';
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem('usdt_p2p_language', lang);
    setLanguageState(lang);
  };

  const t = translations[language];

  return { t, language, setLanguage };
}