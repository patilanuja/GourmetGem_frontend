import PropTypes from 'prop-types';
import './RecipeDetails.css';
import instance from '../BaseURL';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);  // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    instance
      .get(`/api/recipes/recipes/${id}/`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error.message}</p>;
  }

  if (!recipe) {
    return <p>No recipe found for ID {id}</p>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <h3>How to make it</h3>
      <p>{recipe.description}</p> {/* Added description field */}
    </div>
  );
};

RecipeDetails.propTypes = {
  recipeId: PropTypes.number,
};

export default RecipeDetails;
