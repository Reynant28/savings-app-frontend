import { useState, useEffect } from 'react';
import SavingsHeader from '../components/savings/SavingsHeader';
import StatsCard from '../components/savings/StatsCard';
import WarningGoals from '../components/savings/WarningGoals';
import GoalsSection from '../components/savings/GoalsSection';
import RecentActivity from '../components/savings/RecentActivity';
import CompletedCard from '../components/savings/CompletedCard';
import CanceledCard from '../components/savings/CanceledCard';
import GoalsModal from '../components/savings/GoalsModal';
import DepositModal from '../components/savings/DepositModal';
import SavingsSkeleton from '../components/savings/skeletons/SavingsSkeleton';
import DeleteConfirmModal from '../components/savings/modal/DeleteConfirmModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Target, Gift, XCircle, Trash } from 'lucide-react';

const baseUrl = 'http://127.0.0.1:8000';

function SavingsPage() {
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null); // null = add, object = edit
  const [activeTab, setActiveTab] = useState('aktif');
  const [showAddDepositModal, setShowAddDepositModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const openDeleteModal = (goal) => {
    console.log("Goal to delete:", goal); // Check your browser console
    setGoalToDelete(goal);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!goalToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${baseUrl}/api/tabungan/${goalToDelete.id_tabungan}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setShowDeleteModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    } finally {
      setDeleteLoading(false);
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

  const TabButton = ({ id, label, count, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative flex items-center gap-2 px-4 py-2 transition-all ${
        activeTab === id ? "text-white" : "text-gray-400 hover:text-gray-200"
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
      <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{count}</span>
      
      {activeTab === id && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7fa654]"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#504B38] pb-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <SavingsHeader
          openAddGoalModal={openAddGoalModal}
          handleLogout={handleLogout}
        />

        {loading ? (
          /* Show Skeleton while loading */
          <SavingsSkeleton />
        ) : (
          /* Show actual content when loading is finished */
          <>
            <StatsCard
              activeGoals={activeGoals}
              completedGoals={completedGoals}
              urgentGoals={urgentGoals}
            />

            <WarningGoals
              urgentGoals={urgentGoals}
              getDaysRemaining={getDaysRemaining}
              getGoalProgress={getGoalProgress}
              setSelectedGoal={setSelectedGoal}
              setShowAddDepositModal={setShowAddDepositModal}
            />

            <div className="flex items-center gap-4 mb-6 border-b border-white/10">
              <TabButton id="aktif" label="Active" count={activeGoals.length} icon={Target} />
              <TabButton id="selesai" label="Completed" count={completedGoals.length} icon={Gift} />
              <TabButton id="cancel" label="Canceled" count={canceledGoals.length} icon={XCircle} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'selesai' && (
                  <CompletedCard 
                    completedGoals={completedGoals} 
                    formatCurrency={formatCurrency}
                  />
                )}
                {activeTab === 'cancel' && (
                  <CanceledCard 
                    canceledGoals={canceledGoals} 
                    formatCurrency={formatCurrency}
                  />
                )}
                {activeTab === 'aktif' && (
                  
                  <GoalsSection
                    activeGoals={activeGoals}
                    getGoalProgress={getGoalProgress}
                    getDaysRemaining={getDaysRemaining}
                    formatCurrency={formatCurrency}
                    openAddGoalModal={openAddGoalModal}
                    openEditGoalModal={openEditGoalModal}
                    handleDeleteGoal={openDeleteModal}
                    setSelectedGoal={setSelectedGoal}
                    setShowAddDepositModal={setShowAddDepositModal}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <DeleteConfirmModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleConfirmDelete}
              title={goalToDelete?.nama_tabungan}
              loading={deleteLoading}
            />

            <RecentActivity
              recentTransactions={recentTransactions}
              goals={goals}
              formatCurrency={formatCurrency}
            />
          </>
        )}
      </div>
          
      <GoalsModal
        showGoalModal={showGoalModal}
        editingGoal={editingGoal}
        formData={formData}
        setFormData={setFormData}
        setShowGoalModal={setShowGoalModal}
        handleSubmitGoal={handleSubmitGoal}
        addLoading={addLoading}
      />

      <DepositModal
        showAddDepositModal={showAddDepositModal}
        selectedGoal={selectedGoal}
        newDeposit={newDeposit}
        setNewDeposit={setNewDeposit}
        setShowAddDepositModal={setShowAddDepositModal}
        handleAddDeposit={handleAddDeposit}
        addLoading={addLoading}
      />
    </div>
  );
}

export default SavingsPage;