import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeviceForm from './DeviceForm';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';

function EditDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices/${id}`);
      setDevice(data);
    })();
  }, [id]);
  const handleDeviceUpdate = async (device) => {
    const id = device.id;
    delete device.id;
    try {
      const { data } = await axios.put(`${API_BASE_URL}/devices/${id}`, device);
      if (!data) {
        throw new Error('Error updating device');
      }
      navigate(-1);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      <p>
        <strong>Edit Device</strong>
      </p>
      {device && <DeviceForm device={device} onSubmit={handleDeviceUpdate} />}
    </Layout>
  );
}

export default EditDevice;
