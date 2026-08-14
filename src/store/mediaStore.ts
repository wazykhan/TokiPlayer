import {create} from 'zustand';
import {MediaItem, Category} from '../types';

interface MediaStore {
  mediaItems: MediaItem[];
  categories: Category[];
  currentIndex: number;
  addMediaItem: (item: MediaItem) => void;
  removeMediaItem: (id: string) => void;
  addCategory: (category: Category) => void;
  addToCategory: (mediaId: string, categoryId: string) => void;
  removeFromCategory: (mediaId: string, categoryId: string) => void;
  setCurrentIndex: (index: number) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  mediaItems: [],
  categories: [
    {id: '1', name: 'Favorites', color: '#FF6B6B'},
    {id: '2', name: 'Later', color: '#4ECDC4'},
    {id: '3', name: 'Music', color: '#95E1D3'},
    {id: '4', name: 'Comedy', color: '#FFA07A'},
  ],
  currentIndex: 0,

  addMediaItem: (item) =>
    set((state) => ({
      mediaItems: [...state.mediaItems, item],
    })),

  removeMediaItem: (id) =>
    set((state) => ({
      mediaItems: state.mediaItems.filter((item) => item.id !== id),
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  addToCategory: (mediaId, categoryId) =>
    set((state) => ({
      mediaItems: state.mediaItems.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              categories: [...new Set([...item.categories, categoryId])],
            }
          : item,
      ),
    })),

  removeFromCategory: (mediaId, categoryId) =>
    set((state) => ({
      mediaItems: state.mediaItems.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              categories: item.categories.filter((id) => id !== categoryId),
            }
          : item,
      ),
    })),

  setCurrentIndex: (index) =>
    set(() => ({
      currentIndex: index,
    })),
}));
