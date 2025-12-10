import Navigation from '../components/LandingNavigation';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1B211A] via-[#253526] to-[#1B211A]">
      <Navigation />
      
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
          
          <div className="bg-white bg-opacity-5 backdrop-blur-xl p-8 rounded-3xl border border-white border-opacity-10">
            <p className="text-gray-300">Welcome to your dashboard! Your financial data will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}