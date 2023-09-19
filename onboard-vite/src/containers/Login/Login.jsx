import { Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { LockOpen, PersonAdd, Person } from "@material-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import LoaderButton from "../../components/LoaderButton";

import { useLogin } from "./Login.hooks";

const validationSchema = Yup.object({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string()
    .required("Please enter you password")
    .min(8, "Please enter at least 8 characters"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    textAlign: "center",
    margin: theme.spacing(4, "auto"),
    "& .MuiTextField-root": { margin: theme.spacing(1, 0, 2) },
    "& .MuiButton-root": { margin: theme.spacing(1, 0, 1) },
    "& > .MuiSvgIcon-root": {
      color: "white",
      fontSize: "4rem",
      borderRadius: "50%",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      background: theme.palette.primary.main,
    },
    "& h4": {
      marginBottom: theme.spacing(2),
      "& span": { fontFamily: "'Satisfy', cursive" },
    },
  },
}));

const Login = () => {
  const { mutate, isLoading } = useLogin();
  const classes = useStyles();
  return (
    <Formik
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => mutate(values)}
    >
      <Form className={classes.root}>
        <Person />
        <Typography variant="h4">
          Login to <span>OnBoard</span>
        </Typography>
        <Input required name="username" label="Username" />
        <Input required type="password" name="password" label="Password" />
        <LoaderButton
          fullWidth
          size="large"
          type="submit"
          color="secondary"
          variant="contained"
          disabled={isLoading}
          startIcon={<LockOpen />}
        >
          Login
        </LoaderButton>
        <Button
          fullWidth
          to="/register"
          color="default"
          startIcon={<PersonAdd />}
          component={Link}
          variant="outlined"
        >
          Don't have an account
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
