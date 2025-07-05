import { KPICard } from "@/components/ui/kpi-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EquipmentStatus } from "@/components/dashboard/equipment-status";
import { 
  BarChart3, 
  Truck, 
  Package, 
  DollarSign,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-glow">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
        <p className="text-primary-foreground/80">
          Here's what's happening at your mining operation today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Daily Production"
          value={2847}
          unit="tons"
          change={12.5}
          changeLabel="from yesterday"
          icon={BarChart3}
          variant="success"
        />
        
        <KPICard
          title="Equipment Efficiency"
          value={89}
          unit="%"
          change={-2.1}
          changeLabel="from last week"
          icon={Truck}
          variant="warning"
        />
        
        <KPICard
          title="Inventory Levels"
          value={94}
          unit="%"
          change={5.2}
          changeLabel="from last month"
          icon={Package}
          variant="success"
        />
        
        <KPICard
          title="Daily Revenue"
          value="$142,850"
          change={8.7}
          changeLabel="from yesterday"
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Charts and Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div>
          <EquipmentStatus />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-6 shadow-elevation">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Production Target Exceeded</p>
                <p className="text-xs text-muted-foreground">Zone A-1 exceeded daily target by 15%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Equipment Maintenance Completed</p>
                <p className="text-xs text-muted-foreground">Haul Truck Delta returned to service</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New Inventory Shipment</p>
                <p className="text-xs text-muted-foreground">Spare parts delivery received</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-elevation">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Action Required
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Scheduled Maintenance Due</p>
                <p className="text-xs text-muted-foreground">Conveyor Beta requires inspection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Low Inventory Alert</p>
                <p className="text-xs text-muted-foreground">Hydraulic fluid below minimum threshold</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Weather Advisory</p>
                <p className="text-xs text-muted-foreground">Heavy rain forecast for tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;