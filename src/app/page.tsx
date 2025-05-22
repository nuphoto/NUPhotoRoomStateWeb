import { getEnterUsers } from "@/utils/supabase/supabaseFunctions/server";

export default async function Home() {
  const users = await getEnterUsers()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-xl text-green-500">
        {`現在部室に${users?.length ?? 0}人います`}
      </p>
    </div>
  );
}
