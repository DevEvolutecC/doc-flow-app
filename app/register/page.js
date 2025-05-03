"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { signUp } from "aws-amplify/auth"
import { Amplify } from "aws-amplify"

import outputs from "../../amplify_outputs.json"
import { useRouter } from "next/navigation"
Amplify.configure(outputs)

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      // await signUp({
      //   username: formData.email,
      //   password: formData.password,
      // })
      router.push("/dashboard")
      setSuccess("Registro exitoso. Por favor, verifica tu correo electrónico.")
    } catch (err) {
      setError(err.message || "Error al registrar el usuario")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Crear una cuenta
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus datos para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              Crear cuenta
            </Button>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  o continuar con
                </span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Registrarse con Google
            </Button>
          </CardFooter>
        </form>
        <div className="px-8 pb-8 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </Card>
    </div>
  )
}
