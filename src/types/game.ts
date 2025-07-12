export interface GameConfig {
  aspectRatio: string;
  allowFullscreen: boolean;
  sandbox?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  tags: string[];
  config: GameConfig;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  thumbnail?: string;
  adPositions?: {
    top?: boolean;
    beforeGame?: boolean;
    afterGame?: boolean;
    bottom?: boolean;
  };
} 