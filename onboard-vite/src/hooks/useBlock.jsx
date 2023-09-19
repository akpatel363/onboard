import { useSelector } from "react-redux";

const equality = (newVal, oldVal) => {
  if (!newVal || !oldVal) return false;
  if (Object.keys(newVal).length !== Object.keys(oldVal).length) return false;
  return Object.keys(newVal).every((key) => newVal[key] === oldVal[key]);
};

const useBlock = (_id) => {
  const active = useSelector((s) => s?.page?.active === _id);
  const block = useSelector((s) => s?.page?.blocks?.[_id], equality);
  return { active, block };
};

export default useBlock;
