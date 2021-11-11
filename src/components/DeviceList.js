import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import styles from './DeviceList.module.css';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import { deviceTypes } from '../constants';

const multiSelectOptions = Object.keys(deviceTypes).map((deviceKey) => ({
  label: deviceTypes[deviceKey],
  value: deviceKey,
}));

function DeviceList() {
  const [allDevices, setAllDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] =
    useState(multiSelectOptions);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices`);
      setAllDevices(data);
    })();
  }, []);
  useEffect(() => {
    setFilteredDevices(allDevices);
  }, [allDevices]);

  const handleDeviceTypeChange = (selectedTypes) => {
    setSelectedDeviceTypes(selectedTypes);

    const selectedTypesValues = selectedTypes.map((type) => type.value);

    const newDevices = allDevices.filter(
      (device) => selectedTypesValues.indexOf(device.type) >= 0
    );
    setFilteredDevices(newDevices);
  };
  const handleSortByChange = (e) => {
    const sortBy = e.target.value;

    const newDevices = filteredDevices.slice().sort((a, b) => {
      if (sortBy === 'SYSTEM_NAME') {
        return a.system_name.localeCompare(b.system_name);
      } else if (sortBy === 'HDD_CAPACITY') {
        return parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity);
      }
      return 0;
    });
    setFilteredDevices(newDevices);
  };

  const renderDevice = (device) => (
    <li key={device.id}>
      <div className={styles.deviceControls}>
        <Link to={`/delete/${device.id}`}>
          <FaTrashAlt />
        </Link>
        <Link to={`/edit/${device.id}`}>
          <FaPencilAlt />
        </Link>
      </div>
      <p className={styles.deviceItemSystemName}>{device.system_name}</p>
      <p className={styles.deviceItemDeviceType}>{deviceTypes[device.type]}</p>
      <p className={styles.deviceItemCapacity}>{device.hdd_capacity} GB</p>
    </li>
  );

  return (
    <Layout>
      <div className={styles.header}>
        <div className={[styles.headerItem, styles.deviceTypes].join(' ')}>
          <label className={styles.label} htmlFor="deviceType">
            Device Type:
          </label>
          {/* <select
            className={styles.selectInput}
            id="deviceType"
            onChange={handleDeviceTypeChange}
          >
            <option value="ALL">All</option>
            {renderDeviceTypeOptions()}
          </select> */}
          <MultiSelect
            className={styles.multiSelect}
            options={multiSelectOptions}
            value={selectedDeviceTypes}
            onChange={handleDeviceTypeChange}
            labelledBy="Select"
          />
        </div>
        <div className={styles.headerItem}>
          <label className={styles.label} htmlFor="sortBy">
            Sort By:
          </label>
          <select
            className={styles.selectInput}
            id="sortBy"
            onChange={handleSortByChange}
          >
            <option value="SYSTEM_NAME">System Name</option>
            <option value="HDD_CAPACITY">HDD Capacity</option>
          </select>
        </div>
        <div className={[styles.headerItem]}>
          <Link to="/add" className={styles.addDevice}>
            <FaPlus />
            <span>Add Device</span>
          </Link>
        </div>
      </div>

      {filteredDevices.length ? (
        <ul className={styles.deviceList}>
          {filteredDevices.map(renderDevice)}
        </ul>
      ) : (
        <div className={styles.panel}><p>No devices</p></div>
      )}
    </Layout>
  );
}

export default DeviceList;
