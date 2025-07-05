"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Truck, Wrench, AlertTriangle, CheckCircle } from "lucide-react";

const equipmentData = [
  { 
    id: "EXC-001", 
    name: "Excavator Alpha", 
    status: "operational", 
    efficiency: 92,
    location: "Zone A-1"
  },
  { 
    id: "TRK-005", 
    name: "Haul Truck Delta", 
    status: "maintenance", 
    efficiency: 0,
    location: "Maintenance Bay"
  },
  { 
    id: "DRL-003", 
    name: "Drill Rig Charlie", 
    status: "operational", 
    efficiency: 87,
    location: "Zone B-2"
  },
  { 
    id: "CNV-002", 
    name: "Conveyor Beta", 
    status: "warning", 
    efficiency: 76,
    location: "Processing Plant"
  },
  { 
    id: "CRS-001", 
    name: "Primary Crusher", 
    status: "operational", 
    efficiency: 94,
    location: "Processing Plant"
  },
];

const statusConfig = {
  operational: { color: "success", icon: CheckCircle, label: "Operational" },
  maintenance: { color: "secondary", icon: Wrench, label: "Maintenance" },
  warning: { color: "warning", icon: AlertTriangle, label: "Warning" },
  down: { color: "destructive", icon: AlertTriangle, label: "Down" },
};

export function EquipmentStatus() {
  return (
    <Card className="bg-gradient-surface shadow-elevation">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Equipment Status
        </CardTitle>
        <CardDescription>
          Real-time equipment monitoring and efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipmentData.map((equipment) => {
            const statusInfo = statusConfig[equipment.status as keyof typeof statusConfig];
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-5 w-5 text-${statusInfo.color}`} />
                  <div>
                    <p className="font-medium text-sm">{equipment.name}</p>
                    <p className="text-xs text-muted-foreground">{equipment.id} • {equipment.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {equipment.status === "operational" || equipment.status === "warning" ? (
                    <div className="text-right min-w-0 flex-1">
                      <p className="text-sm font-medium">{equipment.efficiency}%</p>
                      <Progress 
                        value={equipment.efficiency} 
                        className="w-16 h-2 mt-1"
                      />
                    </div>
                  ) : null}
                  <Badge 
                    variant={statusInfo.color === "success" ? "default" : 
                            statusInfo.color === "warning" ? "secondary" : 
                            statusInfo.color === "destructive" ? "destructive" : "secondary"}
                    className={
                      statusInfo.color === "success" ? "bg-success text-success-foreground" :
                      statusInfo.color === "warning" ? "bg-warning text-warning-foreground" :
                      ""
                    }
                  >
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}