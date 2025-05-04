"use client"; // Asegúrate de que esta directiva esté en la parte superior

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

// Configuración de Amplify
Amplify.configure(outputs);

// Definir un tema personalizado
const theme = {
  name: "custom-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          value: "#742FB8", // Cambia este valor por el color que desees (ejemplo: morado)
        },
      },
    },
  },
};

// Personalización de los componentes (Headers y Footers)
const components = {
  SignIn: {
    Footer() {
      return (
        <div className="text-center">
          <button className="text-blue-500" onClick={() => alert('Redirect to forgot password')}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      );
    },
  },
  SignUp: {
    Footer() {
      return (
        <div className="text-center">
          <button className="text-blue-500" onClick={() => alert('Redirect to sign in')}>
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      );
    },
  },
};

// Personalización de los campos del formulario
const formFields = {
  signIn: {
    username: {
      label: "Correo electrónico",
      placeholder: "Introduce tu correo electrónico",
    },
    password: {
      label: "Contraseña",
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
        >
          {({ signOut, user }) => {
            if (user) {
              // Si el usuario está logueado, redirigir al Dashboard
              if (typeof window !== "undefined") {
                window.location.href = "/mis-plantillas"; // Redirigir al Dashboard
              }
            }

            return (
              <div className="flex flex-col items-center">
              </div>
            );
          }}
        </Authenticator>
      </div>

      {/* Sección de bienvenida a la derecha */}
      <div className="w-1/2 text-white p-8 flex flex-col justify-center items-center">
        <div
          className="h-full bg-cover bg-center bg-primary w-full rounded-[30px] flex flex-col justify-center items-center p-8"
          style={{ backgroundImage: "url('/fondo-login.svg')" }}
        >
          <h1 className="text-4xl font-bold mb-4">DocFlow</h1>
          <p className="text-lg text-center mb-6">
            Documentos más inteligentes, trabajo más ágil.
          </p>
          <p className="text-center w-80%">
            Accede a tu espacio de trabajo para crear, completar y automatizar documentos fácilmente. Todo lo que necesitas para gestionar tus flujos documentales, en un solo lugar.
          </p>
        </div>
      </div>
    </main>
  );
}
