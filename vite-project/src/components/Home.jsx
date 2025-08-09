import React from "react";
import HomePage from "../components/Home Component/HomePage"; 
import BookPage from "./Home Component/BookPage";
import GeminiChatbotCTA from "./Home Component/GeminiChatbotCTA";
import News from "./Home Component/News";
import FeatureCards from "./Home Component/FeatureCards";
import ContactForm from "./Home Component/ContactForm";
import Nutrition from "./Home Component/Nutrition";
import HomeCourses from "./Home Component/HomeCourses";
import Series from "./Home Component/Series";
import Ho from "./Home Component/Ho";
import ProjectTimeline from "./Home Component/ProjectTimeline";

const Home = () => {
  return (
    <div className="relative min-h-screen mt-2 ">
      <HomePage />
      <News/>
      <Series/>
      <HomeCourses/>
      <Nutrition/>
      <BookPage/>
      <GeminiChatbotCTA/>
      <FeatureCards/>
      <Ho/>
      <ContactForm/>
      <ProjectTimeline/>
    </div>
  );
};

export default Home;
