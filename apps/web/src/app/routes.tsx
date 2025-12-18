import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { UsersListPage } from './pages/UsersListPage';
import { UserDetailsPage } from './pages/UserDetailsPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<UsersListPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

