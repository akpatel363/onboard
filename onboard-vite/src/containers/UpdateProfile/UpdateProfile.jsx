import { useSelector } from "react-redux";
import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import LoaderButton from "../../components/LoaderButton";
import ProfileSvg from "../../static/profile.svg";

import { useUpdateProfile } from "./UpdateProfile.hooks";

const schema = Yup.object({
  name: Yup.string(),
  email: Yup.string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
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
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userImg: {
    width: "65%",
    display: "block",
    boxSizing: "border-box",
    margin: theme.spacing(2, 0),
  },
}));

const UpdateProfile = () => {
  const classes = useStyles();
  const profile = useSelector((s) => s?.common?.profile);
  const { isLoading, mutate } = useUpdateProfile();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={6} className={classes.grid}>
        <img alt="User" className={classes.userImg} src={ProfileSvg} />
      </Grid>
      <Grid item xs={12} md={6} className={classes.grid}>
        <Formik
          validationSchema={schema}
          onSubmit={(payload) => mutate(payload)}
          initialValues={{ name: profile?.name || "", email: profile?.email }}
        >
          <Form>
            <Typography variant="h4" className={classes.title}>
              {profile?.name?.split(" ")?.[0] || profile?.username}'s Profile
            </Typography>
            <TextField
              disabled
              fullWidth
              label="Username"
              variant="outlined"
              value={profile?.username}
            />
            <Input name="name" label="Name" />
            <Input type="email" name="email" label="Email" />
            <LoaderButton
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
            >
              Update Profile
            </LoaderButton>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default UpdateProfile;
