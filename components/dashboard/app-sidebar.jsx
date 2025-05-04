"use client"

import { usePathname } from "next/navigation" // Cambia esto
import {
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Upload,
  Users,
} from "lucide-react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Authenticator } from "@aws-amplify/ui-react"

export function AppSidebar() {
  const router = usePathname()

  // Compara si la URL actual coincide con el href del enlace
  const isActive = (href) => {
    return router.asPath === href
  }

  console.log("URL actual:", router.asPath)

  return (
    <>
      <Sidebar variant="sidebar">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex items-center justify-center mx-4 my-3">
              <Image
                src="/logo_admin.svg"
                alt="Logo"
                width={120}
                height={20}
                className="object-contain"
              />
            </div>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/mis-plantillas")}
                  >
                    <Link href="/mis-plantillas">
                      <FileText />
                      <span>Mis Plantillas</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/subir-archivos")}
                  >
                    <Link href="/crear-plantilla">
                      <Upload />
                      <span>Subir Archivos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/documentos")}>
                    <Link href="/documentos">
                      <FileText />
                      <span>Documentos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/usuarios")}>
                    <Link href="/usuarios">
                      <Users />
                      <span>Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/configuracion")}
                  >
                    <Link href="/configuracion">
                      <Settings />
                      <span>Configuración</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <hr className="border-t my-4 w-9" />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="!bg-secondary !text-white"
                >
                  <Authenticator>
                    {({ signOut }) => (
                      <div
                        className="flex items-center cursor-pointer gap-3"
                        onClick={signOut}
                      >
                        <LogOut />
                        <span>Cerrar Sesión</span>
                      </div>
                    )}
                  </Authenticator>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center p-2 !bg-secondary !text-white rounded-md">
              <Image
                src="/profile_picture.jpg"
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="ml-3">
                <span className="text-sm font-medium">
                  Fundación Código Abierto
                </span>
                <br />
                <span className="text-xs text-white">Empresa</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarRail />
      </Sidebar>
    </>
  )
}
