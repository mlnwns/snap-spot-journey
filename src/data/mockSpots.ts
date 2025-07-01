
import { PhotoSpot } from '@/types';

export const mockPhotoSpots: PhotoSpot[] = [
  {
    id: '1',
    name: '북촌한옥마을 감성 골목',
    description: '전통 한옥과 현대가 어우러진 서울의 대표 포토스팟. 골목길 곳곳이 인스타그램 감성 넘치는 사진 배경이 됩니다.',
    address: '서울특별시 종로구 계동길 37',
    coordinates: {
      lat: 37.5814,
      lng: 126.9830
    },
    category: 'historical',
    themes: ['couple', 'vintage', 'content'],
    rating: 4.7,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['오전 9-11시', '오후 5-7시'],
    amenities: ['카페', '화장실', '주차장'],
    tags: ['한옥', '전통', '골목길'],
    tips: ['오전 일찍 가면 사람이 적어요', '한복 대여점이 근처에 많아요']
  },
  {
    id: '2',
    name: '이화여대 벽화마을',
    description: '알록달록한 벽화와 계단이 어우러진 감성 포토존. 드라마 촬영지로도 유명한 아기자기한 마을입니다.',
    address: '서울특별시 종로구 이화동 이화동1가 70-14',
    coordinates: {
      lat: 37.5803,
      lng: 126.9847
    },
    category: 'urban',
    themes: ['friends', 'content', 'vintage'],
    rating: 4.5,
    reviewCount: 673,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    crowdLevel: 'medium',
    bestTime: ['오후 2-5시', '저녁 6-8시'],
    amenities: ['카페', '화장실'],
    tags: ['벽화', '계단', '마을'],
    tips: ['계단이 많으니 편한 신발 추천', '저녁에 가면 조명이 예뻐요']
  },
  {
    id: '3',
    name: '서울숲 메타세쿼이아길',
    description: '높은 메타세쿼이아 나무들이 만드는 초록 터널. 자연광이 아름답게 스며드는 힐링 포토스팟입니다.',
    address: '서울특별시 성동구 뚝섬로 273 서울숲공원',
    coordinates: {
      lat: 37.5445,
      lng: 127.0374
    },
    category: 'nature',
    themes: ['solo', 'couple', 'nature'],
    rating: 4.8,
    reviewCount: 1204,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    ],
    crowdLevel: 'low',
    bestTime: ['오전 10-12시', '오후 4-6시'],
    amenities: ['화장실', '매점', '쉼터'],
    tags: ['숲', '나무', '산책'],
    tips: ['봄, 가을이 가장 예뻐요', '강아지 산책하는 분들이 많아요']
  },
  {
    id: '4',
    name: '홍대 걷고싶은거리',
    description: '젊음의 거리 홍대의 핫플레이스. 다양한 스트리트 아트와 네온사인이 만드는 도시적 감성.',
    address: '서울특별시 마포구 와우산로 홍대 걷고싶은거리',
    coordinates: {
      lat: 37.5519,
      lng: 126.9222
    },
    category: 'urban',
    themes: ['friends', 'content', 'urban'],
    rating: 4.3,
    reviewCount: 456,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['저녁 7-10시', '밤 10-12시'],
    amenities: ['카페', '화장실', '편의점'],
    tags: ['스트리트', '네온', '클럽'],
    tips: ['저녁에 가면 네온사인이 예뻐요', '주말에는 사람이 너무 많아요']
  },
  {
    id: '5',
    name: '경의선숲길 연남동구간',
    description: '기찬철로 위에 조성된 선형공원. 연남동 감성 카페들과 어우러진 힙한 산책로입니다.',
    address: '서울특별시 마포구 연남동 경의선숲길',
    coordinates: {
      lat: 37.5676,
      lng: 126.9252
    },
    category: 'nature',
    themes: ['couple', 'solo', 'minimal'],
    rating: 4.6,
    reviewCount: 789,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    ],
    crowdLevel: 'medium',
    bestTime: ['오후 3-6시', '저녁 7-9시'],
    amenities: ['카페', '벤치', '화장실'],
    tags: ['공원', '산책로', '감성'],
    tips: ['연남동 카페들과 함께 둘러보세요', '벚꽃 시즌이 가장 예뻐요']
  },
  {
    id: '6',
    name: '남산서울타워 전망대',
    description: '서울 야경을 한눈에 볼 수 있는 랜드마크. 커플들의 성지이자 서울 대표 뷰포인트입니다.',
    address: '서울특별시 용산구 남산공원길 105',
    coordinates: {
      lat: 37.5512,
      lng: 126.9882
    },
    category: 'modern',
    themes: ['couple', 'content', 'urban'],
    rating: 4.4,
    reviewCount: 2341,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['일몰 시간', '밤 8-10시'],
    amenities: ['전망대', '화장실', '카페', '기념품점'],
    tags: ['야경', '전망', '타워'],
    tips: ['일몰 시간에 가면 최고예요', '미리 예약하는 것을 추천해요']
  }
];
