import { createStore, combineReducers, applyMiddleware } from "redux";
import { Campsites } from "./Campsites";
import { Comments } from "./Comments";
import { Partners } from "./Partners";
import { Promotions } from "./Promotions";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback } from "./Forms";
import { createForms } from "react-redux-form";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions,
      ...createForms({
        feedbackForm: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
