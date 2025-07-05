import { Link } from "react-router-dom";
import heroImage from "@/assets/mining-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              MineOptimize
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Comprehensive ERP solution for mining operations. Track production, manage equipment, 
              control inventory, and optimize your entire operation from one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg shadow-elevation hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </Link>
              <button className="px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Mining Operations Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From production tracking to financial reporting, MineOptimize provides all the tools 
              you need to run efficient, profitable mining operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Production Tracking</h3>
              <p className="text-muted-foreground">
                Real-time monitoring of extraction rates, material quality, and production efficiency across all mining zones.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Equipment Management</h3>
              <p className="text-muted-foreground">
                Comprehensive equipment monitoring, maintenance scheduling, and performance analytics to maximize uptime.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Inventory Control</h3>
              <p className="text-muted-foreground">
                Automated inventory tracking, supplier management, and smart reordering to prevent stockouts.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Financial Reporting</h3>
              <p className="text-muted-foreground">
                Detailed cost analysis, profitability tracking, and comprehensive financial reporting for informed decisions.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Safety & Compliance</h3>
              <p className="text-muted-foreground">
                Comprehensive safety monitoring, incident reporting, and regulatory compliance tracking.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elevation hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Real-time KPI monitoring, trend analysis, and predictive insights to optimize operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Optimize Your Mining Operations?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join leading mining companies worldwide who trust MineOptimize to streamline their operations and maximize profitability.
          </p>
          <Link to="/dashboard">
            <button className="px-12 py-4 bg-accent text-accent-foreground font-semibold rounded-lg shadow-elevation hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-lg">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
