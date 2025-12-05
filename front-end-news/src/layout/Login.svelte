<script>
import Box from "../lib/components/Box.svelte";
let email = "";
let password = "";

const handleLogin = async (event) => {
  event.preventDefault();
  const payload = { email, password };
  try {
    const response = await fetch("/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log("data", data);

    if (data.success) {
      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      if (data.usuario.rol === "admin") {
        window.location.href = "/users/admin/";
      } else if (data.usuario.rol === "journalist") {
        window.location.href = "/users/journalist/";
      } else {
        window.location.href = "/";
      }
    } else {
      console.log("Login failed:", data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
</script>

<div class="w-full max-w-sm mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-md bg-white">
  <div class="text-center mb-6">
    <h1 class="text-2xl md:text-3xl font-bold">Login to your account</h1>
    <span class="text-gray-600 text-sm">
      Welcome back! select method to log in:
    </span>
  </div>
  <div>
    <form on:submit={handleLogin} class="flex flex-col gap-3">
      <input
        type="email"
        bind:value={email}
        placeholder="Email"
        class="border-red-600 border-2 rounded-sm p-1 text-base focus:outline-none focus:ring-2 focus:ring-red-400"/>
      <input
        type="password" bind:value={password}
        placeholder="password"
        class="border-red-600 border-2  rounded-sm p-1 text-base focus:outline-none focus:ring-2 focus:ring-red-400"/>
      <button type="submit" class="text-white bg-red-500 rounded-sm font-medium text-lg p-2 mt-5">Log in</button>
    </form>
  </div>
</div>
