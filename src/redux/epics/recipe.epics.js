import { RECIPE_ACTIONS } from '../actions/recipe.actions';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';


const APP_ID = 'e7e216b0';
const APP_KEY = '0b5ad1a1dcce889c9ea6a9df1e16a318';
const BASE_ENDPOINT = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`;



export const getRecipeByNameEpic = action$ =>


  action$.ofType(RECIPE_ACTIONS.GET_RECIPES_BY_NAME)
    .flatMap(action =>
      Observable.concat(
        // Fire 3 actions, one after the other
        Observable.of({
          type: RECIPE_ACTIONS.SET_LOADING_STATE,
          payload: true
        }),
        Observable.ajax(`${BASE_ENDPOINT}&q=${action.payload.textInput}&from=0&to=9&calories=gte${action.payload.maxCalories}`)
          .map(({ response }) => ({
            type: RECIPE_ACTIONS.RECIPES_RECEIVED_SUCCESS,
            payload: response.hits.map(hit => hit.recipe)
          }))
          .catch(error => Observable.of({
            type: RECIPE_ACTIONS.RECIPES_RECEIVED_ERROR,
            payload: error.xhr.response,
            error: true
          })),
          Observable.of({
            type: RECIPE_ACTIONS.SET_LOADING_STATE,
            payload: false
          })

      )
    );




  //  action$.ofType(RECIPE_ACTIONS.GET_RECIPES_BY_NAME)
  //    .mergeMap(action =>
        /*you can use basically any kind of observable or promise in a mergemap
        if you return any sort of async object that rxjs understands (which is most). it automatically deals with WAITING for this async action to complete before moving on to the next method in the chain. think of merge map like a map that WAITS until whatever you return is finished. here we are saying, after I get the GET_RECIPES_BY_NAME action, I want to 'map'. the data from that action into this new request I make, but WAIT until it gets back from the server*/

/*
        Observable.ajax(`${BASE_ENDPOINT}&q=${action.payload}`)
          .map(({ response }) => ({
            type: RECIPE_ACTIONS.RECIPES_RECEIVED_SUCCESS,
            payload: response.hits.map(hit => hit.recipe)
          }))
          .catch(error => Observable.of({
            type: RECIPE_ACTIONS.RECIPES_RECEIVED_ERROR,
            payload: error.xhr.response,
            error: true
          }))


      );
*/
