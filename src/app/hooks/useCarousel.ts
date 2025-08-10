import { useState, useEffect, useCallback } from 'react'
import { 
  getCarouselItems, 
  createCarouselItem, 
  updateCarouselItem, 
  deleteCarouselItem,
  reorderCarouselItems
} from '../../utils/supabase'
import { CarouselItem } from '../types/members'

export const useCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCarouselItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await getCarouselItems()
      setCarouselItems(items)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load carousel items'
      setError(errorMessage)
      console.error('Error loading carousel items:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addCarouselItem = useCallback(async (item: Omit<CarouselItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null)
      const newItem = await createCarouselItem(item)
      setCarouselItems(prev => [...prev, newItem])
      return newItem
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add carousel item'
      setError(errorMessage)
      console.error('Error adding carousel item:', err)
      throw err
    }
  }, [])

  const updateCarouselItemById = useCallback(async (id: string, updates: Partial<CarouselItem>) => {
    try {
      setError(null)
      const updatedItem = await updateCarouselItem(id, updates)
      setCarouselItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ))
      return updatedItem
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update carousel item'
      setError(errorMessage)
      console.error('Error updating carousel item:', err)
      throw err
    }
  }, [])

  const removeCarouselItem = useCallback(async (id: string) => {
    try {
      setError(null)
      await deleteCarouselItem(id)
      setCarouselItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove carousel item'
      setError(errorMessage)
      console.error('Error removing carousel item:', err)
      throw err
    }
  }, [])

  const reorderItems = useCallback(async (strip: number, newOrder: { id: string, order: number }[]) => {
    try {
      setError(null)
      await reorderCarouselItems(strip, newOrder)
      // Reload items to get the new order
      await loadCarouselItems()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reorder carousel items'
      setError(errorMessage)
      console.error('Error reordering carousel items:', err)
      throw err
    }
  }, [loadCarouselItems])

  // Get items by strip
  const getItemsByStrip = useCallback((strip: number) => {
    return carouselItems
      .filter(item => item.strip === strip)
      .sort((a, b) => a.order - b.order)
  }, [carouselItems])

  // Get all strips
  const getStrips = useCallback(() => {
    const strips = [1, 2, 3]
    return strips.map(strip => ({
      id: strip,
      items: getItemsByStrip(strip)
    }))
  }, [getItemsByStrip])

  useEffect(() => {
    loadCarouselItems()
  }, [loadCarouselItems])

  return {
    carouselItems,
    loading,
    error,
    loadCarouselItems,
    addCarouselItem,
    updateCarouselItemById,
    removeCarouselItem,
    reorderItems,
    getItemsByStrip,
    getStrips
  }
}
