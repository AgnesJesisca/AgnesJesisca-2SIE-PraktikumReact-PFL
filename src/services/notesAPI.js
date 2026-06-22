import { supabase } from '@/lib/supabase'

export const notesAPI = {
    async fetchNotes() {
        const { data, error } = await supabase
            .from('note')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async createNote(data) {
        const { data: result, error } = await supabase
            .from('note')
            .insert([data])
            .select()

        if (error) throw error
        return result
    },

    async deleteNote(id) {
        const { error } = await supabase
            .from('note')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
