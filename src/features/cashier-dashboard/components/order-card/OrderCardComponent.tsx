import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import { IoCloseOutline } from 'react-icons/io5';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import LoadingSpinner from '../../../../shared/loader/LoadingSpinner';

type Props = {
  onClose: () => void;
};

function OrderCardComponent({ onClose }: Props) {
  const { prescriptions, connected, connecting, connectionFailed, connectWebSocket, disconnectWebSocket } = useWebSocket();
  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  const handleAccept = (prescriptionId: string) => {
    // TODO: Handle accept logic - send to backend API
    console.log(`Prescription ${prescriptionId} accepted with message: ${messages[prescriptionId]}`);
  };

  const handleReject = (prescriptionId: string) => {
    // TODO: Handle reject logic - send to backend API
    console.log(`Prescription ${prescriptionId} rejected with message: ${messages[prescriptionId]}`);
  };

  const handleMessageChange = (prescriptionId: string, message: string) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [prescriptionId]: message,
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300'
        onClick={onClose}
      />
      
      {/* Slide-in Panel */}
      <div className='fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[800px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center justify-between shadow-lg'>
          <div className='flex items-center gap-3'>
            <h2 className='text-2xl font-bold text-white'>
              Online Prescriptions
            </h2>
            <div className='flex items-center gap-2'>
              {connecting ? (
                <span className='text-xs text-white font-medium bg-yellow-500 px-2 py-1 rounded-full animate-pulse'>
                  Connecting...
                </span>
              ) : connectionFailed ? (
                <span className='text-xs text-white font-medium bg-red-600 px-2 py-1 rounded-full'>
                  Failed
                </span>
              ) : connected ? (
                <>
                  <FiWifi className='text-white' size={18} />
                  <span className='text-xs text-white font-medium bg-green-500 px-2 py-1 rounded-full'>Connected</span>
                </>
              ) : (
                <>
                  <FiWifiOff className='text-white' size={18} />
                  <span className='text-xs text-white font-medium bg-red-500 px-2 py-1 rounded-full'>Disconnected</span>
                </>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {/* Connection Control Buttons */}
            {(!connected && !connecting) && (
              <button
                onClick={connectWebSocket}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium'
              >
                {connectionFailed ? 'Retry' : 'Connect'}
              </button>
            )}
            {connected && (
              <button
                onClick={disconnectWebSocket}
                className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium'
              >
                Disconnect
              </button>
            )}
            <button
              onClick={onClose}
              className='bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors'
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
        </div>

        {/* Prescriptions Count */}
        <div className='px-6 py-4 bg-blue-50 border-b border-blue-100'>
          <p className='text-sm text-gray-700'>
            <span className='font-semibold text-blue-600 text-lg'>{prescriptions.length}</span> {prescriptions.length === 1 ? 'Prescription' : 'Prescriptions'} Pending
          </p>
        </div>

        {/* Prescriptions List */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {prescriptions.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-gray-400'>
              <div className='bg-gray-100 rounded-full p-8 mb-4'>
                <svg className='w-16 h-16 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <p className='text-lg font-medium text-gray-500'>No prescriptions yet</p>
              <p className='text-sm text-gray-400'>New prescriptions will appear here</p>
            </div>
          ) : (
            prescriptions.map((prescription) => (
              <div
                key={prescription.prescriptionId}
                className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='flex flex-col gap-4 p-4'>
                  {/* Prescription Image */}
                  <div className='w-full'>
                    {prescription.imageUrl ? (
                      <img
                        src={prescription.imageUrl}
                        alt={`Prescription ${prescription.prescriptionId}`}
                        className='w-full h-auto max-h-64 rounded-lg border border-gray-300 object-contain bg-gray-50'
                      />
                    ) : (
                      <div className='w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center'>
                        <p className='text-gray-400 text-sm'>No image available</p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className='w-full'>
                    {/* Prescription Information - Compact */}
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          prescription.status === 'UPLOADED' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {prescription.status}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {prescription.uploadTimestamp 
                            ? new Date(prescription.uploadTimestamp).toLocaleTimeString()
                            : 'Just now'}
                        </span>
                      </div>
                      
                      <div className='space-y-1.5'>
                        <div className='flex items-baseline gap-2'>
                          <label className='text-xs font-medium text-gray-500 w-20'>User:</label>
                          <p className='text-sm text-gray-900 flex-1'>{prescription.userName || prescription.userId.slice(0, 8) + '...'}</p>
                        </div>
                        {prescription.notes && (
                          <div className='flex items-baseline gap-2'>
                            <label className='text-xs font-medium text-gray-500 w-20'>Notes:</label>
                            <p className='text-sm text-gray-700 flex-1 italic'>{prescription.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Response Message - Compact */}
                    <div className='mt-3'>
                      <textarea
                        className='w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                        placeholder='Add response message (optional)...'
                        rows={2}
                        value={messages[prescription.prescriptionId] || ''}
                        onChange={(e) =>
                          handleMessageChange(prescription.prescriptionId, e.target.value)
                        }
                      />
                    </div>

                    {/* Action Buttons - Compact */}
                    <div className='flex gap-2 mt-3'>
                      <button
                        onClick={() => handleAccept(prescription.prescriptionId)}
                        className='flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm'
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(prescription.prescriptionId)}
                        className='flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm'
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCardComponent;
