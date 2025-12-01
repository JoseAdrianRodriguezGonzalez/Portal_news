<form class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
  <div class="flex space-x-4 items-end">
    <div class="grow">
      <label for="uname" class="block text-sm font-medium text-gray-700 mb-2">
        Choose a username:
      </label>
      <input
        type="text"
        id="uname"
        name="name"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
    <div class="grow">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
    <div class="grow">
      <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
        Role:
      </label>
      <input
        type="text"
        id="role"
        name="role"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
    <div class="grow">
      <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
        New Password:
      </label>
      <input
        type="text"
        id="password"
        name="password"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
    <div class="shrink-0">
      <button type="submit" class="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition">
        Submit
      </button>
    </div>
  </div>
</form>
