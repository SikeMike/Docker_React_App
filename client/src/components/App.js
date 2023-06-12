import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRouteForIdentified from './PrivateRouteForIdentified';
import PrivateRouteForRandom from './PrivateRouteForRandom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CollectionPage from '../pages/CollectionPage';
import QuizPage from '../pages/QuizPage';
import CreateSinglePage from '../pages/CreateSinglePage';
import CreateMultiplePage from '../pages/CreateMultiplePage';
import CreateWritePage from '../pages/CreateWritePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<PrivateRouteForRandom/>}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<PrivateRouteForRandom/>}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path='/' element={<PrivateRouteForIdentified/>}>
          <Route path='/' element={<CollectionPage/>}/>
        </Route>
        <Route path="/quiz" element={<PrivateRouteForIdentified />}>
          <Route path="/quiz" element={<QuizPage />} />
        </Route>
        <Route path="/form-single" element={<PrivateRouteForIdentified />}>
          <Route path="/form-single" element={<CreateSinglePage />} />
        </Route>
        <Route path="/form-multiple" element={<PrivateRouteForIdentified />}>
          <Route path="/form-multiple" element={<CreateMultiplePage />} />
        </Route>
        <Route path="/form-write" element={<PrivateRouteForIdentified />}>
          <Route path="/form-write" element={<CreateWritePage />} />
        </Route>
        {/* Future pages here */}
      </Routes>
    </Router>
  );
};

export default App;
