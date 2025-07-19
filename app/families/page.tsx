'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FamilyService, Family, FamilyMember } from '@/lib/services/familyService';
import FamilyCard from '@/components/families/FamilyCard';
import AddFamilyModal from '@/components/families/AddFamilyModal';
import InviteMemberModal from '@/components/families/InviteMemberModal';
import FamilyChat from '@/components/families/FamilyChat';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaPlus, FaUserPlus, FaUsers } from 'react-icons/fa';

export default function FamiliesPage() {
  const { user } = useAuth();
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [error, setError] = useState('');

  const fetchFamilies = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError('');
      const data = await FamilyService.getFamilies(user.id);
      setFamilies(data);
      if (data.length > 0 && !selectedFamily) {
        setSelectedFamily(data[0]);
      }
    } catch (err) {
      console.error('Error fetching families:', err);
      setError('Failed to fetch families.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedFamily]);

  const fetchFamilyMembers = useCallback(async () => {
    if (!selectedFamily?.id) return;
    try {
      const data = await FamilyService.getFamilyMembers(selectedFamily.id);
      setFamilyMembers(data);
    } catch (err) {
      console.error('Error fetching family members:', err);
      setError('Failed to fetch family members.');
    }
  }, [selectedFamily]);

  const handleAddFamily = async (familyData: { name: string; description?: string }) => {
    if (!user?.id) return;
    try {
      setError('');
      const newFamily = await FamilyService.createFamily(user.id, familyData);
      setFamilies(prev => [newFamily, ...prev]);
      setSelectedFamily(newFamily); // Select the newly created family
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding family:', err);
      setError('Failed to add family.');
    }
  };

  const handleInviteMember = async (email: string) => {
    if (!user?.id || !selectedFamily?.id) return;
    try {
      setError('');
      await FamilyService.inviteFamilyMember(selectedFamily.id, email, user.id);
      setShowInviteModal(false);
      alert('Invitation sent!');
    } catch (err) {
      console.error('Error inviting member:', err);
      setError('Failed to send invitation.');
    }
  };

  const handleRoleChange = async (memberId: string, newRole: 'owner' | 'admin' | 'caregiver' | 'viewer') => {
    try {
      setError('');
      await FamilyService.updateFamilyMemberRole(memberId, newRole);
      fetchFamilyMembers(); // Refresh members list
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update member role.');
    }
  };

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  useEffect(() => {
    if (selectedFamily) {
      fetchFamilyMembers();
    }
  }, [selectedFamily, fetchFamilyMembers]);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">Manage Families</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary">
            <FaPlus className="me-2" />
            Create Family
          </Button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <Loading />
        ) : families.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="h4 text-muted">No families found.</h3>
            <p className="text-muted">Get started by creating a new family.</p>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header">Your Families</div>
                <div className="list-group list-group-flush">
                  {families.map(family => (
                    <a
                      key={family.id}
                      href="#"
                      className={`list-group-item list-group-item-action ${selectedFamily?.id === family.id ? 'active' : ''}`}
                      onClick={() => setSelectedFamily(family)}
                    >
                      {family.name}
                    </a>
                  ))}
                </div>
              </div>
              {selectedFamily && (
                <Button onClick={() => setShowInviteModal(true)} className="btn-outline-primary w-100">
                  <FaUserPlus className="me-2" />
                  Invite Member
                </Button>
              )}
            </div>
            <div className="col-md-8">
              {selectedFamily && (
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Family: {selectedFamily.name}</span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-3">Family Members</h5>
                    {familyMembers.length === 0 ? (
                      <p className="text-muted">No members in this family yet.</p>
                    ) : (
                      <ul className="list-group">
                        {familyMembers.map(member => (
                          <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{member.profiles?.full_name || member.profiles?.email || 'Unknown User'}</strong>
                              <br />
                              <small className="text-muted">{member.role}</small>
                            </div>
                            <Select
                              value={member.role}
                              onChange={(e) => handleRoleChange(member.id!, e.target.value as 'owner' | 'admin' | 'caregiver' | 'viewer')}
                              className="form-select w-auto"
                            >
                              <option value="owner">Owner</option>
                              <option value="admin">Admin</option>
                              <option value="caregiver">Caregiver</option>
                              <option value="viewer">Viewer</option>
                            </Select>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
              {selectedFamily && (
                <FamilyChat familyId={selectedFamily.id!} />
              )}
            </div>
          </div>
        )}
      </div>

      <AddFamilyModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddFamily}
      />

      {selectedFamily && (
        <InviteMemberModal
          show={showInviteModal}
          onHide={() => setShowInviteModal(false)}
          onSubmit={handleInviteMember}
        />
      )}

      <Footer />
    </div>
  );
}