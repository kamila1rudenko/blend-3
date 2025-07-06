import style from "./Loader.module.css";
import { HashLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <HashLoader color="#23a14f" size={120} />
    </div>
  );
}
