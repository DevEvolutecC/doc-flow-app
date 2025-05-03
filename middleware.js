import { Auth } from 'aws-amplify';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req) {
  // // Se obtiene el path de la URL solicitada
  // const { pathname } = req.nextUrl;

  // // Lista de rutas protegidas que requieren autenticación
  // const protectedRoutes = ['/profile', '/dashboard', '/settings']; 

  // // Verificar si el usuario está autenticado para las rutas protegidas
  // if (protectedRoutes.includes(pathname)) {
  //   try {
  //     // Intentar obtener el usuario autenticado
  //     await Auth.currentAuthenticatedUser();
  //     // Si está autenticado, dejamos que pase la solicitud
  //     return NextResponse.next();
  //   } catch (error) {
  //     // Si no está autenticado, redirigir al login
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }
  // }

  // // Si no está en una ruta protegida, simplemente dejamos que pase la solicitud
  // return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard', '/settings'], // Puedes especificar las rutas que desees proteger
};
