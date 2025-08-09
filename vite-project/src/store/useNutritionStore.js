import { create } from "zustand";
import axios from "axios";

const ANALYSIS_API = "https://api.edamam.com/api/nutrition-details";
const FOOD_API_URL = "https://api.edamam.com/api/food-database/v2/parser";
const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

export const useNutritionStore = create((set, get) => ({
  userInfo: {
    age: null,
    sex: "male",
    height: null,
    weight: null,
    activity: "sedentary",
    goal: "maintain",
  },

  mealIngredients: [],
  mealAnalysis: null,

  results: null,
  recommendations: [],
  selectedFood: null,

  loading: false,
  error: null,

  setUserInfo: (info) => set((s) => ({ userInfo: { ...s.userInfo, ...info } })),
  setMealIngredients: (ingredients) => set({ mealIngredients: ingredients }),

  calculateNutrition: () => {
    const { age, sex, height, weight, activity, goal } = get().userInfo;
    if (!age || !height || !weight) {
      return set({ error: "Please fill in all fields." });
    }
    const bmi = weight / ((height / 100) ** 2);
    const bmr =
      sex === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const factorMap = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    const goalMap = { lose: 0.85, maintain: 1, gain: 1.15 };
    const tdee = bmr * (factorMap[activity] || 1.2);
    const goalCalories = tdee * (goalMap[goal] || 1);

    const macros = {
      protein: Math.round((goalCalories * 0.3) / 4),
      carbs: Math.round((goalCalories * 0.45) / 4),
      fat: Math.round((goalCalories * 0.25) / 9),
    };

    set({
      results: {
        bmi: bmi.toFixed(1),
        bmiCategory: bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese",
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goalCalories: Math.round(goalCalories),
        macros,
      },
      error: null,
    });
  },

  analyzeMeal: async () => {
    const { mealIngredients } = get();
    if (!mealIngredients || mealIngredients.length === 0) {
      return set({ error: "Add at least one meal ingredient." });
    }

    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${ANALYSIS_API}?app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          title: "User Meal",
          ingr: mealIngredients,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      set({ mealAnalysis: res.data, loading: false });

    } catch (err) {
      set({
        error: err?.response?.data?.message || "Meal analysis failed.",
        loading: false,
      });
    }
  },

  suggestFoods: async (query) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${FOOD_API_URL}`, {
        params: { ingr: query, app_id: APP_ID, app_key: APP_KEY },
      });
      set({ recommendations: res.data.hints || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  selectFood: async (food) => {
    set({ selectedFood: food.food });
  },
}));
