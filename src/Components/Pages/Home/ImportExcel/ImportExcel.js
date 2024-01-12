import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import file from '../../../../Images/excel/SolarIOT.xlsx';

const ImportExcel = ({ ph, setPh, setBattery }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(file);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });

        // Assuming you have only one sheet, if there are multiple sheets, adjust accordingly
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the Excel data in the state

        const finalData = jsonData[jsonData.length - 1];
        const phElement = finalData.find(element => element.startsWith('pH:'));
        const phValue = phElement ? phElement.replace('pH: ', '').trim() : null;
        setPh(phValue);

        const batElement = finalData.find(element => element.includes('Bat:'));

        // If a Bat element is found, extract the Bat value
        const batValue = batElement
          ? batElement.replace('Bat: ', '').trim()
          : null;
        setBattery(batValue);
      } catch (error) {
        console.error('Error fetching or processing Excel file:', error);
      }
    };

    fetchData();
  }, [ph]);
  return <div>{/* <h1>Dado</h1> */}</div>;
};

export default ImportExcel;
