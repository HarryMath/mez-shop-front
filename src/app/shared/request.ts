export const endpoint = 'https://mez-api.herokuapp.com';
// export const endpoint = 'http://localhost';

export async function simpleRequest(url: string, method = 'GET', data: any = null): Promise<any> {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    let body;
    if (data) {
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method, headers, body, // mode: 'no-cors'
    });
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  } catch (e) {
    console.warn(e);
    return null;
  }
}
