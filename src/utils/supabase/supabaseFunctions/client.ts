import { createClient } from '@/utils/supabase/client'

export const updateEntryStatus = async (newStatus: boolean) => {
    try {
        const supabase = createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("updateClientSideEntryStatus: ユーザーが認証されていません。", authError?.message);
            return { success: false, message: "認証されていません。" };
        }

        if (newStatus) {
            const { data, error } = await supabase
                .from('user')
                .update({ isEnter: true })
                .eq('id', user.id) // ログイン中のユーザーのSupabase UIDを使用
                .select();

            if (error) {
                console.error("updateClientSideEntryStatus: Supabase更新エラー:", error.message);
                return { success: false, message: `入室状態の更新に失敗しました: ${error.message}` };
            }

            if (data === null || (Array.isArray(data) && data.length === 0)) {
                console.warn("updateClientSideEntryStatus: レコードが見つからないか、権限がありません。");
                return { success: false, message: "ユーザー情報が見つからないか、更新する権限がありません。" };
            }

            console.log("updateClientSideEntryStatus: 入室状態を更新しました。", data);
            return { success: true, message: `入室状態を入室に更新しました。` };
        } else {
            const { data, error } = await supabase
                .from('user')
                .update({ isEnter: false })
                .eq('id', user.id)
                .select(); // ログイン中のユーザーのSupabase UIDを使用

            if (error) {
                console.error("updateClientSideEntryStatus: Supabase更新エラー:", error.message);
                return { success: false, message: `入室状態の更新に失敗しました: ${error.message}` };
            }

            if (data === null || (Array.isArray(data) && data.length === 0)) {
                console.warn("updateClientSideEntryStatus: レコードが見つからないか、権限がありません。");
                return { success: false, message: "ユーザー情報が見つからないか、更新する権限がありません。" };
            }

            console.log("updateClientSideEntryStatus: 入室状態を更新しました。", data);
            return { success: true, message: `入室状態を退室に更新しました。` };
        }
        
    } catch (e: unknown) {
        let errorMessage = "予期せぬエラーが発生しました。";
        if (e instanceof Error) {
        errorMessage = e.message;
        }
        console.error("updateClientSideEntryStatus: 予期せぬエラー:", errorMessage, e);
        return { success: false, message: `予期せぬエラーが発生しました: ${errorMessage}` };
    }
};