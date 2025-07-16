import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "./components/auth/AuthWrapper";

export default function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}
