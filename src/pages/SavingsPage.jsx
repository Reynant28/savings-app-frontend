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

            <GoalsSection
              activeGoals={activeGoals}
              getGoalProgress={getGoalProgress}
              getDaysRemaining={getDaysRemaining}
              formatCurrency={formatCurrency}
              openAddGoalModal={openAddGoalModal}
              openEditGoalModal={openEditGoalModal}
              handleDeleteGoal={handleDeleteGoal}
              setSelectedGoal={setSelectedGoal}
              setShowAddDepositModal={setShowAddDepositModal}
            />

            <RecentActivity
              recentTransactions={recentTransactions}
              goals={goals}
              formatCurrency={formatCurrency}
            />

            <CompletedCard 
              completedGoals={completedGoals} 
              formatCurrency={formatCurrency}
            />
            <CanceledCard 
              canceledGoals={canceledGoals} 
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