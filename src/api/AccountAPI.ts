import api from './baseAPI';

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

export const login = async ({ username, password } : {username : string, password : string }) =>{
    const hashedPassword = await hashPassword(password);
    return api({
      method: 'POST',
      url: '/connect/token',
      headers: { 'Content-Type': 'application/json' },
      data: {
          username: username,
          password: hashedPassword,
      },
    }).then(({ data }) => data);
}
    