export interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

export const games: Game[] = [
  {
    id: 1,
    title: '深海钓鱼',
    description: '探索深海世界，钓取稀有鱼类',
    thumbnail: '/images/deep-sea-fishing.jpg',
    url: 'https://example.com/deep-sea-fishing'
  },
  {
    id: 2,
    title: '河流探险',
    description: '在平静的河流中享受钓鱼的乐趣',
    thumbnail: '/images/river-fishing.jpg',
    url: 'https://example.com/river-fishing'
  },
  {
    id: 3,
    title: '冰上钓鱼',
    description: '体验刺激的冰上钓鱼运动',
    thumbnail: '/images/ice-fishing.jpg',
    url: 'https://example.com/ice-fishing'
  }
]; 