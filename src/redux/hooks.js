import { useDispatch, useSelector } from "react-redux";

// Custom hook to get the dispatch function with inferred types
export const useAppDispatch = () => useDispatch();

// Custom hook to get the selected state with inferred types
export const useAppSelector = (selectorFunction) =>
  useSelector(selectorFunction);
