import axios from 'axios';

const API_BASE = 'https://localhost:7000/api'; // Adjust for prod proxy

export interface UserSaveResponseDto {
  health: number;
  mana: number;
  timestamp: string; // ISO string
  sceneName: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export const fetchLatestSave = async (userId: string): Promise<UserSaveResponseDto> => {
  const response = await axios.get(`${API_BASE}/saves/latest/${userId}`);
  return response.data;
};