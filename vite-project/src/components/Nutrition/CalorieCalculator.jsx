import React, { useState } from "react";
import { useNutritionStore } from "../../store/useNutritionStore";
import { useChatbotStore } from "../../store/useChatbotStore";
  import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Clipboard } from "lucide-react";


import {
    Flame,
    BarChart3,
    Utensils,
    Weight,
    GaugeCircle,
    Soup,
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

export default function CalorieCalculator() {
    const {
        userInfo,
        setUserInfo,
        calculateNutrition,
        results,
        error,
        mealIngredients,
        setMealIngredients,
        analyzeMeal,
        mealAnalysis,
    } = useNutritionStore();

    const [ingredientInput, setIngredientInput] = useState("");

    const { sendMessageToGemini, messages, addMessage } = useChatbotStore();
    const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);


    const macroData = results
        ? [
            { name: "Protein", value: results.macros.protein },
            { name: "Carbs", value: results.macros.carbs },
            { name: "Fat", value: results.macros.fat },
        ]
        : [];

    const mealMacroData = mealAnalysis
        ? [
            {
                name: "Protein",
                value: Math.round(mealAnalysis?.totalNutrients?.PROCNT?.quantity || 0),
            },
            {
                name: "Carbs",
                value: Math.round(mealAnalysis?.totalNutrients?.CHOCDF?.quantity || 0),
            },
            {
                name: "Fat",
                value: Math.round(mealAnalysis?.totalNutrients?.FAT?.quantity || 0),
            },
        ]
        : [];

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10 space-y-10">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🧬 Nutrition Analyzer
            </h1>


            {/* User Info Input */}
            <div className="bg-base-200 p-6 rounded-xl shadow-md space-y-5">
                <h2 className="text-lg font-semibold text-center text-primary">🍽️ Enter Your Details</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["age", "height", "weight"].map((key) => (
                        <div key={key} className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    {key === "age"
                                        ? "🎂 Age"
                                        : key === "height"
                                            ? "📏 Height (cm)"
                                            : "⚖️ Weight (kg)"}
                                </span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                placeholder={
                                    key === "age"
                                        ? "Enter your age"
                                        : key === "height"
                                            ? "Enter height in cm"
                                            : "Enter weight in kg"
                                }
                                className="input input-bordered input-primary w-full"
                                value={userInfo[key] || ""}
                                onChange={(e) => setUserInfo({ [key]: Number(e.target.value) })}
                            />
                        </div>
                    ))}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">🔥 Activity Level</span>
                        </label>
                        <select
                            className="select select-bordered select-primary w-full"
                            value={userInfo.activity}
                            onChange={(e) => setUserInfo({ activity: e.target.value })}
                        >
                            <option value="">Select activity level</option>
                            <option value="sedentary">🛋️ Sedentary</option>
                            <option value="light">🚶 Light</option>
                            <option value="moderate">🏃 Moderate</option>
                            <option value="active">🏋️ Active</option>
                            <option value="very_active">🏃‍♂️💨 Very Active</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">🎯 Goal</span>
                        </label>
                        <select
                            className="select select-bordered select-primary w-full"
                            value={userInfo.goal}
                            onChange={(e) => setUserInfo({ goal: e.target.value })}
                        >
                            <option value="">Select your goal</option>
                            <option value="lose">📉 Lose Weight</option>
                            <option value="maintain">⚖️ Maintain</option>
                            <option value="gain">💪 Gain Muscle</option>
                        </select>
                    </div>

                </div>



                <button
                    className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2 text-base"
                    onClick={calculateNutrition}
                >
                    <BarChart3 className="w-5 h-5" />
                    Calculate
                </button>

                {error && <p className="text-red-500 text-center font-medium">{error}</p>}
            </div>


            {/* Personal Results Section */}
            {results && (
                <div className="bg-base-100 rounded-xl p-6 shadow space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="stat bg-base-200 shadow rounded-xl p-4">
                            <div className="stat-title text-primary flex items-center">
                                <GaugeCircle className="mr-2" /> BMI
                            </div>
                            <div className="stat-value text-lg">{results.bmi}</div>
                            <div className="stat-desc">{results.bmiCategory}</div>
                        </div>

                        <div className="stat bg-base-200 shadow rounded-xl p-4">
                            <div className="stat-title text-primary flex items-center">
                                <Flame className="mr-2" /> BMR
                            </div>
                            <div className="stat-value text-lg">{results.bmr} kcal/day</div>
                        </div>

                        <div className="stat bg-base-200 shadow rounded-xl p-4">
                            <div className="stat-title text-primary flex items-center">
                                <BarChart3 className="mr-2" /> TDEE
                            </div>
                            <div className="stat-value text-lg">{results.tdee} kcal/day</div>
                        </div>

                        <div className="stat bg-base-200 shadow rounded-xl p-4">
                            <div className="stat-title text-primary flex items-center">
                                <Weight className="mr-2" /> Target Calories
                            </div>
                            <div className="stat-value text-lg">{results.goalCalories} kcal/day</div>
                        </div>

                        <div className="stat bg-base-200 shadow rounded-xl p-4 col-span-1 sm:col-span-2">
                            <div className="stat-title text-primary flex items-center">
                                <Utensils className="mr-2" /> Macros
                            </div>
                            <div className="stat-value text-sm flex flex-wrap gap-4">
                                <span className=""> Protein: {results.macros.protein}g</span>
                                <span className=""> Carbs: {results.macros.carbs}g</span>
                                <span className=""> Fat: {results.macros.fat}g</span>
                            </div>

                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                        {/* 🥧 Pie Chart Card */}
                        <div className=" dark:bg-base-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-center mb-6 text-gray-3 dark:text-white">
                                🥧 Macronutrient Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={macroData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        isAnimationActive={true}
                                    >
                                        {macroData.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                stroke="#ffffff"
                                                strokeWidth={2}
                                                cursor="pointer"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
                                        labelStyle={{ fontWeight: "bold", color: "#374151" }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        iconType="circle"
                                        wrapperStyle={{ paddingTop: 10 }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 📊 Bar Chart Card */}
                        <div className="  dark:bg-base-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-center mb-6 text-gray-300 dark:text-white">
                                📊 Macronutrient Comparison
                            </h3>
                            <ResponsiveContainer width="100%" height={260} className="">
                                <BarChart data={macroData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
                                        labelStyle={{ fontWeight: "bold", color: "#374151" }}
                                    />
                                    <Legend
                                        verticalAlign="top"
                                        iconType="rect"
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#4f46e5"
                                        radius={[8, 8, 0, 0]}
                                        barSize={45}
                                        cursor="pointer"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>



                    <div>
                        <h3 className="text-lg font-semibold mt-4">✅ Recommendations</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>🥗 Eat whole foods and avoid processed sugar.</li>
                            <li>🥤 Drink at least 2–3 liters of water daily.</li>
                            <li>🍳 Balance your meals with lean protein and good fats.</li>
                            <li>🏃‍♂️ Match your TDEE with consistent activity.</li>
                        </ul>
                    </div>
                 

<div className="mt-6">
  <button
    className="btn btn-secondary w-full"
    disabled={isGeneratingAdvice}
    onClick={async () => {
      setIsGeneratingAdvice(true);

      const prompt = `Give personalized health and nutrition advice for:
Age: ${userInfo.age}, Height: ${userInfo.height} cm, Weight: ${userInfo.weight} kg, Activity: ${userInfo.activity}, Goal: ${userInfo.goal}.
BMI: ${results.bmi} (${results.bmiCategory}), BMR: ${results.bmr}, TDEE: ${results.tdee}, Target Calories: ${results.goalCalories}.
Protein: ${results.macros.protein}g, Carbs: ${results.macros.carbs}g, Fat: ${results.macros.fat}g.`;

      await sendMessageToGemini(prompt);
      setIsGeneratingAdvice(false);
    }}
  >
    🧠 Get AI Health Advice
  </button>
</div>

{messages
  .filter((msg) => msg.role === "bot" && msg.text !== "⏳ Thinking...")
  .slice(-1)
  .map((msg, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-6 relative rounded-2xl shadow-xl border-l-8 border-secondary bg-gradient-to-br from-base-200 to-base-100 p-6"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-xl font-bold text-secondary flex items-center gap-2">
          🤖 AI Advice
          <span className="text-sm font-normal text-gray-500">
            (based on your input)
          </span>
        </h4>

        <button
          onClick={() => {
            navigator.clipboard.writeText(msg.text);
            toast.success("📋 Copied to clipboard!");
          }}
          className="btn btn-sm btn-outline btn-secondary flex items-center gap-2"
          title="Copy to clipboard"
        >
          <Clipboard className="w-4 h-4" />
          Copy
        </button>
      </div>

      <div className="prose max-w-none text-sm md:text-base text-gray-300 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {msg.text}
      </div>
    </motion.div>
))}




                </div>
            )}

            {/* Meal Nutrition Analyzer */}
            <div className="bg-base-200 rounded-xl p-6 space-y-4 shadow">
                <h2 className="text-2xl font-semibold mb-2">🍽️ Meal Nutrition Analyzer</h2>
                <textarea
                    className="textarea textarea-bordered w-full min-h-[150px]"
                    placeholder={`Enter ingredients, one per line:\nExample:\n2 eggs\n1 cup rice\n1 slice bread`}
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button
                    className="btn btn-accent w-full"
                    onClick={() => {
                        const newIngr = ingredientInput
                            .split("\n")
                            .map((i) => i.trim())
                            .filter(Boolean);
                        setMealIngredients(newIngr);
                        analyzeMeal();
                    }}
                >
                    <Soup className="mr-2" /> Analyze Meal
                </button>

                {/* Table and Charts */}
                {mealAnalysis && (
                    <>
                        <div className="overflow-x-auto mt-6">
                            <h3 className="text-lg font-semibold mb-2">🍱 Meal Summary Table</h3>
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Nutrient</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Calories</td><td>{Math.round(mealAnalysis?.calories || 0)} kcal</td></tr>
                                    <tr><td>Protein</td><td>{Math.round(mealAnalysis?.totalNutrients?.PROCNT?.quantity || 0)} g</td></tr>
                                    <tr><td>Carbs</td><td>{Math.round(mealAnalysis?.totalNutrients?.CHOCDF?.quantity || 0)} g</td></tr>
                                    <tr><td>Fat</td><td>{Math.round(mealAnalysis?.totalNutrients?.FAT?.quantity || 0)} g</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                            {/* Pie Chart */}
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={mealMacroData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label
                                    >
                                        {mealMacroData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Bar Chart */}
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mealMacroData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#00C49F" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
