import React, { useState, useEffect, useRef } from 'react';
import { MdAdd, MdDelete, MdCheckCircle, MdCancel, MdWarning } from 'react-icons/md';
import { ResponseStatus, MedicineResponse } from '../../services/PrescriptionService';
import { IMedicine } from '../../../../interfaces/IMedicine';

interface PrescriptionResponseFormProps {
  prescriptionId: string;
  onSubmit: (status: ResponseStatus, medicines: MedicineResponse[], totalAmount: number, notes: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  availableMedicines?: IMedicine[];
}

const PrescriptionResponseForm: React.FC<PrescriptionResponseFormProps> = ({
  prescriptionId,
  onSubmit,
  onCancel,
  isSubmitting,
  availableMedicines = []
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ResponseStatus>(ResponseStatus.AVAILABLE);
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState<MedicineResponse[]>([
    { medicineName: '', isAvailable: true, quantityAvailable: 0, unitPrice: 0 }
  ]);
  const [searchTerm, setSearchTerm] = useState<{ [key: number]: string }>({});
  const [showDropdown, setShowDropdown] = useState<{ [key: number]: boolean }>({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.keys(dropdownRefs.current).every(
        (key) => !dropdownRefs.current[parseInt(key)]?.contains(event.target as Node)
      );
      if (clickedOutside) {
        setShowDropdown({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addMedicine = () => {
    setMedicines([...medicines, { medicineName: '', isAvailable: true, quantityAvailable: 0, unitPrice: 0 }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
      const newSearchTerm = { ...searchTerm };
      delete newSearchTerm[index];
      setSearchTerm(newSearchTerm);
    }
  };

  const updateMedicine = (index: number, field: keyof MedicineResponse, value: any) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const handleMedicineNameChange = (index: number, value: string) => {
    setSearchTerm({ ...searchTerm, [index]: value });
    updateMedicine(index, 'medicineName', value);
    setShowDropdown({ ...showDropdown, [index]: value.length > 0 });
    setFocusedIndex(index);
  };

  const selectMedicine = (index: number, medicineName: string, price: number, availableQty: number) => {
    const updated = [...medicines];
    updated[index] = {
      medicineName,
      isAvailable: true,
      quantityAvailable: availableQty > 0 ? 1 : 0,
      unitPrice: price
    };
    setMedicines(updated);
    setSearchTerm({ ...searchTerm, [index]: medicineName });
    setShowDropdown({ ...showDropdown, [index]: false });
  };

  const getFilteredMedicines = (index: number) => {
    const search = searchTerm[index]?.toLowerCase() || '';
    if (!search) return [];
    
    return availableMedicines.filter(med => 
      med.name.toLowerCase().includes(search) ||
      med.id.toString().includes(search)
    ).slice(0, 5);
  };

  const calculateTotal = () => {
    return medicines.reduce((sum, med) => {
      if (med.isAvailable) {
        return sum + (med.quantityAvailable * med.unitPrice);
      }
      return sum;
    }, 0);
  };

  const handleSubmit = () => {
    const totalAmount = calculateTotal();
    onSubmit(selectedStatus, medicines, totalAmount, notes);
  };

  const isFormValid = () => {
    if (selectedStatus === ResponseStatus.NOT_AVAILABLE) {
      return notes.trim().length > 0;
    }
    return medicines.every(med => med.medicineName.trim().length > 0);
  };

  const statusOptions = [
    {
      value: ResponseStatus.AVAILABLE,
      label: 'Available',
      icon: MdCheckCircle,
      color: 'green',
      description: 'All medicines in stock'
    },
    {
      value: ResponseStatus.PARTIALLY_AVAILABLE,
      label: 'Partially Available',
      icon: MdWarning,
      color: 'orange',
      description: 'Some medicines available'
    },
    {
      value: ResponseStatus.NOT_AVAILABLE,
      label: 'Not Available',
      icon: MdCancel,
      color: 'red',
      description: 'Medicines not in stock'
    }
  ];

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 space-y-4'>
      {/* Status Selection */}
      <div>
        <label className='block text-sm font-semibold text-gray-800 mb-2'>Response Status</label>
        <div className='grid grid-cols-3 gap-2'>
          {statusOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedStatus === option.value;
            return (
              <button
                key={option.value}
                type='button'
                onClick={() => setSelectedStatus(option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon
                  className={`mx-auto mb-1 ${
                    isSelected ? `text-${option.color}-600` : 'text-gray-400'
                  }`}
                  size={24}
                />
                <p className={`text-xs font-medium ${isSelected ? `text-${option.color}-700` : 'text-gray-600'}`}>
                  {option.label}
                </p>
                <p className='text-xs text-gray-500 mt-1'>{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Medicine List - Only show if not NOT_AVAILABLE */}
      {selectedStatus !== ResponseStatus.NOT_AVAILABLE && (
        <div>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-sm font-semibold text-gray-800'>Medicines</label>
            <button
              type='button'
              onClick={addMedicine}
              className='text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors'
            >
              <MdAdd size={16} />
              Add Medicine
            </button>
          </div>

          <div className='space-y-2 max-h-64 overflow-y-auto'>
            {medicines.map((medicine, index) => (
              <div key={index} className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
                <div className='grid grid-cols-12 gap-2 items-start'>
                  {/* Medicine Name */}
                  <div className='col-span-5 relative' ref={(el) => (dropdownRefs.current[index] = el)}>
                    <label className='text-xs text-gray-600 block mb-1'>Medicine Name</label>
                    <input
                      type='text'
                      value={medicine.medicineName}
                      onChange={(e) => handleMedicineNameChange(index, e.target.value)}
                      onFocus={() => {
                        setFocusedIndex(index);
                        if (medicine.medicineName) {
                          setShowDropdown({ ...showDropdown, [index]: true });
                        }
                      }}
                      placeholder='Search medicine...'
                      className='w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none'
                      autoComplete='off'
                    />
                    
                    {/* Autocomplete Dropdown */}
                    {showDropdown[index] && focusedIndex === index && getFilteredMedicines(index).length > 0 && (
                      <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto'>
                        {getFilteredMedicines(index).map((med, i) => (
                          <div
                            key={i}
                            onClick={() => selectMedicine(index, med.name, med.price, med.quantity)}
                            className='px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                          >
                            <div className='flex justify-between items-center'>
                              <div>
                                <p className='text-sm font-medium text-gray-800'>{med.name}</p>
                                <p className='text-xs text-gray-500'>ID: {med.id}</p>
                              </div>
                              <div className='text-right'>
                                <p className='text-sm font-semibold text-blue-600'>Rs. {med.price.toFixed(2)}</p>
                                <p className={`text-xs ${med.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  Stock: {med.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Available Toggle */}
                  <div className='col-span-2'>
                    <label className='text-xs text-gray-600 block mb-1'>Available</label>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={medicine.isAvailable}
                        onChange={(e) => updateMedicine(index, 'isAvailable', e.target.checked)}
                        className='sr-only peer'
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  {/* Quantity */}
                  <div className='col-span-2'>
                    <label className='text-xs text-gray-600 block mb-1'>Quantity</label>
                    <input
                      type='number'
                      value={medicine.quantityAvailable}
                      onChange={(e) => updateMedicine(index, 'quantityAvailable', parseInt(e.target.value) || 0)}
                      disabled={!medicine.isAvailable}
                      min='0'
                      className='w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none disabled:bg-gray-100'
                    />
                  </div>

                  {/* Unit Price */}
                  <div className='col-span-2'>
                    <label className='text-xs text-gray-600 block mb-1'>Price (Rs.)</label>
                    <input
                      type='number'
                      value={medicine.unitPrice}
                      onChange={(e) => updateMedicine(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      disabled={!medicine.isAvailable}
                      min='0'
                      step='0.01'
                      className='w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none disabled:bg-gray-100'
                    />
                  </div>

                  {/* Delete Button */}
                  <div className='col-span-1 flex items-end'>
                    <button
                      type='button'
                      onClick={() => removeMedicine(index)}
                      disabled={medicines.length === 1}
                      className='p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
                      title='Remove medicine'
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                {medicine.isAvailable && (
                  <div className='mt-2 pt-2 border-t border-gray-200 text-right'>
                    <span className='text-xs text-gray-600'>Subtotal: </span>
                    <span className='text-sm font-semibold text-blue-600'>
                      Rs. {(medicine.quantityAvailable * medicine.unitPrice).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className='bg-blue-50 rounded-lg p-3 border border-blue-200 mt-2'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-700'>Total Amount</span>
              <span className='text-lg font-bold text-blue-600'>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className='block text-sm font-semibold text-gray-800 mb-2'>
          Notes {selectedStatus === ResponseStatus.NOT_AVAILABLE && <span className='text-red-500'>*</span>}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            selectedStatus === ResponseStatus.NOT_AVAILABLE
              ? 'Please explain why medicines are not available...'
              : 'Add any additional notes (optional)...'
          }
          rows={3}
          className='w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none'
        />
      </div>

      {/* Action Buttons */}
      <div className='flex gap-2 pt-2'>
        <button
          type='button'
          onClick={onCancel}
          disabled={isSubmitting}
          className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm disabled:opacity-50'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isSubmitting ? (
            <>
              <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
              <span>Submitting...</span>
            </>
          ) : (
            'Submit Response'
          )}
        </button>
      </div>
    </div>
  );
};

export default PrescriptionResponseForm;
