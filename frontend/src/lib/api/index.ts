const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic fetch function with error handling
async function fetchAPI(endpoint: string, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, mergedOptions);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

// Services endpoints
export async function getServices() {
  return fetchAPI('services');
}

export async function getServiceById(id: string) {
  return fetchAPI(`services/${id}`);
}

// Contact form submission
export async function submitContactForm(data: any) {
  return fetchAPI('contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
