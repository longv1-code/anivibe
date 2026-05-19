import supabase from '../supabase'

export const addFavorite = async (userId, animeData) => {
    const { error } = await supabase
        .from('favorites')
        .insert({
            user_id: userId,
            ...animeData
        })
    if (error) throw new Error(error.message)
}

export const removeFavorite = async (userId, malUrl) => {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('mal_url', malUrl)
    if (error) throw new Error(error.message)
}

export const getFavorites = async (userId) => {
    const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
    if (error) return null
    return data
}