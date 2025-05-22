import { createClient } from '@/utils/supabase/server'

const supabase = await createClient()

export const getEnterUsers = async () => {
    const users = await supabase
        .from("user")
        .select("name")
        .eq("isEnter", true)

    return users.data;
};

