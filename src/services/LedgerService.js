import axios from 'axios';

const baseURL = 'http://localhost:3000'; // 백엔드 서버 URL

export async function getLedgerByDate(date) {
  try {
    const response = await axios.get(`${baseURL}/ledger?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ledger data:', error);
    throw error;
  }
}
