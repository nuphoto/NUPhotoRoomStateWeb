'use server'

import { createClient } from '@/utils/supabase/server'
import type { LoginFormData } from '@/components/others/LoginForm'
import { hashSHA256 } from '@/utils/others/hash'

export async function login(formData: LoginFormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const hashedStudentId = await hashSHA256(formData.studentId)
    const email: string = hashedStudentId + "@nuphoto.com"

    const data = {
        email: email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    
    if (error) {
        return true
    }
    
    return false
}