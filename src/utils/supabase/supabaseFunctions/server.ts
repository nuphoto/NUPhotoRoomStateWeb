import { createClient } from '@/utils/supabase/server'

export const getEnterUsers = async () => {
    const supabase = await createClient()

    const users = await supabase
        .from("user")
        .select("name")
        .eq("isEnter", true)

    return users.data;
};

