import * as mutations from "../mutations";

export default (groups = [], action) => {
  switch (action.type) {
    case mutations.SET_STATE:
      return action.state.groups;
    default:
      return groups;
  }
};
