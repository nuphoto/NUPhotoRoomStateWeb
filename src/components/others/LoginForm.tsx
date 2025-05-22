"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from 'react'

const formSchema = z.object({
    studentId: z.string().min(4, { message: "学生番号は4文字以上で入力してください。" }).max(20, { message: "学生番号は20文字以下で入力してください。" }),
    password: z.string().min(8, { message: "パスワードは8文字以上で入力してください。" }).max(20, { message: "パスワードは20文字以下で入力してください。" })
})

export type LoginFormData = z.infer<typeof formSchema>

const LoginForm = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          studentId: "",
          password: "",
        },
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const result = await login(values)

        if (result) {
            setError("ログインに失敗しました。")
        } else {
            router.push("/")
        }

        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>学生番号</FormLabel>
                        <FormControl>
                            <Input placeholder="学生番号を入力" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>パスワード</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="パスワードを入力" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-red-500">{error}</p>}

                <Button type="submit" disabled={loading}>
                    {loading ? 'ログイン中...' : 'ログイン'}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm