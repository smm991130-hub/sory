// Davlat kodlari va formatlar
export const countries = [
  { code: '998', name: "O'zbekiston", flag: '🇺🇿', format: '+998 XX XXX XX XX', placeholder: '90 123 45 67' },
  { code: '7', name: 'Rossiya', flag: '🇷🇺', format: '+7 XXX XXX XX XX', placeholder: '999 123 45 67' },
  { code: '7', name: 'Qozog\'iston', flag: '🇰🇿', format: '+7 XXX XXX XX XX', placeholder: '777 123 45 67' },
  { code: '992', name: 'Tojikiston', flag: '🇹🇯', format: '+992 XX XXX XX XX', placeholder: '90 123 45 67' },
  { code: '996', name: 'Qirg\'iziston', flag: '🇰🇬', format: '+996 XX XXX XX XX', placeholder: '50 123 45 67' },
  { code: '993', name: 'Turkmaniston', flag: '🇹🇲', format: '+993 X XXX XX XX', placeholder: '6 123 45 67' },
  { code: '380', name: 'Ukraina', flag: '🇺🇦', format: '+380 XX XXX XX XX', placeholder: '50 123 45 67' },
  { code: '375', name: 'Belarus', flag: '🇧🇾', format: '+375 XX XXX XX XX', placeholder: '29 123 45 67' },
  { code: '1', name: 'AQSh', flag: '🇺🇸', format: '+1 (XXX) XXX-XXXX', placeholder: '(555) 123-4567' },
  { code: '90', name: 'Turkiya', flag: '🇹🇷', format: '+90 XXX XXX XX XX', placeholder: '532 123 45 67' },
  { code: '86', name: 'Xitoy', flag: '🇨🇳', format: '+86 XXX XXXX XXXX', placeholder: '138 1234 5678' },
  { code: '971', name: 'BAA', flag: '🇦🇪', format: '+971 XX XXX XXXX', placeholder: '50 123 4567' },
  { code: '82', name: 'Koreya', flag: '🇰🇷', format: '+82 XX XXXX XXXX', placeholder: '10 1234 5678' },
  { code: '49', name: 'Germaniya', flag: '🇩🇪', format: '+49 XXX XXXXXXX', placeholder: '151 1234567' },
  { code: '44', name: 'Buyuk Britaniya', flag: '🇬🇧', format: '+44 XXXX XXXXXX', placeholder: '7911 123456' },
];

export const cleanPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const formatPhoneByCountry = (value: string, countryCode: string): string => {
  const cleaned = cleanPhone(value);
  if (cleaned.length === 0) return '';
  
  // O'zbekiston (+998)
  if (countryCode === '998') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 7) result += cleaned.slice(5, 7) + ' ';
    else return result + cleaned.slice(5);
    if (cleaned.length >= 9) result += cleaned.slice(7, 9);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Rossiya/Qozog'iston (+7)
  if (countryCode === '7') {
    let result = '';
    if (cleaned.length >= 3) result += cleaned.slice(0, 3) + ' ';
    else return cleaned;
    if (cleaned.length >= 6) result += cleaned.slice(3, 6) + ' ';
    else return result + cleaned.slice(3);
    if (cleaned.length >= 8) result += cleaned.slice(6, 8) + ' ';
    else return result + cleaned.slice(6);
    if (cleaned.length >= 10) result += cleaned.slice(8, 10);
    else return result + cleaned.slice(8);
    return result.trim();
  }
  
  // Tojikiston (+992)
  if (countryCode === '992') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 7) result += cleaned.slice(5, 7) + ' ';
    else return result + cleaned.slice(5);
    if (cleaned.length >= 9) result += cleaned.slice(7, 9);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Qirg'iziston (+996)
  if (countryCode === '996') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 7) result += cleaned.slice(5, 7) + ' ';
    else return result + cleaned.slice(5);
    if (cleaned.length >= 9) result += cleaned.slice(7, 9);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Turkmaniston (+993)
  if (countryCode === '993') {
    let result = '';
    if (cleaned.length >= 1) result += cleaned.slice(0, 1) + ' ';
    else return cleaned;
    if (cleaned.length >= 4) result += cleaned.slice(1, 4) + ' ';
    else return result + cleaned.slice(1);
    if (cleaned.length >= 6) result += cleaned.slice(4, 6) + ' ';
    else return result + cleaned.slice(4);
    if (cleaned.length >= 8) result += cleaned.slice(6, 8);
    else return result + cleaned.slice(6);
    return result.trim();
  }
  
  // Ukraina (+380)
  if (countryCode === '380') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 7) result += cleaned.slice(5, 7) + ' ';
    else return result + cleaned.slice(5);
    if (cleaned.length >= 9) result += cleaned.slice(7, 9);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Belarus (+375)
  if (countryCode === '375') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 7) result += cleaned.slice(5, 7) + ' ';
    else return result + cleaned.slice(5);
    if (cleaned.length >= 9) result += cleaned.slice(7, 9);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Turkiya (+90)
  if (countryCode === '90') {
    let result = '';
    if (cleaned.length >= 3) result += cleaned.slice(0, 3) + ' ';
    else return cleaned;
    if (cleaned.length >= 6) result += cleaned.slice(3, 6) + ' ';
    else return result + cleaned.slice(3);
    if (cleaned.length >= 8) result += cleaned.slice(6, 8) + ' ';
    else return result + cleaned.slice(6);
    if (cleaned.length >= 10) result += cleaned.slice(8, 10);
    else return result + cleaned.slice(8);
    return result.trim();
  }
  
  // BAA (+971)
  if (countryCode === '971') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 5) result += cleaned.slice(2, 5) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 9) result += cleaned.slice(5, 9);
    else return result + cleaned.slice(5);
    return result.trim();
  }
  
  // AQSh (+1)
  if (countryCode === '1') {
    let result = '';
    if (cleaned.length >= 3) result += '(' + cleaned.slice(0, 3) + ') ';
    else return cleaned;
    if (cleaned.length >= 6) result += cleaned.slice(3, 6) + '-';
    else return result + cleaned.slice(3);
    if (cleaned.length >= 10) result += cleaned.slice(6, 10);
    else return result + cleaned.slice(6);
    return result.trim();
  }
  
  // Xitoy (+86)
  if (countryCode === '86') {
    let result = '';
    if (cleaned.length >= 3) result += cleaned.slice(0, 3) + ' ';
    else return cleaned;
    if (cleaned.length >= 7) result += cleaned.slice(3, 7) + ' ';
    else return result + cleaned.slice(3);
    if (cleaned.length >= 11) result += cleaned.slice(7, 11);
    else return result + cleaned.slice(7);
    return result.trim();
  }
  
  // Koreya (+82)
  if (countryCode === '82') {
    let result = '';
    if (cleaned.length >= 2) result += cleaned.slice(0, 2) + ' ';
    else return cleaned;
    if (cleaned.length >= 6) result += cleaned.slice(2, 6) + ' ';
    else return result + cleaned.slice(2);
    if (cleaned.length >= 10) result += cleaned.slice(6, 10);
    else return result + cleaned.slice(6);
    return result.trim();
  }
  
  // Germaniya (+49)
  if (countryCode === '49') {
    let result = '';
    if (cleaned.length >= 3) result += cleaned.slice(0, 3) + ' ';
    else return cleaned;
    if (cleaned.length > 3) result += cleaned.slice(3);
    return result.trim();
  }
  
  // Buyuk Britaniya (+44)
  if (countryCode === '44') {
    let result = '';
    if (cleaned.length >= 4) result += cleaned.slice(0, 4) + ' ';
    else return cleaned;
    if (cleaned.length > 4) result += cleaned.slice(4);
    return result.trim();
  }
  
  return cleaned;
};

export const displayPhone = (phone: string, countryCode?: string): string => {
  if (!phone) return '';
  const cleaned = cleanPhone(phone);
  
  // Agar davlat kodi berilgan bo'lsa
  if (countryCode) {
    return '+' + countryCode + ' ' + formatPhoneByCountry(cleaned.slice(countryCode.length), countryCode);
  }
  
  // Avto-aniqlash
  const country = countries.find(c => cleaned.startsWith(c.code));
  if (country) {
    const localNumber = cleaned.slice(country.code.length);
    return country.flag + ' +' + country.code + ' ' + formatPhoneByCountry(localNumber, country.code);
  }
  
  return '+' + cleaned;
};

export const validatePhone = (phone: string, countryCode: string): { valid: boolean; message: string } => {
  const cleaned = cleanPhone(phone);
  
  if (cleaned.length === 0) {
    return { valid: false, message: 'Telefon raqami kiritilmagan' };
  }
  
  // Har bir davlat uchun raqam uzunligi
  const lengths: Record<string, number> = {
    '998': 9,
    '7': 10,
    '992': 9,
    '996': 9,
    '993': 8,
    '380': 9,
    '375': 9,
    '90': 10,
    '971': 9,
    '1': 10,
    '86': 11,
    '82': 9,
    '49': 10,
    '44': 10,
  };
  
  const expectedLength = lengths[countryCode] || 9;
  
  if (cleaned.length < expectedLength) {
    return { valid: false, message: `Raqam juda qisqa (${expectedLength} ta raqam kerak)` };
  }
  
  if (cleaned.length > expectedLength) {
    return { valid: false, message: `Raqam juda uzun (${expectedLength} ta raqam kerak)` };
  }
  
  const country = countries.find(c => c.code === countryCode);
  return { valid: true, message: country?.name + ' ✓' || 'OK' };
};