import { useUserContext } from '../../../context/UserContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../login/services/useAxiosInstance';

export enum ResponseStatus {
  REVIEWING = 'REVIEWING',
  AVAILABLE = 'AVAILABLE',
  PARTIALLY_AVAILABLE = 'PARTIALLY_AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export interface MedicineResponse {
  medicineName: string;
  isAvailable: boolean;
  quantityAvailable: number;
  unitPrice: number;
}

export interface PrescriptionResponse {
  branchId: number;
  userId: string;
  status: ResponseStatus;
  totalAmount: number;
  notes: string;
  medicines: MedicineResponse[];
}

const usePrescriptionService = () => {
  const user = useUserContext();
  const axiosInstance = useAxiosInstance();
  const [submitting, setSubmitting] = useState(false);

  const respondToPrescription = async (
    prescriptionId: string,
    response: PrescriptionResponse
  ): Promise<boolean> => {
    try {
      setSubmitting(true);

      const payload = {
        branchId: user.user?.branchId || response.branchId,
        userId: response.userId, // Prescription sender's userId
        status: response.status,
        totalAmount: response.totalAmount,
        notes: response.notes,
        medicines: response.medicines
      };

      console.log('Submitting prescription response:', payload);

      const res = await axiosInstance.post(
        `prescription/${prescriptionId}/responses`,
        payload
      );

      console.log('Prescription response submitted:', res.data);
      
      toast.success('Prescription response submitted successfully', {
        position: 'top-right',
        autoClose: 3000,
      });

      return true;
    } catch (error: any) {
      console.error('Error submitting prescription response:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to submit prescription response';
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const updatePrescriptionStatus = async (
    prescriptionId: string,
    status: ResponseStatus,
    notes?: string
  ): Promise<boolean> => {
    try {
      const response: PrescriptionResponse = {
        branchId: user.user?.branchId || 0,
        userId: user.user?.employerId?.toString() || '',
        status,
        totalAmount: 0,
        notes: notes || '',
        medicines: []
      };

      return await respondToPrescription(prescriptionId, response);
    } catch (error) {
      console.error('Error updating prescription status:', error);
      return false;
    }
  };

  return {
    respondToPrescription,
    updatePrescriptionStatus,
    submitting
  };
};

export default usePrescriptionService;
