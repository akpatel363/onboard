import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const Anchor = ({ to, children }) => (
  <Link component={RouterLink} to={to}>
    {children}
  </Link>
);

export default Anchor;
