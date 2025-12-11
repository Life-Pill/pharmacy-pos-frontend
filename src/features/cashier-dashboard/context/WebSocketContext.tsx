import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';
import { toast } from 'react-toastify';

export interface PrescriptionData {
  prescriptionId: string;
  userId: string;
  userName: string | null;
  imageUrl: string;
  notes: string;
  eventType: string;
  status: string;
  priority: string | null;
  uploadTimestamp: string | null;
  notificationTimestamp: string | null;
}

interface WebSocketContextType {
  prescriptions: PrescriptionData[];
  connected: boolean;
  connecting: boolean;
  connectionFailed: boolean;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  clearPrescriptions: () => void;
  removePrescription: (prescriptionId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const stompClientRef = useRef<CompatClient | null>(null);
  const hasShownToastRef = useRef(false);

  const connectWebSocket = useCallback(() => {
    if (stompClientRef.current?.connected) {
      console.log('⚠️ Already connected to WebSocket');
      return;
    }

    setConnecting(true);
    setConnectionFailed(false);
    hasShownToastRef.current = false;
    
    // Create WebSocket connection
    const socket = new SockJS('http://35.208.197.159:9191/ws');
    const client = Stomp.over(socket);

    // Disable debug logging
    client.debug = () => {};

    // Connect to WebSocket
    client.connect(
      {},
      (frame: any) => {
        console.log('✅ Connected to WebSocket: ' + frame);
        setConnected(true);
        setConnecting(false);
        setConnectionFailed(false);
        
        // Show success toast only once
        if (!hasShownToastRef.current) {
          toast.success('Connected to prescription service', {
            position: 'top-right',
            autoClose: 3000,
          });
          hasShownToastRef.current = true;
        }

        // Subscribe to prescription topic
        client.subscribe('/topic/prescriptions', (message) => {
          console.log('🔔 New Prescription Received:');
          const prescription = JSON.parse(message.body);
          console.log(prescription);

          // Add new prescription to the list (prevent duplicates)
          setPrescriptions((prev) => {
            // Check if prescription already exists
            const exists = prev.some(p => p.prescriptionId === prescription.prescriptionId);
            if (exists) {
              console.log('⚠️ Duplicate prescription ignored:', prescription.prescriptionId);
              return prev;
            }
            
            // Show notification toast only for new prescriptions
            toast.info('New prescription received!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            return [prescription, ...prev];
          });
        });
      },
      (error: any) => {
        console.error('❌ WebSocket connection error:', error);
        setConnected(false);
        setConnecting(false);
        setConnectionFailed(true);
        
        // Show error toast
        toast.error('Failed to connect to prescription service', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    );

    stompClientRef.current = client;
  }, []);

  const disconnectWebSocket = useCallback(() => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.disconnect(() => {
        console.log('🔌 Disconnected from WebSocket');
        setConnected(false);
        setConnectionFailed(false);
        stompClientRef.current = null;
        hasShownToastRef.current = false;
        
        // Show disconnect toast
        toast.info('Disconnected from prescription service', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
    }
  }, []);

  const clearPrescriptions = useCallback(() => {
    setPrescriptions([]);
  }, []);

  const removePrescription = useCallback((prescriptionId: string) => {
    setPrescriptions((prev) =>
      prev.filter((p) => p.prescriptionId !== prescriptionId)
    );
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connectWebSocket();

    // Cleanup on unmount - disconnect when app closes
    return () => {
      if (stompClientRef.current?.connected) {
        console.log('App unmounting, disconnecting WebSocket');
        disconnectWebSocket();
      }
    };
  }, []);

  const value: WebSocketContextType = {
    prescriptions,
    connected,
    connecting,
    connectionFailed,
    connectWebSocket,
    disconnectWebSocket,
    clearPrescriptions,
    removePrescription,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
