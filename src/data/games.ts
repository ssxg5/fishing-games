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
    thumbnail: '/games/deep-sea-fishing/images/thumbnail.jpg',
    url: '/games/deep-sea-fishing'
  },
  {
    id: 2,
    title: '河流探险',
    description: '在平静的河流中享受钓鱼的乐趣',
    thumbnail: '/games/river-fishing/images/thumbnail.jpg',
    url: '/games/river-fishing'
  },
  {
    id: 3,
    title: '冰上钓鱼',
    description: '体验刺激的冰上钓鱼运动',
    thumbnail: '/games/ice-fishing/images/thumbnail.jpg',
    url: '/games/ice-fishing'
  }
]; 