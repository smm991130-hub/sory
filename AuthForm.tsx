import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { storage } from '../utils/storage';
import { useLanguage } from '../utils/useLanguage';
import { countries, cleanPhone, formatPhoneByCountry, validatePhone } from '../utils/phoneUtils';
import { User } from '../types';
import { TrendingUp, User as UserIcon, Phone, CreditCard, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

interface AuthFormProps {
  onAuth: (user: User) => void;
}

export function AuthForm({ onAuth }: AuthFormProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // O'zbekiston default
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState<{ valid: boolean; message: string } | null>(null);
  const [showCountrySelect, setShowCountrySelect] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handlePhoneChange = (value: string) => {
    // Faqat raqamlarni olish
    const cleaned = cleanPhone(value);
    // Formatlash
    const formatted = formatPhoneByCountry(cleaned, selectedCountry.code);
    setPhone(formatted);
    
    // Validatsiya
    if (cleaned.length > 0) {
      const validation = validatePhone(cleaned, selectedCountry.code);
      setPhoneValidation(validation);
    } else {
      setPhoneValidation(null);
    }
  };

  const handleCountryChange = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowCountrySelect(false);
    setPhone('');
    setPhoneValidation(null);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t.nameRequired;
    }

    const phoneCleaned = cleanPhone(phone);
    const validation = validatePhone(phoneCleaned, selectedCountry.code);
    if (!validation.valid) {
      newErrors.phone = validation.message;
    }

    const cardCleaned = cardNumber.replace(/\D/g, '');
    if (!cardCleaned) {
      newErrors.card = t.cardRequired;
    } else if (cardCleaned.length !== 16) {
      newErrors.card = t.invalidCard;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    // To'liq telefon raqami: davlat kodi + mahalliy raqam
    const fullPhone = selectedCountry.code + cleanPhone(phone);

    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      phone: fullPhone,
      cardNumber: cardNumber.replace(/\D/g, ''),
      createdAt: new Date().toISOString(),
    };

    storage.addUser(user);
    storage.setCurrentUser(user);
    onAuth(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t.signUpTitle}</h1>
          <p className="text-slate-400">{t.signUpDesc}</p>
        </div>

        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">{t.signUp}</CardTitle>
            <CardDescription className="text-slate-400">
              {t.signUpDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  {t.fullName}
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ali Valiyev"
                  className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                    errors.name ? 'border-rose-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-rose-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone with Country Selector */}
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t.phoneNumber}
                </Label>
                
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountrySelect(!showCountrySelect)}
                    className="w-full flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-2 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedCountry.flag}</span>
                      <span className="text-white">{selectedCountry.name}</span>
                      <span className="text-emerald-400 font-mono">+{selectedCountry.code}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showCountrySelect ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCountrySelect && (
                    <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-10 shadow-xl">
                      {countries.map((country) => (
                        <button
                          key={country.code + country.name}
                          type="button"
                          onClick={() => handleCountryChange(country)}
                          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 transition-colors ${
                            selectedCountry.code === country.code && selectedCountry.name === country.name
                              ? 'bg-slate-700'
                              : ''
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-white flex-1 text-left">{country.name}</span>
                          <span className="text-emerald-400 font-mono text-sm">+{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Phone Input */}
                <div className="flex gap-2">
                  <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 min-w-fit">
                    <span className="text-xl mr-1">{selectedCountry.flag}</span>
                    <span className="text-emerald-400 font-mono">+{selectedCountry.code}</span>
                  </div>
                  <Input
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={selectedCountry.placeholder}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 flex-1 ${
                      errors.phone ? 'border-rose-500' : phoneValidation?.valid ? 'border-emerald-500' : ''
                    }`}
                  />
                </div>
                
                {errors.phone && (
                  <p className="text-rose-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
                {phoneValidation && !errors.phone && (
                  <p className="text-emerald-400 text-sm flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {phoneValidation.message}
                  </p>
                )}
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {t.cardNumber}
                </Label>
                <Input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder={t.cardPlaceholder}
                  className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 font-mono ${
                    errors.card ? 'border-rose-500' : ''
                  }`}
                />
                {errors.card && (
                  <p className="text-rose-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.card}
                  </p>
                )}
                <p className="text-slate-500 text-xs">Uzcard yoki Humo karta (16 ta raqam)</p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-6 text-lg"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t.enterBtn
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          USDT P2P © 2024 • Guruhdoshlar uchun xavfsiz savdo
        </p>
      </div>
    </div>
  );
}