const mockFetch = jest.fn().mockImplementation((url) => {
    const baseUrl = 'http://localhost:3000';
    const absoluteUrl = `${baseUrl}${url}`;
    return Promise.resolve({
      json: () => Promise.resolve({
        data: 'Mock fetch response'
      })
    });
  });
  
  module.exports = mockFetch;