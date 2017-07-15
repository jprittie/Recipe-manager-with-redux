import React from 'react';
import { connect } from 'react-redux';
import RecipeDetail from './recipedetail.component.js';


const mapStateToProps = (state) => ({
  selectedRecipe: state.selectedRecipe,
})

const actions = {
  onSaveRecipe: saveToMyRecipes
}


export default connect(mapStateToProps, actions)(RecipeDetail);