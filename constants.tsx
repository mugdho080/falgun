
import { DishItem, CommitteeMember } from './types';

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    role: "সভাপতি (President)",
    description: "যিনি কিছুই করেন না কিন্তু সব সিদ্ধান্ত তার।",
    power: "Infinite (on paper)",
    icon: "fa-crown text-yellow-500"
  },
  {
    role: "সাধারণ সম্পাদক (General Secretary)",
    description: "যিনি সব কাজ করেন কিন্তু কৃতিত্ব পান না।",
    power: "Negative energy",
    icon: "fa-pen-nib text-blue-500"
  },
  {
    role: "খাদ্য সমন্বয়কারী (Food Coordinator)",
    description: "যার ফোন সবসময় ব্যস্ত থাকবে।",
    power: "Always busy",
    icon: "fa-phone-volume text-green-500"
  },
  {
    role: "বিশেষ উপদেষ্টা (Special Advisor)",
    description: "যিনি কোনো সিদ্ধান্তে আসেন না, শুধু উপদেশ দেন।",
    power: "Unlimited Wisdom",
    icon: "fa-brain text-purple-500"
  }
];

export const INITIAL_DISHES: DishItem[] = [
  { id: '1', name: 'Mutton Rezala', contributor: 'Tanvir Bhai', status: 'Finalised', category: 'Main' },
  { id: '2', name: 'Chicken Roast', contributor: 'Rumana Bhabi', status: 'Finalised', category: 'Main' },
  { id: '3', name: 'Beef Kala Bhuna', contributor: 'Committee (Self)', status: 'Finalised', category: 'Main' },
  { id: '4', name: 'Egg Korma', contributor: 'Zunaid', status: 'Bribed', category: 'Side' },
  { id: '5', name: 'Jorda/Sweet', contributor: 'Adnan', status: 'Under Review', category: 'Dessert' },
  { id: '6', name: 'Shahi Tukda', contributor: 'Nafisa Matin Jahin', status: 'Finalised', category: 'Dessert' },
  { id: '7', name: 'Aloo Bokhara Chatney', contributor: 'Adil Ahnaf Mugdho', status: 'Under Review', category: 'Side' },
  { id: '8', name: 'Borhani', contributor: 'Kakon Rahman', status: 'Finalised', category: 'Side' },
  { id: '9', name: 'Pulao', contributor: 'Ar Rafi', status: 'Finalised', category: 'Main' },
  { id: '10', name: 'Kebab Special', contributor: 'Nafis Mahmud', status: 'Bribed', category: 'Main' }
];

export const DRAMATIC_RULES = [
  "একডিশ মানে সত্যিই একডিশ! 'আমি খাই না' বলে পালানো যাবে না।",
  "ওজন ২০০-৩০০ গ্রাম হতে হবে। ১৯৯ গ্রাম হলে কমিটির আঁচল দিয়ে মাপা হবে না কিন্তু পাপ হবে!",
  "কোনো সাবডিশ চলবে না। পোলাও + কাবাব = জাতিসংঘ অনুমোদিত বর্ডার লঙ্ঘন!",
  "FIFO (First In First Out) নিয়ম। আগে জানালে ভালো ডিশ, পরে জানালে শুধু ডালভাত!",
  "বিয়ে করলে ১টা ডিশ মাফ। না করলে একা আসলেও ১টা ডিশ আনতেই হবে।",
  "কমিটির সিদ্ধান্তের বিরুদ্ধে আপিল করলে ফলাফল আগেই নির্ধারিত থাকবে!"
];
