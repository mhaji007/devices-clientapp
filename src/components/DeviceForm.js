import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './DeviceForm.module.css';
import { deviceTypes } from '../constants';

function DeviceForm({ onSubmit, device = null }) {
  const [systemName, setSystemName] = useState(
    device ? device.system_name : ''
  );
  const [type, setType] = useState(device ? device.type : '');
  const [hddCapacity, setHddCapacity] = useState(
    device ? device.hdd_capacity : ''
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: device ? device.id : '',
      system_name: systemName,
      type: type,
      hdd_capacity: hddCapacity,
    });
  };

  const renderDeviceTypeOptions = () =>
    Object.keys(deviceTypes).map((deviceTypeKey) => (
      <option key={deviceTypeKey} value={deviceTypeKey}>{deviceTypes[deviceTypeKey]}</option>
    ));

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="system_name">System Name *</label>
          <input
            type="text"
            id="system_name"
            placeholder="Enter System Name"
            onChange={(e) => setSystemName(e.target.value)}
            value={systemName}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="system_name">Type *</label>
          <select
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            {renderDeviceTypeOptions()}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hdd_capacity">HDD Capacity (GB) *</label>
          <input
            type="number"
            id="hdd_capacity"
            placeholder="Enter HDD Capacity"
            onChange={(e) => setHddCapacity(e.target.value)}
            value={hddCapacity}
            required
          />
        </div>

        <div className={styles.formButtons}>
          <Button className={styles.saveBtn} type="submit" primary>
            Save
          </Button>
          <Button
            className={styles.closeBtn}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DeviceForm;
