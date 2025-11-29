<!--Here will be the login code for the website-->
<script>
import Box from "../lib/components/Box.svelte";
</script>
<div class="w-full max-w-sm mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-md bg-white">
  <div class="text-center mb-6">
    <h1 class="text-2xl md:text-3xl font-bold">Login to your account</h1>
    <span class="text-gray-600 text-sm">
      Welcome back! select method to log in:
    </span>
  </div>
  <div>
    <form class="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        class="border-red-600 border-2 rounded-sm p-1 text-base focus:outline-none focus:ring-2 focus:ring-red-400"/>
      <input
        type="password"
        placeholder="password"
        class="border-red-600 border-2  rounded-sm p-1 text-base focus:outline-none focus:ring-2 focus:ring-red-400"/>
      <button class="text-white bg-red-500 rounded-sm font-medium text-lg p-2 mt-5">Log in</button>
    </form>
  </div>
</div>
