"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

// Configurar Amplify
Amplify.configure(outputs);

const components = {
  SignIn: {
    Header() {
      return (
        <h2 className="text-center text-2xl font-bold mb-4">Inicia sesión en tu cuenta</h2>
      );
    },
    Footer() {
      return (
        <div className="text-center">
          <button className="text-blue-500" onClick={() => alert('Redirect to forgot password')}>¿Olvidaste tu contraseña?</button>
        </div>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <h2 className="text-center text-2xl font-bold mb-4">Crea una cuenta nueva</h2>
      );
    },
    Footer() {
      return (
        <div className="text-center">
          <button className="text-blue-500" onClick={() => alert('Redirect to sign in')}>¿Ya tienes una cuenta? Inicia sesión</button>
        </div>
      );
    },
  },
  // Agrega más componentes personalizados como ConfirmSignIn, ForgotPassword, etc. si lo necesitas
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Introduce tu correo electrónico",
    },
    password: {
      placeholder: "Introduce tu contraseña",
    },
  },
  signUp: {
    username: {
      label: "Correo electrónico",
      placeholder: "Introduce tu correo electrónico",
    },
    password: {
      label: "Contraseña",
      placeholder: "Introduce tu contraseña",
    },
    confirm_password: {
      label: "Confirmar contraseña",
      placeholder: "Confirma tu contraseña",
    },
  },
};

export default function App() {
  return (
    <main className="flex min-h-screen">
      {/* Sección de login a la izquierda */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-8">
        <Authenticator 
          formFields={formFields} 
          components={components}
          socialProviders={['google']}
        >
          {({ signOut, user }) => (
            <div className="flex flex-col items-center">
              <h2 className="text-xl">Hola {user.username}</h2>
              <button
                onClick={signOut}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </Authenticator>
      </div>

      {/* Sección de bienvenida a la derecha */}
      <div className="w-1/2 text-white p-8 flex flex-col justify-center items-center">
        <div className="h-full bg-purple-600  w-full rounded-[30px] flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold mb-4">DocFlow</h1>
          <p className="text-lg text-center mb-6">
            Documentos más inteligentes, trabajo más ágil.
          </p>
          <p className="text-center">
            Accede a tu espacio de trabajo para crear, completar y automatizar documentos fácilmente. Todo lo que necesitas para gestionar tus flujos documentales, en un solo lugar.
          </p>
        </div>
      </div>
    </main>
  );
}
