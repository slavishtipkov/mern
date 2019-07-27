import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { defaultState } from "../../server/defaultState";
import { taskCreationSaga } from "./sagas.mock.js";
import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskId,
              name: "New Task",
              group: action.groupId,
              owner: action.ownerId,
              isComplete: false
            }
          ];
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

sagaMiddleware.run(taskCreationSaga);
