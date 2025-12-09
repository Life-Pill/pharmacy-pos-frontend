import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { IBranchData } from '../interfaces/IBranchData';
import { useUserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';

const UseBranchService = () => {
  const http = useAxiosInstance();
  const [branchData, setBranchData] = useState<IBranchData>();
  // const { user } = useUserContext(); //dont remove this from code because this is for the branch id
  // const branchID = ; //replace this with actual id
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUserContext();

  const fetchBranchData = async () => {
    try {
      setLoading(true);
      const res = await http.get(
        `/branch/summary/${user.user?.branchId}`
      );
      console.log('Branch summary response:', res);
      const { data } = res;
      setBranchData(data.data);
      // console.log(branchData);
    } catch (error: any) {
      console.error('Branch summary error:', error.response || error);
      toast.error(`Unable to fetch branch details: ${error.response?.status || 'Network error'}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchBranchData,
    branchData,
    loading,
  };
};

export default UseBranchService;
