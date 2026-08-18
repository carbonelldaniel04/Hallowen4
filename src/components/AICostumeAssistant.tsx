import React, { useState } from 'react';
import { Costume } from '../types';
import { X, Sparkles, Ghost, ArrowRight, Check, Calendar, Star } from 'lucide-react';

interface AICostumeAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  costumes: Costume[];
  onSelectCostume: (costume: Costume) => void;
}

export const AICostumeAssistant: React.FC<AICostumeAssistantProps> = ({
  isOpen,
  onClose,
  costumes,
  onSelectCostume,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [agePref, setAgePref] = useState<'Niños' | 'Adultos'>('Adultos');
  const [themePref, setThemePref] = useState<string>('Terror');
  const [budgetPref, setBudgetPref] = useState<'Económico' | 'Intermedio' | 'VIP Premium'>('Intermedio');
  const [recommendations, setRecommendations] = useState<Costume[]>([]);

  const handleGenerate = () => {
    // Filter matching costumes
    const matches = costumes.filter((c) => {
      const matchAge = c.ageCategory === agePref;
      const matchTheme = themePref === 'Todos' || c.theme.toLowerCase().includes(themePref.toLowerCase());
      return matchAge && matchTheme;
    });

    const results = matches.length > 0 ? matches : costumes.filter(c => c.ageCategory === agePref);
    setRecommendations(results.slice(0, 3));
    setStep(2);
  };

  const resetQuiz = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121218] border border-orange-500/40 rounded-3xl p-6 space-y-6 shadow-2xl shadow-orange-950/60">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-900/50 border border-purple-500/40 rounded-xl text-purple-300">
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Recomendador Inteligente de Disfraces</h3>
              <p className="text-xs text-zinc-400">Responde 3 preguntas y encuentra el disfraz perfecto para tu fiesta</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            {/* Question 1: Age */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                1. ¿Para quién es el disfraz?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAgePref('Niños')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    agePref === 'Niños' ? 'bg-orange-500 text-black border-orange-400 font-extrabold' : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                  }`}
                >
                  <span>👶 Niños / Infantil</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAgePref('Adultos')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    agePref === 'Adultos' ? 'bg-orange-500 text-black border-orange-400 font-extrabold' : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                  }`}
                >
                  <span>🧑 Adultos</span>
                </button>
              </div>
            </div>

            {/* Question 2: Theme */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                2. ¿Qué estilo prefieres?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['Terror', 'Superhéroes', 'Películas & Series', 'Época & Épico', 'Fantasía & Cuentos', 'Animales & Divertidos'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setThemePref(t)}
                    className={`p-2.5 rounded-xl border font-semibold transition-all ${
                      themePref === t ? 'bg-orange-500/20 text-orange-400 border-orange-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Budget */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                3. Rango de Presupuesto
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Económico', 'Intermedio', 'VIP Premium'] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetPref(b)}
                    className={`p-2.5 rounded-xl border font-semibold transition-all ${
                      budgetPref === b ? 'bg-orange-500/20 text-orange-400 border-orange-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Ver Mis Disfraces Sugeridos</span>
            </button>

          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h4 className="text-lg font-bold text-white">¡Aquí tienes tus mejores opciones!</h4>
              <p className="text-xs text-zinc-400">Basado en tu preferencia de <strong className="text-orange-400">{agePref} • {themePref}</strong></p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center gap-4 hover:border-orange-500/50 transition-all">
                  <img src={rec.image} alt={rec.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 text-xs space-y-1">
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">{rec.theme}</span>
                    <h5 className="font-bold text-white text-sm">{rec.name}</h5>
                    <p className="text-zinc-400 line-clamp-1">{rec.description}</p>
                    <p className="font-extrabold text-orange-400 text-sm">{rec.rentalPricePerDay}€ / día alquiler</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCostume(rec);
                      onClose();
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>Reservar</span>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold py-3 rounded-xl transition-colors"
            >
              Probar Otra Búsqueda
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
