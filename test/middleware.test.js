// Import the middleware functions from the 'authenticate' module
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authenticate');

// Start a test suite for the authentication middleware
describe('Authentication Middleware', () => {
  // Start a test block for the 'checkAuthenticated' middleware
  describe('checkAuthenticated', () => {
    // Test case: should call next() if user is authenticated
    it('should call next() if user is authenticated', () => {
      // Mock the request object with a function 'isAuthenticated' that returns true
      const req = {
        isAuthenticated: jest.fn().mockReturnValue(true)
      };
      // Create an empty response object
      const res = {};
      // Create a mock 'next' function
      const next = jest.fn();

      // Call the 'checkAuthenticated' middleware with the mocked objects
      checkAuthenticated(req, res, next);

      // Assert that the 'isAuthenticated' function was called
      expect(req.isAuthenticated).toHaveBeenCalled();
      // Assert that the 'next' function was called
      expect(next).toHaveBeenCalled();
    });

    // Test case: should redirect to signin if user is not authenticated
    it('should redirect to signin if user is not authenticated', () => {
      // Mock the request object with a function 'isAuthenticated' that returns false
      const req = {
        isAuthenticated: jest.fn().mockReturnValue(false)
      };
      // Mock the response object with a 'redirect' function
      const res = {
        redirect: jest.fn()
      };
      // Create a mock 'next' function
      const next = jest.fn();

      // Call the 'checkAuthenticated' middleware with the mocked objects
      checkAuthenticated(req, res, next);

      // Assert that the 'isAuthenticated' function was called
      expect(req.isAuthenticated).toHaveBeenCalled();
      // Assert that the 'redirect' function was called with the '/signin' route
      expect(res.redirect).toHaveBeenCalledWith('/signin');
      // Assert that the 'next' function was not called
      expect(next).not.toHaveBeenCalled();
    });
  });

  // Start a test block for the 'checkNotAuthenticated' middleware
  describe('checkNotAuthenticated', () => {
    // Test case: should redirect to appointments if user is authenticated
    it('should redirect to appointments if user is authenticated', () => {
      // Mock the request object with a function 'isAuthenticated' that returns true
      const req = {
        isAuthenticated: jest.fn().mockReturnValue(true)
      };
      // Mock the response object with a 'redirect' function
      const res = {
        redirect: jest.fn()
      };
      // Create a mock 'next' function
      const next = jest.fn();

      // Call the 'checkNotAuthenticated' middleware with the mocked objects
      checkNotAuthenticated(req, res, next);

      // Assert that the 'isAuthenticated' function was called
      expect(req.isAuthenticated).toHaveBeenCalled();
      // Assert that the 'redirect' function was called with the '/appointments' route
      expect(res.redirect).toHaveBeenCalledWith('/appointments');
      // Assert that the 'next' function was not called
      expect(next).not.toHaveBeenCalled();
    });

    // Test case: should call next() if user is not authenticated
    it('should call next() if user is not authenticated', () => {
      // Mock the request object with a function 'isAuthenticated' that returns false
      const req = {
        isAuthenticated: jest.fn().mockReturnValue(false)
      };
      // Create an empty response object
      const res = {};
      // Create a mock 'next' function
      const next = jest.fn();

      // Call the 'checkNotAuthenticated' middleware with the mocked objects
      checkNotAuthenticated(req, res, next);

      // Assert that the 'isAuthenticated' function was called
      expect(req.isAuthenticated).toHaveBeenCalled();
      // Assert that the 'next' function was called
      expect(next).toHaveBeenCalled();
    });
  });
});
