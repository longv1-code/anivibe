import supabase from '../supabase'

export const createProfile = async (userId, profileData) => {
    const { error } = await supabase
        .from('profiles')
        .insert({
            id: userId,
            ...profileData
        })
    if (error) throw new Error(error.message)
}

export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    if (error) return null
    return data
}