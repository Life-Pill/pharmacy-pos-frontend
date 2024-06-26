import axios from 'axios';
import { useUserContext } from '../../../context/UserContext';
import { useState } from 'react';
import { OnlineOrder } from '../interfaces/OnlineOrder';

const useOnlineOrderService = () => {
  const user = useUserContext();

  const [loadingOnlineOrders, setLoadingOnlineOrders] = useState(false);
  const [onlineOrders, setOnlineOrders] = useState<OnlineOrder[]>([]);
  const [prescriptionImages, setPrescriptionImages] = useState<{
    [key: string]: string;
  }>({});

  const getOnlineOrders = async () => {
    try {
      setLoadingOnlineOrders(true);
      const res = await axios.get(
        `http://52.200.74.128/prescriptionOrders/myOrders/${user.user?.branchId}`
      );
      const orders: OnlineOrder[] = res.data;
      setOnlineOrders(orders);
      console.log(orders);

      // Fetch prescription images for each order
      await fetchPrescriptionImages(orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOnlineOrders(false);
    }
  };

  const fetchPrescriptionImages = async (orders: OnlineOrder[]) => {
    const imagesPromises = orders.map((order) =>
      axios
        .get(
          `http://52.200.74.128/prescriptionImages/${order.prescriptionId}`,
          {
            responseType: 'arraybuffer',
          }
        )
        .then((res) => {
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          return { [order.prescriptionId]: `data:image/*;base64,${base64}` };
        })
    );

    const images = await Promise.all(imagesPromises);
    const imagesObject = images.reduce(
      (acc, image) => ({ ...acc, ...image }),
      {}
    );
    setPrescriptionImages(imagesObject);
  };

  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  const acceptOrder = async (orderId: string) => {
    console.log(messages[orderId]);
    try {
      const res = await axios.put(
        `http://52.200.74.128/prescriptionOrders/${orderId}/${user.user?.branchId}`,
        messages[orderId],
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getOnlineOrders,
    loadingOnlineOrders,
    onlineOrders,
    prescriptionImages, // Return prescription images from the hook
    messages,
    setMessages,
    acceptOrder,
  };
};

export default useOnlineOrderService;
