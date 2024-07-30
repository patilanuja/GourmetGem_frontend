import './RecipeList.css';
import instance from '../BaseURL';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRecipeSelect = (id) => {
    navigate(`/api/recipes/recipes/${id}`);
  };

  const handleFavorite = (id) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter(favId => favId !== id);
    } else {
      updatedFavorites.push(id);
    }
    setFavorites(updatedFavorites);
    Cookies.set('favorites', JSON.stringify(updatedFavorites), { expires: 365 });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await instance.get('/api/recipes/recipes');
        setRecipeList(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(Cookies.get('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = recipeList.filter(recipe =>
      recipe.name.toLowerCase().includes(lowerCaseQuery) ||
      recipe.ingredients.toLowerCase().includes(lowerCaseQuery)
    );

    const sortedRecipes = filtered.sort((a, b) => {
      const aIsFav = favorites.includes(a.id);
      const bIsFav = favorites.includes(b.id);
      if (aIsFav && !bIsFav) return -1;
      if (!aIsFav && bIsFav) return 1;
      return 0;
    });

    setFilteredRecipes(sortedRecipes);
  }, [searchQuery, recipeList, favorites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-list-container">
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
            <div key={recipe.id} className="recipe-card-container">
              <button
                className="recipe-card"
                style={{ backgroundImage: `url(${recipe.image})` }}
                onClick={() => handleRecipeSelect(recipe.id)}
              >
                <span className="recipe-name">{recipe.name}</span>
              </button>
              <button
                className={`favorite-button ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                onClick={() => handleFavorite(recipe.id)}
              >
                <FontAwesomeIcon icon={favorites.includes(recipe.id) ? faStar : faStarRegular} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
