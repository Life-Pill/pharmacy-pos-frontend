import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { IBranchData } from '../interfaces/IBranchData';
import { useUserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';

const UseBranchService = () => {
  const http = useAxiosInstance();
  const [branchData, setBranchData] = useState<IBranchData>();
  const { user } = useUserContext(); //dont remove this from code because this is for the branch id
  const branchID = 3; //replace this with actual id
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBranchData = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/branch-summary/sales-summary/${branchID}`);
      console.log(res);
      const { data } = res;
      setBranchData(data.data);
      // console.log(branchData);
    } catch (error) {
      toast.error('Unable to fetch details');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchBranchData,
    branchData,
  };
};

export default UseBranchService;
