import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AiChatbotInterface from "pages/ai-chatbot-interface";
import UserDashboard from "pages/user-dashboard";
import SchemeSearchAndBrowse from "pages/scheme-search-and-browse";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/ai-chatbot-interface" element={<AiChatbotInterface />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/scheme-search-and-browse" element={<SchemeSearchAndBrowse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;