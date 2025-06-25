import { createClient } from '@/utils/supabase/server'

export const getEnterUsers = async () => {
    const supabase = await createClient()

    const users = await supabase
        .from("user")
        .select("name")
        .eq("isEnter", true)

    return users.data;
};

export const getEntryStatus = async () => {
    const supabase = await createClient()

    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error("ユーザー情報の取得エラー:", error.message);
            return null;
        }
        if (!user) {
            console.error("ユーザー情報の取得エラー:");
            return null;
        }

        const { data: userData, error: getIsEnterError } = await supabase
        .from('user')
        .select("isEnter")
        .eq('id', user.id)
        .single();

        if (getIsEnterError) {
            console.error("isEnter値の取得エラー:", getIsEnterError.message);
            return null;
        }
        if (!userData) {
            console.error("isEnter値の取得エラー:");
            return null;
        }

        return userData.isEnter

    } catch {
        console.error("getClientSideUserId: 予期せぬエラー:");
        return null;
    }

}



