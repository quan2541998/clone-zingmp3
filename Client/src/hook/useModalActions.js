import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  modalChangeThemesAction,
  modalAuthAction,
} from "../store/actions/modal";

const useModalActions = () => {
  const { isVisbleChangeTheme, isVisbleAuth } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const handleModalThemes = () => {
    dispatch(modalChangeThemesAction(!isVisbleChangeTheme));
  };

  const handleModalAuth = () => {
    dispatch(modalAuthAction(!isVisbleAuth));
  };

  return {
    handleModalThemes,
    handleModalAuth,
  };
};
export default useModalActions;
