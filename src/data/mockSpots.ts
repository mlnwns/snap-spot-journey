
import { PhotoSpot } from '@/types';

export const mockPhotoSpots: PhotoSpot[] = [
  {
    id: '1',
    name: '서울숲 메타세쿼이아길',
    description: '높은 메타세쿼이아 나무들이 만드는 자연스러운 터널길. 계절마다 다른 매력을 가진 감성 포토스팟.',
    address: '서울 성동구 뚝섬로 273',
    coordinates: { lat: 37.5447, lng: 127.0375 },
    category: 'nature',
    themes: ['couple', 'solo', 'nature'],
    rating: 4.6,
    reviewCount: 324,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    crowdLevel: 'medium',
    bestTime: ['오전 9-11시', '오후 4-6시'],
    amenities: ['화장실', '주차장', '카페'],
    tags: ['자연광', '터널샷', '걷기좋음'],
    tips: ['평일 오전이 가장 한적해요', '가을 단풍 시즌이 최고', '운동화 추천']
  },
  {
    id: '2',
    name: '북촌한옥마을 계단길',
    description: '전통 한옥과 서울 시내가 한눈에 보이는 포토스팟. 한국의 전통미와 현대가 조화를 이루는 곳.',
    address: '서울 종로구 북촌로5길 일대',
    coordinates: { lat: 37.5816, lng: 126.9837 },
    category: 'historical',
    themes: ['couple', 'solo', 'vintage'],
    rating: 4.4,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop'
    ],
    crowdLevel: 'high',
    bestTime: ['오전 8-10시', '오후 5-7시'],
    amenities: ['화장실', '전통찻집', '기념품샵'],
    tags: ['한복추천', '전통미', '야경'],
    tips: ['주말은 매우 혼잡해요', '한복 대여점 많음', '계단이 가파름']
  },
  {
    id: '3',
    name: '홍대 걷고싶은거리',
    description: '젊음의 거리 홍대의 상징적인 포토스팟. 다양한 벽화와 네온사인이 매력적인 야간 촬영지.',
    address: '서울 마포구 와우산로 일대',
    coordinates: { lat: 37.5563, lng: 126.9239 },
    category: 'urban',
    themes: ['friends', 'content', 'urban'],
    rating: 4.2,
    reviewCount: 1203,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551340998-8444c1c5d2ac?w=800&h=600&fit=crop'
    ],
    crowdLevel: 'high',
    bestTime: ['오후 7-10시', '오후 2-4시'],
    amenities: ['지하철역', '카페', '음식점', '편의점'],
    tags: ['야경', '네온사인', '벽화'],
    tips: ['저녁 시간 네온사인이 예뻐요', '주말 밤은 매우 붐벼요', '다양한 컨셉 촬영 가능']
  },
  {
    id: '4',
    name: '반포한강공원 노을명소',
    description: '한강을 배경으로 한 서울의 대표적인 노을 감상 및 촬영 명소. 특히 일몰 시간대의 실루엣 사진이 인기.',
    address: '서울 서초구 신반포로11길 40',
    coordinates: { lat: 37.5172, lng: 126.9969 },
    category: 'nature',
    themes: ['couple', 'solo', 'nature'],
    rating: 4.7,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop'
    ],
    crowdLevel: 'medium',
    bestTime: ['오후 6-8시 (일몰)', '오전 7-9시 (일출)'],
    amenities: ['자전거대여', '편의점', '화장실', '주차장'],
    tags: ['노을', '실루엣', '한강뷰'],
    tips: ['일몰 1시간 전 도착 추천', '돗자리 지참하면 좋아요', '미세먼지 없는 날 최고']
  },
  {
    id: '5',
    name: '성수동 카페거리',
    description: '트렌디한 카페들이 모여있는 성수동의 핫플레이스. 각각 다른 컨셉의 카페에서 다양한 분위기 연출 가능.',
    address: '서울 성동구 연무장길 일대',
    coordinates: { lat: 37.5442, lng: 127.0557 },
    category: 'cafe',
    themes: ['couple', 'friends', 'minimal'],
    rating: 4.5,
    reviewCount: 789,
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop'
    ],
    crowdLevel: 'medium',
    bestTime: ['오전 10-12시', '오후 2-4시'],
    amenities: ['지하철역', '주차장', '다양한카페'],
    tags: ['미니멀', '브런치', '인테리어'],
    tips: ['각 카페마다 특색이 달라요', '브런치 메뉴 맛집 많음', '주말 오후는 웨이팅 있음']
  }
];
