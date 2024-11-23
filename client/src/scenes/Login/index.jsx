import React, { useState } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { Header } from "components";
import { useLoginMutation } from "state/api";
const Login = () => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await login({ username, password }).unwrap();
      alert("Login successful!"); // You can replace this with redirection or state update
      console.log("Response:", response); // For debugging
    } catch (error) {
      alert("Invalid username or password!");
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      m="2rem"
      p="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Header
        title="LOGIN"
        subtitle="Use USERNAME: USERNEW & PASSWORD: 11223344"
      />
      <Typography variant="h4" mb="1rem" color={theme.palette.secondary[100]}>
        for test user.
      </Typography>

      {/* Username Input */}
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        placeholder="e.g., usernew"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: "1rem" }}
      />

      {/* Password Input */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        placeholder="e.g., 11223344"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: "1rem" }}
      />

      {/* Login Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={isLoading}
        sx={{
          padding: "0.75rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary[100],
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default Login;
