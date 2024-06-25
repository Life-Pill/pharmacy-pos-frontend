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
        `http://localhost:8081/prescriptionOrders/myOrders/${user.user?.branchId}`
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
          `http://localhost:8081/prescriptionImages/${order.prescriptionId}`,
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

  return {
    getOnlineOrders,
    loadingOnlineOrders,
    onlineOrders,
    prescriptionImages, // Return prescription images from the hook
  };
};

export default useOnlineOrderService;
