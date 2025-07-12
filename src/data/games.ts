import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 'deep-sea-fishing',
    title: '深海钓鱼',
    description: '探索深海世界，钓取稀有鱼类，体验深海钓鱼的乐趣！',
    imageUrl: '/images/games/deep-sea-fishing.jpg',
    gameUrl: 'https://www.crazygames.com/embed-iframe/real-fishing-simulator',
    tags: ['钓鱼', '休闲', '探索'],
    config: {
      aspectRatio: '16/9',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups'
    },
    seoTitle: '深海钓鱼 - 探索深海世界的钓鱼游戏',
    seoDescription: '在深海世界中探索和钓取稀有鱼类，体验刺激的深海钓鱼冒险！',
    keywords: ['深海钓鱼', '钓鱼游戏', '探索游戏', '休闲游戏'],
    thumbnail: '/images/games/deep-sea-fishing.jpg',
    adPositions: {
      top: true,
      beforeGame: false,
      afterGame: true,
      bottom: true
    }
  },
  {
    id: 'river-fishing',
    title: '河流探险',
    description: '在平静的河流中享受钓鱼的乐趣，收集各种淡水鱼类！',
    imageUrl: '/images/games/river-fishing.jpg',
    gameUrl: 'https://www.crazygames.com/embed-iframe/fishing-frenzy',
    tags: ['钓鱼', '休闲', '冒险'],
    config: {
      aspectRatio: '16/9',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups'
    },
    seoTitle: '河流探险 - 悠闲的河钓游戏',
    seoDescription: '在宁静的河流中体验钓鱼的乐趣，收集各种淡水鱼类，享受轻松的钓鱼时光！',
    keywords: ['河流钓鱼', '钓鱼游戏', '休闲游戏', '冒险游戏'],
    thumbnail: '/images/games/river-fishing.jpg',
    adPositions: {
      top: true,
      beforeGame: false,
      afterGame: true,
      bottom: true
    }
  },
  {
    id: 'ice-fishing',
    title: '冰上钓鱼',
    description: '体验刺激的冰上钓鱼运动，挑战极地环境下的钓鱼技巧！',
    imageUrl: '/images/games/ice-fishing.jpg',
    gameUrl: 'https://www.crazygames.com/embed-iframe/ice-fishing-io',
    tags: ['钓鱼', '休闲', '极限'],
    config: {
      aspectRatio: '16/9',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups'
    },
    seoTitle: '冰上钓鱼 - 极地钓鱼挑战',
    seoDescription: '在极地冰面上体验刺激的钓鱼运动，挑战极限环境下的钓鱼技巧！',
    keywords: ['冰上钓鱼', '极限运动', '钓鱼游戏', '休闲游戏'],
    thumbnail: '/images/games/ice-fishing.jpg',
    adPositions: {
      top: true,
      beforeGame: false,
      afterGame: true,
      bottom: true
    }
  }
]; 