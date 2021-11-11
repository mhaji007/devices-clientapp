import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import styles from './DeleteDevice.module.css';
import Button from './Button';

function DeleteDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices/${id}`);
      setDevice(data);
    })();
  }, [id]);

  const handleDeviceDelete = async () => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/devices/${id}`);
      if (!data) {
        throw new Error('Error deleting device');
      }
      navigate(-1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      {device && (
        <div>
          <p>
            <strong>Delete Device</strong>
          </p>
          <div className={styles.panel}>
            <p>
              Are you sure you want to delete{' '}
              <strong>{device.system_name}</strong> device?
            </p>
          <div>
            <Button onClick={handleDeviceDelete} danger>Delete</Button>
            <Button onClick={() => navigate(-1)}>Go Back</Button></div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DeleteDevice;
