
import React, { useState } from 'react';
import { INITIAL_DISHES, COMMITTEE_MEMBERS } from './constants';
import { DishItem } from './types';

const App: React.FC = () => {
  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [newDish, setNewDish] = useState({ name: '', contributor: '', category: 'TBD' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'rules' | 'items' | 'committee'>('rules');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsult, setAiInsult] = useState<string>('');

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Main': return { bg: 'bg-red-100', text: 'text-red-700', icon: 'fa-drumstick-bite' };
      case 'Side': return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'fa-leaf' };
      case 'Dessert': return { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'fa-cookie' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'fa-question' };
    }
  };

  const askCommitteeAI = async () => {
    setIsAiLoading(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        setAiInsult("কমিটির API কী পাওয়া যায়নি। অ্যাডমিনকে বলুন VITE_GEMINI_API_KEY সেট করতে।");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are a very sarcastic and funny Bengali 'Committee President' for a Pahela Falgun party. Write a 2-line funny warning or comment for people who bring only 100g of food or try to bring 'Chaler Ruti' as a one-dish. Use a mix of English and Bengali. Be dramatic.",
        config: { temperature: 1.2 }
      });
      setAiInsult(response.text || "কমিটি এখনো ঘুমাচ্ছে। পরে আসেন।");
    } catch (e) {
      setAiInsult("AI Committee Member is currently eating. No comments.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const initiateAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name || !newDish.contributor) return;
    setShowConfirm(true);
  };

  const confirmAddDish = () => {
    const item: DishItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDish.name,
      contributor: newDish.contributor,
      status: 'Under Review',
      category: newDish.category
    };
    
    setDishes([item, ...dishes]);
    setNewDish({ name: '', contributor: '', category: 'TBD' });
    setShowConfirm(false);
    alert("আপনার আবেদন জমা হয়েছে। কমিটি এখন আপনার ডিশটি বিচার করবে!");
  };

  return (
    <div className="min-h-screen pb-20 relative">
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn border-4 border-orange-400">
            <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
              <i className="fas fa-clipboard-check mr-3"></i> শেষ বার ভাবুন!
            </h3>
            <p className="text-gray-600 mb-6">কমিটির কাছে জমা দেওয়ার আগে চেক করে নিন। একবার জমা দিলে কিন্তু আর পাল্টানো যাবে না (ঘুষ ছাড়া)!</p>
            <div className="bg-orange-50 p-4 rounded-2xl mb-6 space-y-2 border border-orange-100">
              <p><strong>ডিশ:</strong> {newDish.name}</p>
              <p><strong>অবদানকারী:</strong> {newDish.contributor}</p>
              <p><strong>ক্যাটাগরি:</strong> {newDish.category}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition"
              >
                ভুল হয়েছে
              </button>
              <button 
                onClick={confirmAddDish}
                className="flex-1 py-3 falgun-gradient text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition"
              >
                ঠিক আছে, জমা দিন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="falgun-gradient text-white py-12 px-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <i className="fas fa-leaf absolute text-4xl transform rotate-45 top-4 left-10"></i>
          <i className="fas fa-sun absolute text-6xl top-10 right-20"></i>
          <i className="fas fa-pepper-hot absolute text-4xl bottom-4 left-1/4"></i>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">🌼 পহেলা ফাল্গুন ২০২৬ 🌼</h1>
        <p className="text-xl md:text-2xl font-medium">একডিশ পার্টি – মহাগুরুত্বপূর্ণ পোর্টাল</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <span className="bg-white/20 px-4 py-2 rounded-full"><i className="fas fa-map-marker-alt mr-2"></i>Oatley Park, NSW</span>
          <span className="bg-white/20 px-4 py-2 rounded-full"><i className="fas fa-calendar-day mr-2"></i>৭ই ফেব্রুয়ারি, ২০২৬</span>
          <span className="bg-white/20 px-4 py-2 rounded-full"><i className="fas fa-clock mr-2"></i>দুপুর ২টা (আগে আসা নিষেধ)</span>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="sticky top-0 bg-white shadow-md z-50 mb-8 border-b-4 border-orange-400">
        <div className="max-w-4xl mx-auto flex justify-around p-2">
          <button 
            onClick={() => setActiveTab('rules')}
            className={`flex-1 py-3 px-2 text-center font-bold rounded-lg transition-all ${activeTab === 'rules' ? 'bg-orange-500 text-white shadow-inner' : 'hover:bg-orange-50'}`}
          >
            📜 বিধি-বিধান
          </button>
          <button 
            onClick={() => setActiveTab('items')}
            className={`flex-1 py-3 px-2 text-center font-bold rounded-lg transition-all ${activeTab === 'items' ? 'bg-orange-500 text-white shadow-inner' : 'hover:bg-orange-50'}`}
          >
            🍛 ডিশ লিস্ট
          </button>
          <button 
            onClick={() => setActiveTab('committee')}
            className={`flex-1 py-3 px-2 text-center font-bold rounded-lg transition-all ${activeTab === 'committee' ? 'bg-orange-500 text-white shadow-inner' : 'hover:bg-orange-50'}`}
          >
            🗳️ কমিটি
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4">
        {activeTab === 'rules' && (
          <div className="space-y-6 animate-fadeIn">
            {/* New Dress Code Section */}
            <div className="bg-purple-50 p-6 rounded-2xl shadow-sm border-l-8 border-purple-500">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <i className="fas fa-tshirt mr-3"></i> পোশাক বিধি (Dress Code) - কঠোর সতর্কতা!
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-pink-600 mb-2 underline decoration-pink-200 uppercase tracking-wide flex items-center">
                    <i className="fas fa-female mr-2"></i> নারীদের জন্য:
                  </h3>
                  <p className="text-lg">অবশ্যই <span className="font-bold text-purple-700 italic">শাড়ি</span> পরতে হবে।</p>
                  <p className="text-xs text-gray-500 mt-2 italic">শাড়ি সামলাতে না পেরে পড়ে গেলে কমিটি হাত বাড়িয়ে দেবে না, শুধু ছবি তুলবে!</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-blue-600 mb-2 underline decoration-blue-200 uppercase tracking-wide flex items-center">
                    <i className="fas fa-male mr-2"></i> পুরুষদের জন্য:
                  </h3>
                  <p className="text-lg">অবশ্যই <span className="font-bold text-purple-700 italic">পাঞ্জাবি</span> সঙ্গে প্যান্ট বা পায়জামা।</p>
                  <p className="text-xs text-gray-500 mt-2 italic">শর্টস বা টি-শার্ট পরে আসলে আপনাকে 'বিশেষ উপদেষ্টা'র সাথে রোদে বসিয়ে রাখা হবে!</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-orange-500">
              <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <i className="fas fa-gavel mr-3"></i> ১. একডিশ মানে সত্যিই একডিশ!
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">●</span>
                  <span>প্রত্যেক অংশগ্রহণকারীকে এক (১) টি মাত্র ডিশ আনতেই হবে। 'আমি শুধু এসেছি' চলবে না।</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">●</span>
                  <span>প্রতিটি ডিশের ওজন হতে হবে ২০০ গ্রাম থেকে ৩০০ গ্রাম। (ওজন কমালে খবর আছে!)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">●</span>
                  <span>অ্যালুমিনিয়াম ফয়েল ট্রে + Cling Wrap বাধ্যতামূলক। পত্রিকা বা শপিং ব্যাগ আনলে এন্ট্রি ফি ডাবল!</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl shadow-sm border-l-8 border-red-500">
              <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <i className="fas fa-ban mr-3"></i> ২. সাবডিশ ও বর্ডার আইন
              </h2>
              <p className="text-lg italic mb-4">ডিশের ভেতরে কোনো ধরনের সীমারেখা, পার্টিশন বা জাতিসংঘ অনুমোদিত বর্ডার রাখা যাবে না।</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl text-center border border-red-200">
                  <span className="text-red-500 font-bold">❌ ভাত + কারি</span>
                </div>
                <div className="bg-white p-4 rounded-xl text-center border border-red-200">
                  <span className="text-red-500 font-bold">❌ পোলাও + কাবাব</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-2xl shadow-sm border-l-8 border-yellow-500">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <i className="fas fa-ring mr-3"></i> ৩. বৈবাহিক স্ট্যাটাস ভিত্তিক আইন
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <h3 className="font-bold text-green-700">💍 বিবাহিত:</h3>
                  <p>দুজনে মিলে ১টি ডিশ যথেষ্ট। কমিটির তরফ থেকে আপনাদের জন্য সহানুভূতি রইল।</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <h3 className="font-bold text-red-700">💔 অবিবাহিত/সিঙ্গেল:</h3>
                  <p>নিজ নিজ ডিশ নিজে আনতেই হবে। একই বাসায় থাকলেও কোনো ছাড় নেই। এমনকি ফ্রিজ শেয়ার করলেও আলাদা ডিশ!</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-orange-100 rounded-3xl text-center border-4 border-dashed border-orange-300">
              <p className="text-xl font-bold text-orange-800 mb-4">কমিটির বিশেষ ঘোষণা:</p>
              <p className="text-gray-700 italic">"নিয়ম ভাঙলে শাস্তি নেই, কিন্তু কমিটির চোখের কোণার হাসি একটু কমে যেতে পারে 😄"</p>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-orange-900">চূড়ান্ত ডিশ তালিকা</h2>
              <button 
                onClick={askCommitteeAI}
                disabled={isAiLoading}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center disabled:opacity-50"
              >
                <i className={`fas ${isAiLoading ? 'fa-spinner fa-spin' : 'fa-robot'} mr-2`}></i> কমিটি AI মতামত
              </button>
            </div>

            {aiInsult && (
              <div className="bg-purple-100 border-2 border-purple-300 p-4 rounded-xl mb-6 flex items-start gap-4">
                <div className="text-3xl">👺</div>
                <div>
                  <h4 className="font-bold text-purple-900">কমিটি প্রেসিডেন্ট (AI):</h4>
                  <p className="text-purple-800 italic">{aiInsult}</p>
                </div>
              </div>
            )}

            <div className="grid gap-4 mb-10">
              {dishes.map((dish) => {
                const categoryStyle = getCategoryStyle(dish.category);
                return (
                  <div key={dish.id} className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-orange-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${categoryStyle.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                        <i className={`fas ${categoryStyle.icon} ${categoryStyle.text} text-xl`}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-800 leading-tight">{dish.name}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${categoryStyle.bg} ${categoryStyle.text} border`}>
                            {dish.category}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">অবদানকারী: <span className="text-orange-600 font-bold">{dish.contributor}</span></p>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-black shadow-sm text-center uppercase tracking-widest ${
                      dish.status === 'Finalised' ? 'bg-green-100 text-green-700 border border-green-200' : 
                      dish.status === 'Bribed' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {dish.status}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-200 shadow-inner">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">আবেদন করুন (Apply to Bring a Dish)</h3>
              <form onSubmit={initiateAddDish} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">ডিশের নাম</label>
                    <input 
                      type="text" 
                      value={newDish.name}
                      required
                      onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                      placeholder="যেমন: নবাবী শাহী পোলাও" 
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">আপনার নাম</label>
                    <input 
                      type="text" 
                      value={newDish.contributor}
                      required
                      onChange={(e) => setNewDish({...newDish, contributor: e.target.value})}
                      placeholder="যেমন: ডন তানভীর" 
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">ক্যাটাগরি</label>
                  <select 
                    value={newDish.category}
                    onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="TBD">TBD (কমিটির দয়ার উপর)</option>
                    <option value="Main">Main (ভারী খাবার)</option>
                    <option value="Side">Side (ভর্তা-ভাজি-পানীয়)</option>
                    <option value="Dessert">Dessert (মিষ্টিমুখ)</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 falgun-gradient text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                  কমিটির কাছে আবেদন জমা দিন
                </button>
              </form>
              <p className="text-xs text-center text-gray-500 mt-4 italic">বি:দ্র: আবেদন জমা দেওয়া মানেই অনুমোদন নয়। ঘুষ হিসেবে মিষ্টি আনলে দ্রুত কাজ হতে পারে।</p>
            </div>
          </div>
        )}

        {activeTab === 'committee' && (
          <div className="animate-fadeIn pb-10">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">কমিটি নির্বাচন বিধিমালা ও গঠন</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {COMMITTEE_MEMBERS.map((member, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border-b-8 border-orange-300 rule-card transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                      <i className={`fas ${member.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{member.role}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{member.description}</p>
                  <div className="bg-gray-50 p-2 rounded-lg text-xs font-mono text-gray-500 border border-gray-100">
                    POWER LEVEL: {member.power}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border-2 border-orange-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 bg-orange-500 text-white font-bold rounded-bl-3xl">যোগ্যতা</div>
               <h3 className="text-2xl font-bold text-gray-800 underline decoration-orange-400">কমিটির সদস্য হতে হলে:</h3>
               <ul className="space-y-4 text-lg">
                 <li className="flex items-center gap-3">
                    <i className="fab fa-whatsapp text-green-500 text-2xl"></i>
                    <span>Seen দিয়ে রিপ্লাই না দেওয়ার অভ্যাস থাকতে হবে।</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <i className="fas fa-ghost text-gray-400 text-2xl"></i>
                    <span>'সবাই ঠিক আছে তো?' লিখে অদৃশ্য হয়ে যাওয়ার ক্ষমতা থাকতে হবে।</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <i className="fas fa-user-clock text-blue-500 text-2xl"></i>
                    <span>সর্বোপরি, ফ্রি সময় কম থাকার ভান করতে জানতে হবে।</span>
                 </li>
               </ul>
            </div>

            <div className="mt-10 p-6 bg-red-100 rounded-2xl border-2 border-red-300 text-center shadow-inner">
              <h4 className="text-red-800 font-bold mb-2 uppercase tracking-widest text-sm">গোপন ধারা (Most Important Clause)</h4>
              <p className="text-red-700 italic text-xl font-medium">"কমিটির সব সিদ্ধান্ত হবে সর্বসম্মতিক্রমে অথবা যিনি সবচেয়ে জোরে কথা বলবেন তার পক্ষে!"</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for "Panic" */}
      <button 
        onClick={() => alert("আতঙ্কিত হবেন না! পার্টিতে আসা বাধ্যতামূলক। কোনো অজুহাত চলবে না।")}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl animate-bounce z-50 hover:bg-red-700 transition-colors"
        title="Panic Button"
      >
        <i className="fas fa-exclamation-triangle"></i>
      </button>

      <footer className="mt-20 py-8 bg-gray-900 text-gray-400 text-center text-sm px-4">
        <p className="mb-2">© ২০২৬ পহেলা ফাল্গুন কমিটি (অাতঙ্কিত জনকল্যাণ সংস্থা)</p>
        <p>সবাইকে অনুরোধ— ডিশ আনুন, হাসি আনুন, আর পহেলা ফাল্গুন উপভোগ করুন! 🌼</p>
      </footer>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
