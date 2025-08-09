import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import nutritionAnimation from "../../assets/nutrition.json";
import InfiniteMenu from "./InfiniteMenu";
import learningIcon from "../../assets/learning.png";
import food2 from "../../assets/food2.png";
import food3 from "../../assets/food3.png";
const items = [
    {
        image: food2,
        link: 'https://google.com/',
        title: 'Item 1',
        description: 'This is pretty cool, right?'
    },
    {
        image: food3,
        link: 'https://google.com/',
        title: 'Item 2',
        description: 'This is pretty cool, right?'
    },
    {
        image: 'https://picsum.photos/500/500?grayscale',
        link: 'https://google.com/',
        title: 'Item 3',
        description: 'This is pretty cool, right?'
    },
    {
        image: 'https://picsum.photos/600/600?grayscale',
        link: 'https://google.com/',
        title: 'Item 4',
        description: 'This is pretty cool, right?'
    }
];

export default function Nutrition() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex flex-col items-center px-0 pt-24 pb-20 overflow-x-hidden z-0">
            {/* Decorative blurred orbs */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-x-hidden">
                <div className="blur-[120px] opacity-20 bg-primary absolute w-[400px] h-[190px] rounded-full left-[-80px] top-[-80px]" />
                <div className="blur-2xl opacity-10 bg-secondary absolute w-96 h-44 top-1/2 right-[-60px] rounded-full -translate-y-1/2" />
            </div>

            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center gap-16 py-14 z-10">
                {/* Left: Animation */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="bg-base-100/90 dark:bg-base-200/75 backdrop-blur-lg border border-base-300 rounded-3xl shadow-2xl p-7 w-full max-w-xs md:max-w-md">
                        <Lottie animationData={nutritionAnimation} loop autoplay className="w-full" />
                    </div>
                </div>

                {/* Right: Info Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-5">
                    <span className="badge badge-success font-semibold mb-2 px-3 py-2 uppercase tracking-wide text-xs">
                        🥗 Nutrition Smart Hub
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent drop-shadow">
                        Master Your Calories & Stay Healthy
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/80 mb-2 font-medium max-w-xl">
                        Reach your health goals! Log, track, and get actionable insights for calories, macronutrients, hydration, and smarter meals.
                    </p>
                    <ul className="list-disc list-inside text-base-content/70 text-base md:text-lg pl-2 mb-4 max-w-lg">
                        <li>Track daily calories, protein, carbs, and healthy fats</li>
                        <li>Visualize your diet in real time</li>
                        <li>Get AI tips for better eating</li>
                        <li>Stay hydrated and energized</li>
                        <li>Personalized to your fitness goals</li>
                        <li>Snack smart, portion wisely, and enjoy dessert without guilt</li>
                    </ul>
                    <div className="inline-block text-lg font-bold bg-base-200 py-2 px-5 rounded-full border border-base-300 shadow-inner mb-2">
                        🍴 <span className="text-primary font-black">{items.length}</span> Nutrition Tips
                    </div>
                    <button
                        onClick={() => navigate("/nutrition")}
                        className="btn btn-primary btn-lg px-8 rounded-full font-extrabold shadow-lg hover:scale-105 hover:bg-secondary focus:outline-none transition-transform duration-200"
                    >
                        <span role="img" aria-label="chart" className="mr-2">📊</span>
                        Launch Calorie Calculator
                    </button>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-5xl mx-auto my-10 px-8">
                <div className="h-[2px] bg-gradient-to-r from-primary/20 via-base-300 to-secondary/20 rounded-full" />
            </div>

            <section className="w-full flex flex-col items-center px-2 md:px-0 z-10">
                <div className="w-full max-w-7xl mx-auto relative my-8">
                    {/* Optional background accent for glass/lighting effect */}
                    <div className="absolute -inset-2 pointer-events-none z-0">
                        <div className="w-full h-full  rounded-[2.2rem] blur-xl opacity-60" />
                    </div>
                    <div className="relative  backdrop-blur-xl p-7 md:p-12 flex flex-col gap-6 z-10 overflow-hidden">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="badge badge-success px-3 py-2 font-semibold text-sm shadow rounded-xl text-success-content tracking-wide bg-success/10">
                                <span role="img" aria-label="apple">🍏</span> Nutri Picks
                            </span>
                            <div className="flex-1 h-[3px] bg-gradient-to-r from-success/60 via-base-300 to-primary/40 rounded-full animate-pulse" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-1 tracking-tight">
                            Nutrition Ideas & Meal Suggestions
                        </h2>
                        <p className="text-base md:text-lg text-base-content/70 mb-2 leading-relaxed">
                            Discover balanced meals, snacks, and hydration tips for every goal. Each pick is nutrient-rich and ready to power your day!
                        </p>
                        {/* Nutrition Infinite Menu (glass card base) */}
                        <div className="relative w-full rounded-2xl border border-success/20 bg-base-100/80 dark:bg-base-200/80 shadow-lg p-3"
                            style={{ minHeight: 420, height: 520 }}>
                            <InfiniteMenu items={items} />
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-base-100/80 to-transparent rounded-b-2xl" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
