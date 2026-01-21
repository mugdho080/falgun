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
