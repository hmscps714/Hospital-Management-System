import React from "react";
import styles from "./Login.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { signInPatient } from "src/api/auth";

export const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async ({ email, password }) => {
    const hasLoggedIn = await signInPatient({ email, password });
    if (hasLoggedIn) window.location.href = "/about";
  };

  return (
    <div className={styles.Login}>
      <div className={styles.LoginBox}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  fullWidth
                  margin="normal"
                  autoComplete="email"
                  autoFocus
                  helperText={error ? error.message : null}
                  type="email"
                />
              )}
              rules={{ required: "Email required" }}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Password"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  fullWidth
                  margin="normal"
                  autoComplete="email"
                  autoFocus
                  helperText={error ? error.message : null}
                  type="password"
                />
              )}
              rules={{ required: "Password required" }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Login;
