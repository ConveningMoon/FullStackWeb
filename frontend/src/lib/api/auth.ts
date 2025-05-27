export const loginUser = async (username: string, password: string): Promise<any> => {
    const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during login');
    }
  
    return data;
  };
  
  export const registerUser = async (
    email: string,
    username: string,
    password: string,
    password2: string
  ): Promise<any> => {
    const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, password2 }),
    });
  
    // Log the response for debugging
    const contentType = response.headers.get('Content-Type');
    const text = await response.text();
    console.log('RAW Response:', text);
  
    // Verify content type is JSON before parsing
    if (contentType && contentType.includes('application/json')) {
      try {
        const data = JSON.parse(text); // Parse JSON response
        if (!response.ok) {
          throw new Error(data.message || 'Registration error occurred.');
        }
        return data;
      } catch (error) {
        console.error('Error parsing JSON:', error, '\nRaw response:', text);
        throw new Error('Unexpected server response. Please try again later.');
      }
    } else {
      // Handle non-JSON response gracefully
      console.error('Unexpected content type:', contentType);
      throw new Error('Invalid server response format. Please contact support.');
    }
  };