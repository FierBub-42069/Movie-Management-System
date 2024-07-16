export const AuthService = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

// Login
function login(user) {
	const { id, email, role } = user;
	const userInfo = { id, email, role };
	localStorage.setItem('user', JSON.stringify(userInfo));
}

// Logout
function logout() {
	localStorage.removeItem('user');
}

// Get current user from local storage
function getCurrentUser() {
	return JSON.parse(localStorage.getItem('user'));
}

// Check for authentication
function isAuthenticated() {
	return !!localStorage.getItem('user');
}