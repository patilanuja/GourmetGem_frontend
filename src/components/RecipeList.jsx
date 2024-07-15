import './RecipeList.css';
import instance from '../BaseURL';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRecipeSelect = (id) => {
    navigate(`/api/recipes/recipes/${id}`);
  };

  useEffect(() => {
    if (recipeList?.length < 1) {
      instance
      .get('/api/recipes/recipes')
      .then((res) => {
        setRecipeList(res.data);
        setFilteredRecipes(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [recipeList]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredRecipes(
        recipeList.filter((recipe) =>
          recipe.name.toLowerCase().includes(lowerCaseQuery) ||
          recipe.ingredients.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, recipeList]);

  return (
    <>
      <div className="search-bar-container">
        {filteredRecipes.length === 0 ? (
            <p>Add recipes to search.</p>
          ) : (
            <input
              className="search-bar"
              type="text"
              placeholder="Search recipes by ingredients or name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
        )}
      </div>

      <div className='recipe-grid'>
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <button
              key={recipe.id}
              className="recipe-card"
              style={{ backgroundImage: `url(${recipe.image})` }}
              onClick={() => handleRecipeSelect(recipe.id)}
            >
              <span className="recipe-name">{recipe.name}</span>
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default RecipeList;
