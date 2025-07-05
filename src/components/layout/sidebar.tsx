"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Settings, 
  Truck, 
  Package, 
  DollarSign, 
  Users,
  Shield,
  Home,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Production",
    href: "/dashboard/production",
    icon: BarChart3,
  },
  {
    name: "Equipment",
    href: "/dashboard/equipment", 
    icon: Truck,
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    name: "Financial",
    href: "/dashboard/financial",
    icon: DollarSign,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Safety",
    href: "/dashboard/safety",
    icon: Shield,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={cn("pb-12 bg-gradient-surface shadow-elevation", className)}>
      <div className="space-y-4 py-4">
        <div className="px-6 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MineOptimize
            </h2>
          </div>
        </div>
        <Separator className="mx-6" />
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start transition-all duration-200",
                      isActive && "bg-gradient-primary text-primary-foreground shadow-glow"
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <Separator className="mx-6" />
        <div className="px-3">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}