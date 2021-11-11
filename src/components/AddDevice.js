import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeviceForm from './DeviceForm';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';

function AddDevice() {
  const navigate = useNavigate();

  const handleDeviceAdd = async (device) => {
    delete device.id;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/devices`, device);
      if (!data) {
        throw new Error('Error adding device');
      }
      navigate(-1);
    } catch (error) {}
  };
  return (
    <Layout>
      <p>
        <strong>Add Device</strong>
      </p>
      <DeviceForm onSubmit={handleDeviceAdd} />
    </Layout>
  );
}

export default AddDevice;
