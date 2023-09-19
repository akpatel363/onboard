import { makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import LoaderButton from "../../components/LoaderButton";
import { useChangePassword } from "./ChangePassword.hooks";

const schema = Yup.object({
  oldPassword: Yup.string()
    .required("Please enter your old password")
    .min(8, "Password should contain at least 8 characters"),
  newPassword: Yup.string()
    .required("Please enter your new password")
    .min(8, "Password should contain at least 8 characters"),
  repeat: Yup.string()
    .required("Please enter your new password")
    .min(8, "Password should contain at least 8 characters")
    .oneOf(
      [Yup.ref("newPassword")],
      "New password and confirmation password do not match"
    ),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64,
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    fontFamily: "'Satisfy', cursive",
    marginBottom: theme.spacing(3),
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const { isLoading, mutate } = useChangePassword();
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ oldPassword: "", newPassword: "", repeat: "" }}
      onSubmit={({ oldPassword, newPassword }) =>
        mutate({ oldPassword, newPassword })
      }
    >
      <Form className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Change Password
        </Typography>
        <Input type="password" name="oldPassword" label="Old Password" />
        <Input type="password" name="newPassword" label="New Password" />
        <Input type="password" name="repeat" label="Confirm New Password" />
        <LoaderButton
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          Change Password
        </LoaderButton>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
