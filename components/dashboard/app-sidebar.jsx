import {
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Upload,
  Users,
} from 'lucide-react';
import Image from 'next/image';
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
} from '@/components/ui/sidebar';

export function AppSidebar() {
  return (
    <>
      <Sidebar variant="sidebar">
        <SidebarHeader>
          <SidebarMenu>
            <div className='flex items-center justify-center mx-4 my-3'>
              {/*<LayoutDashboard className="size-4" />*/}
              <Image
                src='/logo_admin.svg'
                alt='Logo'
                width={120}
                height={20}
                className='object-contain'
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
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <Home />
                      <span>Inicio</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <a href='#'>
                      <Upload />
                      <span>Subir Archivos</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <FileText />
                      <span>Documentos</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <Users />
                      <span>Usuarios</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <Settings />
                      <span>Configuración</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <hr className='border-t my-4 w-9' />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='!bg-[#5D1B9E] !text-white'
                >
                  <a href='#'>
                    <LogOut />
                    <span>Cerrar Sesión</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='flex items-center p-2'>
              <Image
                src='/profile_picture.jpg'
                alt='Profile Picture'
                width={40}
                height={40}
                className='rounded-full object-cover'
              />
              <div className='ml-3'>
                <span className='text-sm font-medium'>Fundación Código Abierto</span>
                <br />
                <span className='text-xs text-white'>Empresa</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarRail />
      </Sidebar>
    </>
  );
}
