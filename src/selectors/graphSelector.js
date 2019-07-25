import { createSelector } from "reselect";

export const dataSelector = state => state.data;

export const maxValueSelector = createSelector(
  dataSelector,
  data => Math.max(...data.female, ...data.male)
);
