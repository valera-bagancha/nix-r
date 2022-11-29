import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/todos/types";

export const useAppDispatch: () => AppDispatch = useDispatch;