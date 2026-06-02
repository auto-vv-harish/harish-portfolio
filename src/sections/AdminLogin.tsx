import { useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  onClose: () => void;
}

const AdminLogin = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.setItem("isAdmin", "true");
  onClose();
  window.location.reload();
  //alert("Login Successful");
};

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 p-3 rounded"
        >
          Login
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 border border-gray-500 p-3 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;