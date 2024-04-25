import React from 'react';
import LogInCard from '../features/login/components/LogInCard';
import RecentLogBar from '../features/login/components/RecentLogBar';
import { useNavigate } from 'react-router-dom';
import { LogInPageLayout } from '../features/login';

const LogInPage = () => {
  return <LogInPageLayout />;
};

export default LogInPage;
