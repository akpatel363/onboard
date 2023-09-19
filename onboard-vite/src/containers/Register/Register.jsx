import { Button, makeStyles, Typography } from "@material-ui/core";
import { Lock, PersonAdd } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "../../components/Input";
import LoaderButton from "../../components/LoaderButton";

import useRegister from "./Register.hooks";

const validationSchema = Yup.object({
  name: Yup.string(),
  username: Yup.string().required("Please enter your username"),
  email: Yup.string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Please enter your password")
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
      fontSize: "3rem",
      borderRadius: "50%",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      background: theme.palette.primary.main,
    },
    "& h4": {
      marginBottom: theme.spacing(2),
      "& span": { fontFamily: "'Satisfy', cursive" },
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const { isLoading, mutate } = useRegister();
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => mutate(values)}
      initialValues={{ name: "", email: "", password: "", username: "" }}
    >
      <Form className={classes.root}>
        <PersonAdd />
        <Typography variant="h4">
          Join <span>OnBoard</span>
        </Typography>
        <Input name="name" label="Name" />
        <Input required name="username" label="Username" />
        <Input required type="email" name="email" label="E-Mail" />
        <Input required type="password" name="password" label="Password" />
        <LoaderButton
          fullWidth
          size="large"
          type="submit"
          color="secondary"
          variant="contained"
          disabled={isLoading}
          startIcon={<PersonAdd />}
        >
          Register
        </LoaderButton>
        <Button
          fullWidth
          to="/login"
          color="default"
          startIcon={<Lock />}
          component={Link}
          variant="outlined"
        >
          Already have an account?
        </Button>
      </Form>
    </Formik>
  );
};

export default Register;
