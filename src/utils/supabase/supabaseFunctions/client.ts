import { createClient } from '@/utils/supabase/client'

export const removeMember = async (id: string) => {
    const supabase = createClient();

    await supabase.from("room").delete().eq("id", id);
}

export const EnterMember = async (id: string) => {
    const supabase = createClient();

    const { data } = await supabase.from("user").select("id, name, cardId").eq("id", id).single();
    if (data) {
        await supabase.from("room").insert({ id: data.id, name: data.name, cardId: data.cardId });
    }
}