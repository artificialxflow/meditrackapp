'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileService, Profile } from '@/lib/services/profileService';
import AvatarUpload from '@/components/AvatarUpload';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      // In a real app, you'd fetch the full profile from your DB
      // For now, we'll use user data from auth and simulate fetching
      setProfile({
        id: user.id,
        full_name: user.user_metadata.full_name || '',
        avatar_url: user.user_metadata.avatar_url || '',
        email: user.email || '', // اضافه کردن ایمیل برای رفع خطا
      });
      setFullName(user.user_metadata.full_name || '');
      setLoading(false);
    }
  }, [user]);

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    try {
      setError('');
      const publicUrl = await ProfileService.uploadAvatar(user.id, file);
      const updatedProfile = await ProfileService.updateProfile(user.id, { avatar_url: publicUrl });
      setProfile(updatedProfile);
      // Optionally, refresh user session to update avatar_url in user object
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar.');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      setError('');
      const updatedProfile = await ProfileService.updateProfile(user.id, { full_name: fullName });
      setProfile(updatedProfile);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <Loading />
          <p className="mt-4 text-muted">Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="h2 text-primary mb-4">My Profile</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <div className="col-md-4">
            <AvatarUpload onUpload={handleAvatarUpload} currentAvatarUrl={profile?.avatar_url} />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Profile Information</h5>
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Input type="email" value={user.email} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <Button type="submit" className="btn-primary">Update Profile</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
