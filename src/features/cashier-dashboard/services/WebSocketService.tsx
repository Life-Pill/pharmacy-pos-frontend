import { useEffect, useState, useCallback, useRef } from 'react';
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

const useWebSocketService = () => {
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

          // Add new prescription to the list
          setPrescriptions((prev) => [prescription, ...prev]);
          
          // Show notification toast
          toast.info('New prescription received!', {
            position: 'top-right',
            autoClose: 5000,
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

  const clearPrescriptions = useCallback(() => {
    setPrescriptions([]);
  }, []);

  const removePrescription = useCallback((prescriptionId: string) => {
    setPrescriptions((prev) =>
      prev.filter((p) => p.prescriptionId !== prescriptionId)
    );
  }, []);

  return {
    prescriptions,
    connected,
    connecting,
    connectionFailed,
    connectWebSocket,
    disconnectWebSocket,
    clearPrescriptions,
    removePrescription,
  };
};

export default useWebSocketService;
