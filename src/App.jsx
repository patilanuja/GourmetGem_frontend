import './App.css';
import HomeComponent from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomeComponent />}/>
            <Route path="/api/recipes/recipes" element={<RecipeList />}/>
            <Route path="/api/recipes/recipes/:id/" element={<RecipeDetails />}/>
          </Route>
        </Routes>
    </BrowserRouter>

    </div>
  );
};

export default App;
