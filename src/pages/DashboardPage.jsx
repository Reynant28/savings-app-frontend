import { useState, useEffect } from 'react';
import {
  Wallet,
  Target,
  Pencil,
  LogOut,
  Trash,
  Plus,
  AlertCircle,
  Clock,
  X,
  Upload,
  Save,
  TrendingUp,
  PiggyBank,
  Gift,
  Camera,
  LoaderCircle,
  Banknote,
  CircleX,
} from 'lucide-react';

const baseUrl = 'http://127.0.0.1:8000';

function SavingsPage() {
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null); // null = add, object = edit
  const [showAddDepositModal, setShowAddDepositModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    nama_tabungan: '',
    target_nominal: '',
    target_tanggal: '',
    photo_file: null,
    status: 'aktif'
  });

  const [newDeposit, setNewDeposit] = useState({
    nominal: '',
    tanggal: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [goalsRes, transactionsRes] = await Promise.all([
        fetch(`${baseUrl}/api/tabungan`, { headers }),
        fetch(`${baseUrl}/api/riwayat-tabungan`, { headers })
      ]);

      const goalsData = await goalsRes.json();
      const transactionsData = await transactionsRes.json();

      if (goalsData.status === 'success') {
        setGoals(goalsData.data);
      }
      if (transactionsData.status === 'success') {
        setTransactions(transactionsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGoalProgress = (goalId, targetNominal) => {
    const goalTransactions = transactions.filter(
      t => t.id_tabungan === goalId
    );

    const totalDeposit = goalTransactions.reduce(
      (sum, t) => sum + Number(t.nominal),
      0
    );

    const remaining = Math.max(targetNominal - totalDeposit, 0);

    const percentage =
      targetNominal > 0
        ? Math.min((totalDeposit / targetNominal) * 100, 100)
        : 0;

    return {
      totalDeposit,
      remaining,
      percentage,
    };
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const openAddGoalModal = () => {
    setEditingGoal(null);
    setFormData({
      nama_tabungan: "",
      target_nominal: "",
      target_tanggal: "",
      photo_file: null,
      status: "aktif",
    });
    setShowGoalModal(true);
  };

  const openEditGoalModal = (goal) => {
    setEditingGoal(goal);
    setFormData({
      nama_tabungan: goal.nama_tabungan,
      target_nominal: goal.target_nominal,
      target_tanggal: goal.target_tanggal.split("T")[0],
      photo_file: null, // must be null (browser security rule)
      status: goal.status,
    });
    setShowGoalModal(true);
  };


  const handleSubmitGoal = async (e) => {
    e.preventDefault();
    setAddLoading(true);

    const token = localStorage.getItem('auth_token');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) form.append(key, value);
    });

    let url = `${baseUrl}/api/tabungan`;
    if (editingGoal) {
      url = `${baseUrl}/api/tabungan/${editingGoal.id_tabungan}`;
      form.append("_method", "PUT");
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (res.ok) {
      setShowGoalModal(false);
      fetchData();
    }
    setAddLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    window.location.href = '/login';
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${baseUrl}/api/tabungan/${goalId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleAddDeposit = async () => {
    try {
      setAddLoading(true);
      const token = localStorage.getItem('auth_token');

      const response = await fetch(`${baseUrl}/api/riwayat-tabungan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_tabungan: selectedGoal.id_tabungan,
          ...newDeposit
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setShowAddDepositModal(false);
        setNewDeposit({
          nominal: '',
          tanggal: new Date().toISOString().split('T')[0]
        });
        fetchData();
      }

      setAddLoading(false);
    } catch (error) {
      console.error('Error adding deposit:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const activeGoals = goals.filter(goal => goal.status === 'aktif');
  const completedGoals = goals.filter(goal => goal.status === 'selesai');
  const canceledGoals = goals.filter(goal => goal.status === 'cancel');

  const urgentGoals = activeGoals.filter(goal => {
    const daysLeft = getDaysRemaining(goal.target_tanggal);
    const progress = getGoalProgress(goal.id_tabungan, goal.target_nominal).percentage;
    return daysLeft < 30 && progress < 100;
  });

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#504B38] pb-20">
      {loading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 flex-col">
          <LoaderCircle className="mt-4 animate-spin text-white" size={48} />
          <div className="text-white text-xl font-semibold">Loading your savings goals...</div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 p-5 bg-[#536a37] hover:bg-[#4d6233] shadow-lg sticky top-0 z-10 rounded-3xl border border-green-100/10 hover:border-green-100/30 hover:bg- transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <PiggyBank className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white">My Savings</h1>
                  <p className="text-sm text-gray-200">Keep growing your savings</p>
                </div>
              </div>

              <div className='flex justify-between gap-4'>
                <button
                  onClick={openAddGoalModal}
                  className="px-3 py-3 bg-white text-[#536a37] rounded-xl font-semibold hover:bg-[#536a37] hover:text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <Plus size={20} />
                  New Goal
                </button>

                <button
                  onClick={() => handleLogout()}
                  className="px-4 py-4 bg-red-600 text-white rounded-full font-semibold hover:text-red-500 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95">
                  <LogOut size={20} />
                </button>
              </div>
            </div>

        </div>

        {/* Quick Stats Banner */}
        {activeGoals.length > 0 && (
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gray-400/40 hover:bg-white/7  shadow-lg transition-all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#7fa654]" />
                </div>
                <div>
                  <p className="text-sm text-white">Active Goals</p>
                  <p className="text-2xl font-bold text-white">{activeGoals.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#7fa654]" />
                </div>
                <div>
                  <p className="text-sm text-white">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedGoals.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Urgent</p>
                  <p className="text-2xl font-bold text-white">{urgentGoals.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Goals Warning */}
        {urgentGoals.length > 0 && (
          <div className="mb-8 relative rounded-2xl p-6 border border-red-500/10 bg-red-500/10 backdrop-blur-xl shadow-lg hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-400" size={24} />
              <h2 className="text-xl font-bold text-white">Needs Attention</h2>
            </div>
            <p className="text-gray-300 mb-4">These goals are approaching their deadline:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {urgentGoals.slice(0, 4).map(goal => {
                const daysLeft = getDaysRemaining(goal.target_tanggal);
                const { remaining } = getGoalProgress(
                  goal.id_tabungan,
                  goal.target_nominal
                );

                return (
                  <div key={goal.id_tabungan} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{goal.nama_tabungan}</h3>
                      <span className="text-red-400 text-sm font-medium">{daysLeft} days left</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowAddDepositModal(true);
                      }}
                      className="mt-2 text-sm px-3 py-1.5 bg-[#536a37] text-white rounded-lg hover:bg-[#3e5229] transition-all"
                      disabled={remaining === 0}
                    >
                      Add Deposit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content - Savings Goals */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target size={26} className="text-[#7fa654]" />
              My Savings Goals
              <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-gray-300">
                {activeGoals.length}
              </span>
            </h2>
          </div>

          {activeGoals.length === 0 ? (
            <div className="text-center py-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7 transition-all">
              <PiggyBank className="w-20 h-20 text-white-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Start Your Savings Journey</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Create your first savings goal and start building your future, one step at a time
              </p>
              <button
                onClick={openAddGoalModal}
                className="px-8 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#536a37] transition-all shadow-lg hover:shadow-xl"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGoals.map(goal => {
                const { totalDeposit, percentage, remaining } = getGoalProgress(goal.id_tabungan, goal.target_nominal);
                const daysLeft = getDaysRemaining(goal.target_tanggal);
                const isUrgent = daysLeft < 30;

                return (
                  <div
                    key={goal.id_tabungan}
                    className={`p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7 transition-all"`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      {goal.photo_file ? (
                        <img
                          src={goal.photo_url}
                          alt={goal.nama_tabungan}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-[#536a37]/20 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{goal.nama_tabungan}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <span className={`flex items-center gap-1 ${isUrgent ? 'text-orange-400' : 'text-gray-400'}`}>
                                <Clock size={14} />
                                {daysLeft} days left
                              </span>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-400">
                                {new Date(goal.target_tanggal).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteGoal(goal.id_tabungan)}
                                className="px-2 py-2 text-red-500 rounded-lg hover:text-red-400 transition-all text-sm font-medium"
                              >
                                <Trash size={18} />
                              </button>
                              <button
                                onClick={() => openEditGoalModal(goal)}
                                className="px-2 py-2 text-[#7ea053] rounded-lg hover:text-[#678745] transition-all text-sm font-medium"
                              >
                                <Pencil size={18} />
                              </button>
                            </div>
                            {goal.status !== 'selesai' && (
                              <button
                                onClick={() => {
                                  setSelectedGoal(goal);
                                  setShowAddDepositModal(true);
                                }}
                                className="px-4 py-2 bg-[#536a37] text-white rounded-lg hover:bg-[#3e5229] transition-all flex items-center gap-2 text-sm font-medium"
                              >
                                <Plus size={16} />
                                Deposit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-5">
                      <div className="flex justify-between text-sm mb-3">
                        <div>
                          <span className="text-gray-400">Progress • </span>
                          <span className="text-white font-semibold">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{formatCurrency(totalDeposit)}</div>
                          <div className="text-xs text-gray-400">saved</div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#628141] to-[#7fa654] animate-pulse rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-gray-400">Target</p>
                        <p className="text-sm font-semibold text-white">{formatCurrency(goal.target_nominal)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">
                          Remaining: Rp {remaining.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Daily needed</p>
                        <p className="text-sm font-semibold text-white">
                          {daysLeft > 0 ? formatCurrency((goal.target_nominal - totalDeposit) / daysLeft) : formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity Sidebar */}
        {recentTransactions.length > 0 && (
          <div className="p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7  transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={22} className="text-[#7fa654]" />
                Recent Activity
              </h3>
              <span className="text-sm text-gray-400">Last 3 deposits</span>
            </div>
            <div className="space-y-4">
              {recentTransactions.map(transaction => {
                const goal = goals.find(g => g.id_tabungan === transaction.id_tabungan);
                return (
                  <div key={transaction.id_riwayat} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#536a37]/20 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-[#7fa654]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{goal?.nama_tabungan || 'Savings Goal'}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400 text-sm">+{formatCurrency(transaction.nominal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gift size={22} className="text-green-500" />
              Achieved Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {completedGoals.map(goal => (
                <div key={goal.id_tabungan} className="bg-green-500/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-white">{goal.nama_tabungan}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Successfully completed!</p>
                  <p className="text-xs text-gray-400">Target: {formatCurrency(goal.target_nominal)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {canceledGoals.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CircleX size={22} className="text-red-500" />
              Canceled Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {canceledGoals.map(goal => (
                <div key={goal.id_tabungan} className="bg-red-500/10 backdrop-blur-sm rounded-xl p-5 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <CircleX className="w-5 h-5 text-red-400" />
                    </div>
                    <h4 className="font-semibold text-white">{goal.nama_tabungan}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Successfully canceled!</p>
                  <p className="text-xs text-gray-400">Target: {formatCurrency(goal.target_nominal)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add or Edit Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmitGoal}
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingGoal ? "✏️ Edit Goal" : "🎯 Create New Goal"}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {editingGoal ? "Update your savings goal details" : "What are you saving for?"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY */}
            <div className="space-y-4">
              {/* Goal Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Goal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nama_tabungan}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_tabungan: e.target.value })
                  }
                  placeholder="e.g., New Laptop, Vacation, Emergency Fund"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  required
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Target Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={formData.target_nominal}
                    onChange={(e) =>
                      setFormData({ ...formData, target_nominal: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    step="1000"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Target Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Target Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.target_tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, target_tanggal: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all [color-scheme:dark]"
                  required
                />
              </div>

              {/* Inspiration Photo */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Inspiration Photo (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, photo_file: e.target.files?.[0] })
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="photo-upload"
                  />
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:border-[#7fa654]/50 hover:text-white transition-colors">
                    <div className="flex items-center justify-center space-x-2">
                      <Upload size={20} />
                      <span>
                        {formData.photo_file ? formData.photo_file.name : "Choose an image..."}
                      </span>
                    </div>
                  </div>
                </div>
                {formData.photo_file && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">Selected: {formData.photo_file.name}</p>
                  </div>
                )}
              </div>

              {/* Current Status (if editing) */}
              {editingGoal && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="selesai">Selesai</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                {addLoading ? (
                  <div className="flex-1 py-3 bg-[#506934] text-white rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed">
                    <LoaderCircle className="animate-spin" size={20} />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#506934] active:scale-[0.98] transition-all shadow-lg"
                  >
                    {editingGoal ? (
                      <>
                        <Save className="inline mr-2" size={18} />
                        Update Goal
                      </>
                    ) : (
                      <>
                        <Plus className="inline mr-2" size={18} />
                        Create Goal
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}


      {/* Add Deposit Modal */}
      {showAddDepositModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#3d3932] rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Add Deposit</h2>
                <p className="text-gray-400 mt-1">Add to: <span className="text-white font-semibold">{selectedGoal.nama_tabungan}</span></p>
              </div>
              <button
                onClick={() => setShowAddDepositModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Amount to Deposit</label>
                <input
                  type="number"
                  value={newDeposit.nominal}
                  onChange={(e) => setNewDeposit({ ...newDeposit, nominal: e.target.value })}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-3">Date</label>
                <input
                  type="date"
                  value={newDeposit.tanggal}
                  onChange={(e) => setNewDeposit({ ...newDeposit, tanggal: e.target.value })}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                />
              </div>

              {addLoading ? (
                <div className="w-full py-4 bg-[#628141] text-white rounded-xl font-semibold flex items-center justify-center gap-3">
                  <LoaderCircle className="animate-spin" size={20} />
                  <span>Loading...</span>
                </div>
              ) : (
                <button
                  onClick={handleAddDeposit}
                  className="w-full py-4 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#536a37] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Add Deposit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavingsPage;