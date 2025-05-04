"use client";

import { Amplify } from "aws-amplify";
import { SidebarProvider } from "@/components/ui/sidebar";

import outputs from "@/amplify_outputs.json";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

Amplify.configure(outputs);

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* Barra lateral */}
        <AppSidebar />
        
        {/* Área de contenido principal */}
        <div className="flex-1 min-w-[82vw] bg-background">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
